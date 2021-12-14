import * as React from 'react';
import { Table, tableFilters, TablePaginator, TableProps } from '@itwin/itwinui-react';
import { ReportContext } from './Report';
import { ClampWithTooltip, StatusIcon } from './utils';
import type { FileRecord, SourceFilesInfo } from './typings';
import type { Column, Row, CellProps, CellRendererProps } from 'react-table';
import classnames from 'classnames';
import './DetailsTable.scss';

const displayStrings = {
  Fatal: 'Fatal Error',
  Error: 'Error',
  Critical: 'Critical Warning',
  Warning: 'Warning',
  Info: 'Info',
} as const;

export const DetailsTable = ({
  fileRecords,
  sourceFilesInfo,
  ...rest
}: {
  fileRecords?: FileRecord[];
  sourceFilesInfo?: SourceFilesInfo;
} & Partial<TableProps>) => {
  const context = React.useContext(ReportContext);
  const data = React.useMemo(() => {
    const files = fileRecords || context?.reportData.filerecords || [];
    return files
      .map(({ file, auditrecords }) =>
        (auditrecords ?? []).map(({ auditinfo }) => ({ fileId: file?.identifier, ...auditinfo }))
      )
      .flat();
  }, [fileRecords, context?.reportData.filerecords]);

  const getFileNameFromId = React.useCallback(
    (id?: string) => {
      const filesInfo = sourceFilesInfo || context?.reportData.sourceFilesInfo;
      return filesInfo?.fileId === id
        ? filesInfo?.fileName
        : filesInfo?.Files?.find((file) => file.fileId === id)?.fileName;
    },
    [sourceFilesInfo, context?.reportData.sourceFilesInfo]
  );

  type TableRow = Partial<typeof data[number]>;

  const sortByLevel = React.useCallback((rowA: Row<TableRow>, rowB: Row<TableRow>) => {
    const levelsOrder = ['Fatal', 'Error', 'Critical', 'Warning', 'Info'];
    const indexA = levelsOrder.indexOf(rowA.original.level || '');
    const indexB = levelsOrder.indexOf(rowB.original.level || '');
    return indexA > indexB ? 1 : -1;
  }, []);

  const columns = React.useMemo(
    () =>
      [
        {
          Header: 'Table',
          columns: [
            {
              id: 'fileName',
              accessor: ({ fileName, fileId }) => fileName ?? getFileNameFromId(fileId),
              Header: 'File name',
              Filter: tableFilters.TextFilter(),
              cellClassName: 'iui-main',
            },
            {
              id: 'level',
              accessor: 'level',
              Header: 'Severity',
              Filter: tableFilters.TextFilter(),
              maxWidth: 180,
              sortType: sortByLevel,
              cellRenderer: ({ cellElementProps, cellProps }: CellRendererProps<TableRow>) => {
                const level = cellProps.row.original.level;
                const _isError = level === 'Error' || level === 'Fatal';
                const _isWarning = level === 'Warning' || level === 'Critical';

                return (
                  <div
                    {...cellElementProps}
                    className={classnames(
                      'isr-details-status',
                      {
                        'isr-status-fatal': level === 'Fatal',
                        'isr-status-negative': level === 'Error',
                        'isr-status-critical': level === 'Critical',
                        'isr-status-warning': level === 'Warning',
                        'isr-status-primary': level === 'Info',
                      },
                      cellElementProps.className
                    )}
                  >
                    {level && (
                      <>
                        <StatusIcon status={_isError ? 'error' : _isWarning ? 'warning' : 'informational'} />
                        {level in displayStrings ? displayStrings[level] : level}
                      </>
                    )}
                  </div>
                );
              },
            },
            {
              id: 'category',
              accessor: 'category',
              Header: 'Category',
              Filter: tableFilters.TextFilter(),
              maxWidth: 200,
              Cell: ({ value }: CellProps<TableRow>) => value.replace(/([A-Z])/g, ' $1'), // add spaces between words
            },
            {
              id: 'type',
              accessor: 'type',
              Header: 'Type',
              Filter: tableFilters.TextFilter(),
              maxWidth: 200,
              Cell: ({ value }: CellProps<TableRow>) => value.replace(/([A-Z])/g, ' $1'), // add spaces between words
            },
            {
              id: 'message',
              accessor: 'message',
              Header: 'Message',
              Filter: tableFilters.TextFilter(),
              cellClassName: 'isr-details-message',
              Cell: ({ value }: CellProps<TableRow>) => <ClampWithTooltip>{value}</ClampWithTooltip>,
            },
          ],
        },
      ] as Column<TableRow>[],
    [getFileNameFromId, sortByLevel]
  );

  return (
    <>
      <Table
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        isSortable
        initialState={{ sortBy: [{ id: 'level' }] }}
        rowProps={({ original: { level } }: Row<TableRow>) => ({
          className: classnames({
            'iui-negative': level === 'Fatal' || level === 'Error',
            'iui-warning': level === 'Critical' || level === 'Warning',
          }),
        })}
        paginatorRenderer={(props) => <TablePaginator {...props} />}
        {...rest}
      />
    </>
  );
};

export default DetailsTable;
