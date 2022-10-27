/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import { DefaultCell, Table, tableFilters, TablePaginator } from '@itwin/itwinui-react';
import { Issues, ReportContext } from './Report';
import { ClampWithTooltip } from './utils';
import type { TableProps } from '@itwin/itwinui-react';
import type { FileRecord, SourceFilesInfo } from './report-data-typings';
import type { Column, Row, CellProps, CellRendererProps } from 'react-table';
import './WorkflowTable.scss';
import { useCallback } from 'react';
import SvgStatusError from '@itwin/itwinui-icons-color-react/esm/icons/StatusError';
import SvgStatusWarning from '@itwin/itwinui-icons-color-react/esm/icons/StatusWarning';
import SvgInfoHollow from '@itwin/itwinui-icons-color-react/esm/icons/InfoHollow';
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
 * WorkflowTable should be shown when the details tab is active. It contains details about the synchronization issues.
 *
 * Localization is supported using the `displayStrings` prop, and custom icons can be specified using `fileTypeIcons`.
 * All of `Table` props from iTwinUI-react are also supported.
 */
export const WorkflowTable = ({
  fileRecords,
  displayStrings: userDisplayStrings,
  fileTypeIcons: userFileTypeIcons,
  sourceFilesInfo,
  className,
  ...rest
}: {
  fileRecords?: FileRecord[];
  displayStrings?: Partial<typeof defaultDisplayStrings>;
  fileTypeIcons?: Record<string, JSX.Element>;
  sourceFilesInfo?: SourceFilesInfo;
} & Partial<TableProps>) => {
  const context = React.useContext(ReportContext);
  const workflowMapping = context?.workflowMapping;

  const filetypeIcons = React.useMemo(
    () => ({ ...defaultFileTypeIcons, ...userFileTypeIcons } as Record<string, JSX.Element>),
    [userFileTypeIcons]
  );

  type TableRow = Partial<{
    level: 'Error' | 'Warning' | 'Info' | 'Fatal' | 'Critical';
    category: string;
    message: string;
    type: string;
    fileName: string;
    fileId: string;
    impactedWorkflows: string[];
    subRows: TableRow[];
  }>;

  const data = React.useMemo(() => {
    const files = fileRecords || context?.reportData.filerecords || [];
    const reports = files
      .flatMap(({ file, auditrecords }) =>
        (auditrecords ?? []).map(({ auditinfo }) => {
          if (
            workflowMapping &&
            auditinfo?.category &&
            auditinfo.type &&
            Object.hasOwn(workflowMapping, auditinfo.category) &&
            Object.hasOwn(workflowMapping[auditinfo.category], auditinfo.type)
          ) {
            return {
              fileId: file?.identifier,
              impactedWorkflows: workflowMapping[auditinfo.category][auditinfo.type],
              ...auditinfo,
            };
          }
          return { fileId: file?.identifier, ...auditinfo };
        })
      )
      .filter((record) => {
        const level = record.level;
        let bannerLevel: Issues = 'Info';
        if (level === 'Error' || level === 'Fatal') bannerLevel = 'Error';
        else if (level === 'Warning' || level === 'Critical') bannerLevel = 'Warning';
        return context?.focusedIssues.some((issue) => bannerLevel === issue);
      });

    // By default just list everything if no workflow schema is provided.
    if (!workflowMapping) return reports;

    const reportsByWorkFlow: TableRow[] = [];

    // Accumulate into workflow buckets
    reports.forEach((r) => {
      if (
        r.category &&
        r.type &&
        Object.hasOwn(workflowMapping, r.category) &&
        Object.hasOwn(workflowMapping[r.category], r.type)
      ) {
        workflowMapping[r.category][r.type].forEach((s) => {
          const index = reportsByWorkFlow.findIndex((tr) => tr.category === s);
          if (index === -1) {
            reportsByWorkFlow.push({ category: s, subRows: [r] });
          } else {
            reportsByWorkFlow[index].subRows?.push(r);
          }
        });
      } else {
        const index = reportsByWorkFlow.findIndex((tr) => tr.category === 'Unorganized');
        if (index === -1) {
          reportsByWorkFlow.push({ category: 'Unorganized', subRows: [r] });
        } else {
          reportsByWorkFlow[index].subRows?.push(r);
        }
      }
    });

    return reportsByWorkFlow;
  }, [fileRecords, context?.reportData.filerecords, context?.focusedIssues, workflowMapping]);

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...userDisplayStrings }),
    [userDisplayStrings]
  );

  const sortByLevel = React.useCallback((rowA: Row<TableRow>, rowB: Row<TableRow>) => {
    const levelsOrder = ['Fatal', 'Error', 'Critical', 'Warning', 'Info'];
    const indexA = levelsOrder.indexOf(rowA.original.level || '');
    const indexB = levelsOrder.indexOf(rowB.original.level || '');
    return indexA > indexB ? 1 : -1;
  }, []);

  const getFileNameFromId = React.useCallback(
    (id?: string) => {
      const filesInfo = sourceFilesInfo || context?.reportData.sourceFilesInfo;
      return filesInfo?.fileId === id
        ? filesInfo?.fileName
        : filesInfo?.Files?.find((file) => file.fileId === id)?.fileName;
    },
    [sourceFilesInfo, context?.reportData.sourceFilesInfo]
  );

  const columns = React.useMemo(
    () =>
      [
        {
          Header: 'Table',
          columns: [
            {
              id: 'category',
              accessor: 'category',
              Header: displayStrings.category,
              Filter: tableFilters.TextFilter(),
              minWidth: 50,
              maxWidth: 250,
              Cell: (row: CellProps<TableRow>) =>
                row.row.subRows.length === 0 ? (
                  <div
                    className='iui-anchor'
                    onClick={() => {
                      context?.setCurrentAuditInfo({
                        ...row.row.original,
                        fileName: row.row.original.fileName ?? getFileNameFromId(row.row.original.fileId),
                      });
                    }}
                  >
                    {row.value}
                  </div>
                ) : (
                  row.value
                ),
            },
            {
              id: 'type',
              accessor: 'type',
              Header: displayStrings.type,
              Filter: tableFilters.TextFilter(),
              minWidth: 75,
              maxWidth: 250,
            },
            {
              id: 'level',
              accessor: 'level',
              Header: displayStrings.level,
              Filter: tableFilters.TextFilter(),
              minWidth: 75,
              maxWidth: 250,
              sortType: sortByLevel,
              cellRenderer: ({ cellElementProps, cellProps }: CellRendererProps<TableRow>) => {
                const level = cellProps.row.original.level;
                const _isError = level === 'Error' || level === 'Fatal';
                const _isWarning = level === 'Warning' || level === 'Critical';

                return (
                  <DefaultCell
                    cellElementProps={cellElementProps}
                    cellProps={cellProps}
                    startIcon={
                      _isError ? (
                        <SvgStatusError />
                      ) : _isWarning ? (
                        <SvgStatusWarning />
                      ) : level ? (
                        <SvgInfoHollow />
                      ) : undefined
                    }
                  >
                    {level && level in displayStrings ? displayStrings[level] : level}
                  </DefaultCell>
                );
              },
            },
            {
              id: 'fileName',
              accessor: ({ fileName, fileId }) => fileName ?? getFileNameFromId(fileId),
              Header: displayStrings.fileName,
              Filter: tableFilters.TextFilter(),
              cellClassName: 'iui-main',
              minWidth: 150,
              cellRenderer: ({ cellElementProps, cellProps }: CellRendererProps<TableRow>) => {
                const extension = cellProps.value?.substring(cellProps.value.lastIndexOf('.') + 1);
                return cellProps.row.subRows.length === 0 ? (
                  <DefaultCell
                    cellElementProps={cellElementProps}
                    cellProps={cellProps}
                    startIcon={
                      extension && extension in filetypeIcons ? filetypeIcons[extension] : <SvgFiletypeDocument />
                    }
                  >
                    {cellProps.value}
                  </DefaultCell>
                ) : (
                  ''
                );
              },
            },
            {
              id: 'message',
              accessor: 'message',
              Header: displayStrings.message,
              Filter: tableFilters.TextFilter(),
              minWidth: 200,
              cellClassName: 'isr-workflow-message',
              Cell: ({ value }: CellProps<TableRow>) => <ClampWithTooltip>{value}</ClampWithTooltip>,
            },
          ],
        },
      ] as Column<TableRow>[],
    [context, displayStrings, filetypeIcons, getFileNameFromId, sortByLevel]
  );

  const rowProps = useCallback(
    ({
      original: { level },
    }: Row<TableRow>): {
      status?: 'positive' | 'warning' | 'negative';
    } => {
      switch (level) {
        case 'Error':
        case 'Fatal':
          return { status: 'negative' };
        case 'Critical':
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
      enableVirtualization
      autoResetExpanded={false}
      className={classnames('isr-workflow-table', className)}
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      emptyFilteredTableContent='No results found. Clear or try another filter.'
      isSortable
      rowProps={rowProps}
      paginatorRenderer={(props) => <TablePaginator pageSizeList={[10, 25, 50]} {...props} />}
      {...rest}
    />
  );
};

export default WorkflowTable;
