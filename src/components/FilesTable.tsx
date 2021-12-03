import * as React from 'react';
import { Table, tableFilters, TableProps } from '@itwin/itwinui-react';
import { SourceFilesInfo } from './typings';

export const FilesTable = ({
  sourceFilesInfo,
  ...rest
}: { sourceFilesInfo?: SourceFilesInfo } & Partial<TableProps>) => {
  const data = React.useMemo(() => [{ ...sourceFilesInfo }, ...(sourceFilesInfo?.Files ?? [])], [sourceFilesInfo]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'fileName',
            accessor: 'fileName',
            Header: 'File name',
            Filter: tableFilters.TextFilter(),
          },
          {
            id: 'status',
            accessor: 'state',
            Header: 'Status',
            Filter: tableFilters.TextFilter(),
            maxWidth: 250,
          },
          {
            id: 'issues',
            accessor: 'issues',
            Header: 'Issues',
            Filter: tableFilters.TextFilter(),
            maxWidth: 180,
          },
          {
            id: 'path',
            accessor: 'path',
            Header: 'Path',
            Filter: tableFilters.TextFilter(),
          },
          {
            id: 'fileId',
            accessor: 'fileId',
            Header: 'File ID',
            Filter: tableFilters.TextFilter(),
            maxWidth: 320,
          },
          {
            id: 'dataSource',
            accessor: 'dataSource',
            Header: 'Data Source',
            Filter: tableFilters.TextFilter(),
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <Table
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        isSortable
        initialState={{ sortBy: [{ id: 'status' }] }}
        {...rest}
      />
    </>
  );
};
