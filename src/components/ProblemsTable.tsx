/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import { Anchor, Badge, DefaultCell, Table, tableFilters } from '@itwin/itwinui-react';
import { Issues, ReportContext, Tables } from './Report';
import { ClampWithTooltip, StatusIcon } from './utils';
import type { TableProps } from '@itwin/itwinui-react';
import type { FileRecord, SourceFile, SourceFilesInfo } from './report-data-typings';
import type { Column, Row, CellProps, CellRendererProps } from 'react-table';
import './ProblemsTable.scss';
import Tour from 'reactour';
import {
  SvgFiletypeRevit,
  SvgFiletypeMicrostation,
  SvgFiletypeDocument,
  SvgFiletypeSketchup,
  SvgFiletypeXls,
  SvgFiletypeDwg,
  SvgFiletypeAutocad,
} from '@itwin/itwinui-icons-color-react';
import { ReactComponent as SvgFiletypeIfc } from '../assets/IFC.svg';
import { getHelpArticleUrl, hasHelpArticle } from './help-articles';

type Report = {
  level?: 'Error' | 'Warning' | 'Info' | 'Fatal' | 'Critical' | undefined;
  category?: string | undefined;
  message?: string | undefined;
  type?: string | undefined;
  fileName?: string | undefined;
  fileId: string | undefined;
  issueid?: string | undefined;
};

type Status = 'positive' | 'warning' | 'negative' | undefined;

interface ExpandableFileReport extends SourceFile {
  subRows?: Report[];
}

const TableTypeNames: Record<'Files' | 'Categories' | 'Problems' | 'IssueId', Tables> = {
  Files: 'files',
  Categories: 'categories',
  Problems: 'problems',
  IssueId: 'issueId',
};

const tableStyleAccessor: Record<Tables, keyof Report | 'problems'> = {
  problems: 'problems',
  files: 'fileId',
  categories: 'category',
  issueId: 'issueid',
};

const defaultDisplayStrings = {
  Fatal: 'Fatal Error',
  Error: 'Error',
  Critical: 'Critical Warning',
  Warning: 'Warning',
  Info: 'Info',
  fileName: 'File name',
  level: 'Severity',
  category: 'Category',
  type: 'Type',
  message: 'Message',
  mainFile: 'master',
  issueId: 'ID',
  details: 'Details',
};

const emptyTableDisplayStrings: Record<Issues, string> = {
  Error: 'Errors',
  Warning: 'Warnings',
  Info: 'Info',
  All: 'Issues',
};

const defaultFileTypeIcons = {
  dgn: <SvgFiletypeMicrostation />,
  dgnlib: <SvgFiletypeMicrostation />,
  rvt: <SvgFiletypeRevit />,
  skp: <SvgFiletypeSketchup />,
  xls: <SvgFiletypeXls />,
  dwg: <SvgFiletypeDwg />,
  dxf: <SvgFiletypeAutocad />,
  ifc: <SvgFiletypeIfc />,
};

/**
 * ProblemsTable should be shown when the problems table selection is active. It contains a flat list of all synchronization issues.
 *
 * Localization is supported using the `displayStrings` prop, and custom icons can be specified using `fileTypeIcons`.
 * All of `Table` props from iTwinUI-react are also supported.
 */
export const ProblemsTable = ({
  fileRecords,
  displayStrings: userDisplayStrings,
  fileTypeIcons: userFileTypeIcons,
  sourceFilesInfo,
  className,
  displayDetailsColumn,
  displayCalloutBox,
  onIssueArticleOpened,
  ...rest
}: {
  fileRecords?: FileRecord[];
  fileTypeIcons?: Record<string, JSX.Element>;
  displayStrings?: Partial<typeof defaultDisplayStrings>;
  sourceFilesInfo?: SourceFilesInfo;
  displayDetailsColumn?: boolean;
  displayCalloutBox?: boolean;
  onIssueArticleOpened?: (issueId: string) => void;
} & Partial<TableProps>) => {
  const context = React.useContext(ReportContext);
  const workflowMapping = context?.workflowMapping;
  const [tour, setTour] = React.useState(false);
  const [displayDialogBox, setDisplayDialogBox] = React.useState(false);
  const onlyLast = React.useRef(false);
  const errorLinkFound = React.useRef(false);
  const filetypeIcons = React.useMemo(
    () => ({ ...defaultFileTypeIcons, ...userFileTypeIcons } as Record<string, JSX.Element>),
    [userFileTypeIcons]
  );

  const getFileNameFromId = React.useCallback(
    (id?: string) => {
      const filesInfo = sourceFilesInfo || context?.reportData.sourceFilesInfo;
      return filesInfo?.fileId === id
        ? filesInfo?.fileName
        : filesInfo?.Files?.find((file) => file.fileId === id)?.fileName;
    },
    [sourceFilesInfo, context?.reportData.sourceFilesInfo]
  );

  React.useEffect(() => {
    if (!localStorage.getItem('firstTimeVisit') || localStorage.getItem('firstTimeVisit') === 'false') {
      setDisplayDialogBox(true);
      localStorage.setItem('firstTimeVisit', 'true');
    }
  }, []);
  const fileData = React.useMemo(() => {
    const filesInfo = sourceFilesInfo || context?.reportData.sourceFilesInfo;
    return [
      { ...filesInfo, mainFile: true },
      ...(filesInfo && filesInfo.Files ? filesInfo.Files.filter((file: SourceFile) => file.state !== 'Hidden') : []),
    ];
  }, [sourceFilesInfo, context?.reportData.sourceFilesInfo]);

  const fileDataHash = React.useMemo(() => {
    return fileData.reduce((previousValue, currentValue) => {
      return { ...previousValue, [currentValue.fileId as string]: currentValue };
    }, {}) as { [fileId: string]: SourceFile };
  }, [fileData]);

  const expandReports = React.useCallback(
    (reports: Report[]) => {
      const currentTable = context?.currentTable;
      const expandableColumn = currentTable ? (tableStyleAccessor[currentTable] as keyof Report) : undefined;
      const isFileTable = expandableColumn === 'fileId';

      if (!expandableColumn || context?.currentTable === TableTypeNames.Problems) {
        return reports;
      }

      const expandableReports: Record<string, Report[]> = {};

      reports.forEach((report) => {
        const topLevel = report[expandableColumn];
        if (!topLevel) {
          if (!Object.hasOwn(expandableReports, 'Others')) {
            expandableReports.Others = [];
          }
          expandableReports.Others.push(report);
        } else {
          if (!Object.hasOwn(expandableReports, topLevel)) {
            expandableReports[topLevel] = [];
          }
          expandableReports[topLevel].push(report);
        }
      });

      const processedReports = [];
      for (const topLevel of Object.keys(expandableReports)) {
        let processedReport: ExpandableFileReport = {
          [expandableColumn as keyof Report]: `${topLevel} (${expandableReports[topLevel].length})`,
          subRows: expandableReports[topLevel],
        };
        if (isFileTable) {
          processedReport = { ...processedReport, ...fileDataHash[topLevel] };
        }
        processedReports.push(processedReport);
      }

      if (isFileTable) {
        const reportsFileNames = processedReports.map((report) => report.fileName as string);
        fileData.forEach((file) => {
          if (file.fileName && !reportsFileNames.includes(file.fileName)) {
            processedReports.push(file);
          }
        });
      }

      return processedReports;
    },
    [context?.currentTable, fileData, fileDataHash]
  );

  const processedWithIssues = React.useMemo(() => {
    const fileStatusEntries = fileData
      .filter((sourceFile) => !!sourceFile.fileId)
      .map(({ fileId }) => {
        const hasIssue = fileRecords
          ?.filter(({ file }) => file?.identifier === fileId)
          .flatMap(({ auditrecords }) => auditrecords ?? [])
          .some(({ auditinfo }) => ['Critical', 'Fatal', 'Warning', 'Error'].includes(auditinfo?.level ?? ''));
        return [fileId, hasIssue] as const;
      });

    return Object.fromEntries(fileStatusEntries) as Record<string, boolean>;
  }, [fileData, fileRecords]);

  const data = React.useMemo(() => {
    const files = fileRecords || context?.reportData.filerecords || [];
    const reports = files
      .flatMap(({ file, auditrecords }) =>
        (auditrecords ?? []).flatMap(({ auditinfo }) => {
          const fileId = file?.identifier;
          const filesInfo = fileId ? (fileDataHash[fileId] as SourceFile) : {};
          const fileCollection = {
            fileId,
            ...filesInfo,
            ...auditinfo,
          };
          if (
            workflowMapping &&
            auditinfo?.category &&
            auditinfo.type &&
            Object.hasOwn(workflowMapping, auditinfo.category) &&
            Object.hasOwn(workflowMapping[auditinfo.category], auditinfo.type)
          ) {
            if (
              !workflowMapping[auditinfo.category][auditinfo.type].some((w) => context.focusedWorkflows.includes(w))
            ) {
              return [];
            }
            return fileCollection;
          } else if (context?.focusedWorkflows.includes('Unorganized')) {
            return fileCollection;
          }
          return [];
        })
      )
      .filter((record) => {
        const level = record.level;
        let bannerLevel: Issues = 'Info';
        if (level === 'Error' || level === 'Fatal') bannerLevel = 'Error';
        else if (level === 'Warning' || level === 'Critical') bannerLevel = 'Warning';
        return context?.focusedIssue === bannerLevel || context?.focusedIssue === 'All';
      });

    return expandReports(reports);
  }, [
    fileRecords,
    context?.reportData.filerecords,
    context?.focusedWorkflows,
    context?.focusedIssue,
    fileDataHash,
    expandReports,
    workflowMapping,
  ]);

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...userDisplayStrings }),
    [userDisplayStrings]
  );

  type TableRow = Partial<typeof data[number]> | Record<string, Report>;

  const sortByLevel = React.useCallback((rowA, rowB) => {
    const levelsOrder = ['Fatal', 'Error', 'Critical', 'Warning', 'Info'];
    const indexA = levelsOrder.indexOf(rowA.original.level || '');
    const indexB = levelsOrder.indexOf(rowB.original.level || '');
    return indexA > indexB ? 1 : -1;
  }, []);

  let indexValue = 0;
  const columns = React.useMemo(
    () =>
      [
        {
          id: 'issueid',
          accessor: 'issueid',
          Header: displayStrings.issueId,
          Filter: tableFilters.TextFilter(),
          minWidth: 50,
          maxWidth: 170,
          Cell: (row: CellProps<Report>) => {
            const [errorId, groupCount] = row.row.original.issueid
              ? row.row.original.issueid.split(' ', 2)
              : [undefined, undefined];
            if (!errorLinkFound.current && hasHelpArticle(errorId)) {
              if (indexValue == data.length - 1) {
                onlyLast.current = true;
              }
              errorLinkFound.current = true;
            }
            indexValue += 1;
            console.log('Row Count: ', indexValue);
            return (
              <div id={`${hasHelpArticle(errorId) ? 'first-error-link' : ''}`}>
                {(row.row.subRows.length === 0 &&
                  context?.currentTable &&
                  tableStyleAccessor[context?.currentTable] === tableStyleAccessor.issueId) ||
                !errorId ? (
                  ''
                ) : hasHelpArticle(errorId) && !displayDetailsColumn ? (
                  <>
                    <Anchor
                      href={getHelpArticleUrl(errorId)}
                      target='_blank'
                      onClick={() => onIssueArticleOpened?.(errorId)}
                    >
                      {errorId}
                    </Anchor>
                    {groupCount ? ` ${groupCount}` : ''}
                  </>
                ) : (
                  row.value
                )}
              </div>
            );
          },
        },
        {
          id: 'category',
          accessor: 'category',
          Header: displayStrings.category,
          Filter: tableFilters.TextFilter(),
          minWidth: 75,
          maxWidth: 250,
          Cell: (row: CellProps<TableRow>) => (
            <div>
              {row.row.subRows.length === 0 &&
              context?.currentTable &&
              tableStyleAccessor[context?.currentTable] === tableStyleAccessor.categories
                ? ''
                : row.value}
            </div>
          ),
        },
        {
          id: 'type',
          accessor: 'type',
          Header: displayStrings.type,
          Filter: tableFilters.TextFilter(),
          minWidth: 50,
          maxWidth: 170,
          Cell: (row: CellProps<Report>) => {
            return <div>{row.value}</div>;
          },
        },
        {
          id: 'level',
          accessor: 'level',
          Header: displayStrings.level,
          Filter: tableFilters.TextFilter(),
          minWidth: 50,
          maxWidth: 170,
          sortType: sortByLevel,
          cellRenderer: ({ cellElementProps, cellProps }: CellRendererProps<Report>) => {
            const level = cellProps.row.original.level;
            const _isError = level === 'Error' || level === 'Fatal' || level === 'Critical';
            const _isWarning = level === 'Warning';

            return (
              <DefaultCell
                cellElementProps={cellElementProps}
                cellProps={cellProps}
                startIcon={
                  _isError ? (
                    <StatusIcon status='error' />
                  ) : _isWarning ? (
                    <StatusIcon status='warning' />
                  ) : level ? (
                    <StatusIcon status='informational' />
                  ) : undefined
                }
              >
                {level}
              </DefaultCell>
            );
          },
        },
        {
          id: 'fileName',
          accessor: ({ fileName, fileId }: Partial<Report>) => fileName ?? getFileNameFromId(fileId),
          Header: displayStrings.fileName,
          Filter: tableFilters.TextFilter(),
          minWidth: 150,
          Cell: (cellProps: CellProps<TableRow & SourceFile>) => {
            const extension = cellProps.value?.substring(cellProps.value.lastIndexOf('.') + 1);

            return cellProps.row.depth != 0 &&
              context?.currentTable &&
              tableStyleAccessor[context?.currentTable] === tableStyleAccessor.files ? (
              <div></div>
            ) : (
              <>
                <div className='isr-table-cell-start-icon'>
                  {extension && extension in filetypeIcons ? (
                    filetypeIcons[extension]
                  ) : !cellProps.row.subRows ? (
                    <SvgFiletypeDocument />
                  ) : undefined}
                </div>
                <div className='isr-file-name'>
                  {cellProps.value}
                  {context?.currentTable === TableTypeNames.Files && cellProps.row.original.mainFile && (
                    <Badge backgroundColor='primary'>{displayStrings['mainFile']}</Badge>
                  )}
                </div>
              </>
            );
          },
        },
        {
          id: 'message',
          accessor: 'message',
          Header: displayStrings.message,
          Filter: tableFilters.TextFilter(),
          minWidth: 200,
          cellClassName: 'isr-problems-message',
          Cell: ({ value }: CellProps<TableRow>) => <ClampWithTooltip>{value}</ClampWithTooltip>,
        },
        {
          id: 'details',
          Header: displayStrings.details,
          Filter: tableFilters.TextFilter(),
          minWidth: 50,
          maxWidth: 170,
          Cell: (row: CellProps<Report>) => {
            const [errorId] = row.row.original.issueid ? row.row.original.issueid.split(' ', 2) : [undefined];
            return (
              <div>
                {(row.row.subRows.length === 0 &&
                  context?.currentTable &&
                  tableStyleAccessor[context?.currentTable] === tableStyleAccessor.issueId) ||
                !errorId ||
                !hasHelpArticle(errorId) ? (
                  <></>
                ) : (
                  <Anchor
                    href={getHelpArticleUrl(errorId!)}
                    target='_blank'
                    onClick={() => onIssueArticleOpened?.(errorId!)}
                  >
                    Learn More...
                  </Anchor>
                )}
              </div>
            );
          },
        },
      ] as Column<TableRow>[],
    [context, displayStrings, filetypeIcons, getFileNameFromId, sortByLevel]
  );
  const reorderColumn = React.useCallback(
    (column: Column<TableRow>[]) => {
      const currentTable = context?.currentTable;
      let toplevel = currentTable ? (tableStyleAccessor[currentTable] as keyof Report) : undefined;

      if (!toplevel || currentTable === TableTypeNames.Problems) {
        return column;
      }

      if (toplevel === tableStyleAccessor.files) {
        toplevel = 'fileName';
      }

      const topPosition = column.findIndex((col) => col.id === toplevel);
      const topCol = column.splice(topPosition, 1);
      column.unshift(topCol[0]);

      return column;
    },
    [context?.currentTable]
  );

  const rowProps = React.useCallback(
    ({
      id,
      original: { level, fileExists, bimFileExists },
    }): {
      status?: Status;
      className?: string;
    } => {
      if (context?.currentTable === TableTypeNames.Problems) {
        const isActiveRow = id === context?.activeRow;
        let statusConverted = undefined;

        switch (level) {
          case 'Critical':
          case 'Error':
          case 'Fatal':
            statusConverted = 'negative';
            break;
          case 'Warning':
            statusConverted = 'warning';
            break;
          default:
            break;
        }

        return {
          status: statusConverted as Status,
          className: `isr-table-row table-row__${isActiveRow ? 'active' : 'inactive'}`,
        };
      } else if (context?.currentTable === TableTypeNames.Files) {
        return !fileExists && !bimFileExists ? { status: 'negative' } : {};
      }

      return { status: undefined };
    },
    [context?.activeRow, context?.currentTable]
  );

  window.onload = () => {
    if (displayDialogBox) {
      const target = document.querySelector('#first-error-link');
      if (!errorLinkFound.current) {
        localStorage.setItem('firstTimeVisit', 'false');
      }
      setTour(true);
      target?.scrollIntoView({ block: 'center' });
    }
  };

  const onRowClick = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: React.MouseEvent<Element, MouseEvent>, row: Row<Record<string, any>>): void => {
      if (row.subRows.length) {
        row.toggleRowExpanded();
      } else {
        context?.setCurrentAuditInfo({
          ...row.original,
          fileName: row.original.fileName ?? getFileNameFromId(row.original.fileId),
          fileStatus: processedWithIssues[row.original.fileId],
        });

        context?.setActiveRow(row.id);
      }
    },
    [context, getFileNameFromId, processedWithIssues]
  );
  const Steps = [
    {
      content: function customTemplate() {
        return (
          <div className='tour-Container'>
            {/* <span className='tour-arrow-left'></span> */}
            <span className={`${onlyLast.current ? 'tour-arrow-left-last' : 'tour-arrow-left'}`}></span>
            <span className='tour-Content'>
              We now have articles to explain the issue and provide potential solution. Click on the ID to access them
            </span>
            <button className='tour-Got-It' onClick={() => setTour(false)}>
              Got It!
            </button>
          </div>
        );
      },
      selector: '#first-error-link',
    },
  ];

  return (
    <>
      {!displayDetailsColumn && displayDialogBox && errorLinkFound.current && (
        <Tour
          steps={Steps}
          isOpen={tour}
          disableInteraction={true}
          onRequestClose={() => {
            setTour(false);
          }}
        />
      )}

      <Table
        onRowClick={onRowClick}
        selectRowOnClick
        enableVirtualization
        className={classnames('isr-problems-table', className)}
        columns={reorderColumn(columns)}
        data={data}
        emptyTableContent={`No ${context ? emptyTableDisplayStrings[context?.focusedIssue] : 'Data'}`}
        emptyFilteredTableContent='No results found. Clear or try another filter.'
        isSortable
        initialState={{ sortBy: [{ id: 'level' }], hiddenColumns: !displayDetailsColumn ? ['details'] : [] }}
        rowProps={rowProps}
        {...rest}
      />
    </>
  );
};

export default ProblemsTable;
