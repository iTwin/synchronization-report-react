import { Leading, Table, tableFilters, TablePaginator, TableProps } from '@itwin/itwinui-react';
import { useCallback, useMemo, useRef, useState } from 'react';
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
  const data = useMemo(
    () =>
      (fileRecords ?? [])
        .map(({ file, auditrecords }) =>
          (auditrecords ?? []).map(({ auditinfo }) => ({ fileId: file?.identifier, ...auditinfo }))
        )
        .flat(),
    [fileRecords]
  );

  const getFileNameFromId = useCallback(
    (id?: string) =>
      sourceFilesInfo?.fileId === id
        ? sourceFilesInfo?.fileName
        : sourceFilesInfo?.files?.find((file) => file.fileId === id)?.fileName,
    []
  );

  const columns: Column<Partial<typeof data[number]>>[] = useMemo(
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
    []
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
