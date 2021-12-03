import * as React from 'react';
import { Table, tableFilters, TablePaginator, TableProps } from '@itwin/itwinui-react';
import type { FileRecord, SourceFilesInfo } from './typings';
import type { Column } from 'react-table';

// const SynchronizationSeverity = {
//   info: 'Info',
//   warning: 'Warning',
//   criticalWarning: 'Critical warning',
//   error: 'Error',
//   fatalError: 'Fatal error',
// } as const;

export const DetailsTable = ({
  fileRecords,
  sourceFilesInfo,
  ...rest
}: {
  fileRecords?: FileRecord[];
  sourceFilesInfo?: SourceFilesInfo;
} & Partial<TableProps>) => {
  const data = React.useMemo(
    () =>
      (fileRecords ?? [])
        .map(({ file, auditrecords }) =>
          (auditrecords ?? []).map(({ auditinfo }) => ({ fileId: file?.identifier, ...auditinfo }))
        )
        .flat(),
    [fileRecords]
  );

  const getFileNameFromId = React.useCallback(
    (id?: string) =>
      sourceFilesInfo?.fileId === id
        ? sourceFilesInfo?.fileName
        : sourceFilesInfo?.Files?.find((file) => file.fileId === id)?.fileName,
    [sourceFilesInfo]
  );

  const columns: Column<Partial<typeof data[number]>>[] = React.useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'fileName',
            accessor: ({ fileName, fileId }) => fileName ?? getFileNameFromId(fileId),
            Header: 'File name',
            Filter: tableFilters.TextFilter(),
          },
          {
            id: 'level',
            accessor: 'level',
            Header: 'Severity',
            Filter: tableFilters.TextFilter(),
            maxWidth: 180,
          },
          {
            id: 'category',
            accessor: 'category',
            Header: 'Category',
            Filter: tableFilters.TextFilter(),
            maxWidth: 200,
          },
          {
            id: 'type',
            accessor: 'type',
            Header: 'Type',
            Filter: tableFilters.TextFilter(),
            maxWidth: 200,
          },
          {
            id: 'message',
            accessor: 'message',
            Header: 'Message',
            Filter: tableFilters.TextFilter(),
          },
        ],
      },
    ],
    [getFileNameFromId]
  );

  return (
    <>
      <Table
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        isSortable
        initialState={{ sortBy: [{ id: 'level' }] }}
        paginatorRenderer={(props) => <TablePaginator {...props} />}
        {...rest}
      />
    </>
  );
};
