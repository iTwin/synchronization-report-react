/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import { DefaultCell, Table, tableFilters, TablePaginator } from '@itwin/itwinui-react';
import { Issues, ReportContext } from './Report';
import { ClampWithTooltip, StatusIcon } from './utils';
import type { TableProps } from '@itwin/itwinui-react';
import type { FileRecord, SourceFilesInfo } from './report-data-typings';
import type { Column, Row, CellProps, CellRendererProps } from 'react-table';
import './ProblemsTable.scss';
import SvgFiletypeDocument from '@itwin/itwinui-icons-color-react/esm/icons/FiletypeDocument';
import SvgFiletypeMicrostation from '@itwin/itwinui-icons-color-react/esm/icons/FiletypeMicrostation';

const defaultDisplayStrings = {
  Fatal: 'Fatal Error',
  Error: 'Error',
  Critical: 'Critical Warning',
  Warning: 'Warning',
  Info: 'Info',
  fileName: 'File name',
  level: 'Status',
  category: 'Issue',
  type: 'Type',
  message: 'Message',
};

const defaultFileTypeIcons = {
  dgn: <SvgFiletypeMicrostation />,
  dgnlib: <SvgFiletypeMicrostation />,
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
  ...rest
}: {
  fileRecords?: FileRecord[];
  fileTypeIcons?: Record<string, JSX.Element>;
  displayStrings?: Partial<typeof defaultDisplayStrings>;
  sourceFilesInfo?: SourceFilesInfo;
} & Partial<TableProps>) => {
  const context = React.useContext(ReportContext);
  const workflowMapping = context?.workflowMapping;

  const filetypeIcons = React.useMemo(
    () => ({ ...defaultFileTypeIcons, ...userFileTypeIcons } as Record<string, JSX.Element>),
    [userFileTypeIcons]
  );

  const data = React.useMemo(() => {
    const files = fileRecords || context?.reportData.filerecords || [];
    const reports = files
      .flatMap(({ file, auditrecords }) =>
        (auditrecords ?? []).flatMap(({ auditinfo }) => {
          if (
            workflowMapping &&
            auditinfo?.category &&
            auditinfo.type &&
            Object.hasOwn(workflowMapping, auditinfo.category) &&
            Object.hasOwn(workflowMapping[auditinfo.category], auditinfo.type)
          ) {
            if (!workflowMapping[auditinfo.category][auditinfo.type].some((w) => context.focusedWorkflows.includes(w)))
              return [];
            return {
              fileId: file?.identifier,
              ...auditinfo,
            };
          } else if (context?.focusedWorkflows.includes('Unorganized')) {
            return { fileId: file?.identifier, ...auditinfo };
          }
          return [];
        })
      )
      .filter((record) => {
        const level = record.level;
        let bannerLevel: Issues = 'Info';
        if (level === 'Error' || level === 'Fatal') bannerLevel = 'Error';
        else if (level === 'Warning' || level === 'Critical') bannerLevel = 'Warning';
        return context?.focusedIssues.some((issue) => bannerLevel === issue);
      });

    // **FIX referenced in own type annotation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expandableReports: any = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nonCategoryReports: any[] = [];

    reports.forEach((report) => {
      const category = report?.category;

      const reportSubRow = { ...report };

      if (!category) {
        nonCategoryReports.push(report);
      } else {
        if (!Object.hasOwn(expandableReports, category)) {
          expandableReports[category] = [];
        }

        expandableReports[category].push(reportSubRow);
      }
    });

    const processedReports = [];
    for (const category of Object.keys(expandableReports)) {
      processedReports.push({
        category,
        subRows: expandableReports[category],
      });
    }

    return [...processedReports, ...nonCategoryReports];
  }, [
    fileRecords,
    context?.reportData.filerecords,
    context?.focusedWorkflows,
    context?.focusedIssues,
    workflowMapping,
  ]);

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...userDisplayStrings }),
    [userDisplayStrings]
  );

  type TableRow = Partial<typeof data[number]>;

  const getFileNameFromId = React.useCallback(
    (id?: string) => {
      const filesInfo = sourceFilesInfo || context?.reportData.sourceFilesInfo;
      return filesInfo?.fileId === id
        ? filesInfo?.fileName
        : filesInfo?.Files?.find((file) => file.fileId === id)?.fileName;
    },
    [sourceFilesInfo, context?.reportData.sourceFilesInfo]
  );

  const sortByLevel = React.useCallback(
    (rowA: Row<TableRow | TableRow['subRows']>, rowB: Row<TableRow | TableRow['subRows']>) => {
      const levelsOrder = ['Fatal', 'Error', 'Critical', 'Warning', 'Info'];
      const indexA = levelsOrder.indexOf(rowA.original.level || '');
      const indexB = levelsOrder.indexOf(rowB.original.level || '');
      return indexA > indexB ? 1 : -1;
    },
    []
  );

  const columns = React.useMemo(
    () =>
      [
        {
          id: 'category',
          accessor: 'category',
          Header: displayStrings.category,
          Filter: tableFilters.TextFilter(),
          minWidth: 75,
          maxWidth: 250,
          Cell: (row: CellProps<TableRow | TableRow['subRows']>) => (
            // Hide issue if a subrow
            <div>{Object.hasOwn(row.row.original, 'subRows') ? row.value : ''}</div>
          ),
        },
        {
          id: 'type',
          accessor: 'type',
          Header: displayStrings.type,
          Filter: tableFilters.TextFilter(),
          minWidth: 50,
          maxWidth: 250,
          Cell: (row: CellProps<TableRow | TableRow['subRows']>) => {
            return (
              <div
                className='iui-anchor'
                onClick={() => {
                  context?.setCurrentAuditInfo({
                    ...row.row.original,
                    fileName: row.row.original?.fileName ?? getFileNameFromId(row.row.original?.fileId),
                  });
                }}
              >
                {row.value}
              </div>
            );
          },
        },
        {
          id: 'level',
          accessor: 'level',
          Header: displayStrings.level,
          Filter: tableFilters.TextFilter(),
          minWidth: 75,
          maxWidth: 250,
          sortType: sortByLevel,
          cellRenderer: ({ cellElementProps, cellProps }: CellRendererProps<TableRow | TableRow['subRows']>) => {
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
                {level && level in displayStrings ? displayStrings.level : level}
              </DefaultCell>
            );
          },
        },
        {
          id: 'fileName',
          accessor: ({ fileName, fileId }: Partial<TableRow | TableRow['subRows']>) =>
            fileName ?? getFileNameFromId(fileId),
          Header: displayStrings.fileName,
          Filter: tableFilters.TextFilter(),
          cellClassName: 'iui-main',
          minWidth: 150,
          cellRenderer: ({ cellElementProps, cellProps }: CellRendererProps<TableRow>) => {
            const extension = cellProps.value?.substring(cellProps.value.lastIndexOf('.') + 1);
            return (
              <DefaultCell
                cellElementProps={cellElementProps}
                cellProps={cellProps}
                startIcon={extension && extension in filetypeIcons ? filetypeIcons[extension] : <SvgFiletypeDocument />}
              >
                {cellProps.value}
              </DefaultCell>
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
      ] as Column<TableRow>[],
    [context, displayStrings, filetypeIcons, getFileNameFromId, sortByLevel]
  );

  const rowProps = React.useCallback(
    ({
      original: { level },
    }: Row<TableRow | TableRow['subRows']>): {
      status?: 'positive' | 'warning' | 'negative';
    } => {
      switch (level) {
        case 'Critical':
        case 'Error':
        case 'Fatal':
          return { status: 'negative' };
        case 'Warning':
          return { status: 'warning' };
        default:
          return {};
      }
    },
    []
  );

  return (
    <Table
      onRowClick={(event: React.MouseEvent<Element, MouseEvent>, row: Row<TableRow | TableRow['subRows']>) => {
        const element = event.target as HTMLTableRowElement;
        element.parentElement?.classList.add('active');
        context?.setCurrentAuditInfo({
          ...row.original,
          fileName: row.original.filename ?? getFileNameFromId(row.original.fileId),
        });

        // event listener added as component does not have an 'outside clicked' handler
        // and cannot wrap individual row in a custom react hook
        document.addEventListener(
          'mousedown',
          (event: MouseEvent) => {
            if (!element.parentElement?.contains(event.target as Node)) {
              element.parentElement?.classList.remove('active');
            }
          },
          { once: true }
        );
      }}
      selectRowOnClick
      enableVirtualization
      className={classnames('isr-problems-table', className)}
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      emptyFilteredTableContent='No results found. Clear or try another filter.'
      isSortable
      initialState={{ sortBy: [{ id: 'level' }] }}
      rowProps={rowProps}
      paginatorRenderer={(props) => <TablePaginator pageSizeList={[10, 25, 50]} {...props} />}
      {...rest}
    />
  );
};

export default ProblemsTable;
