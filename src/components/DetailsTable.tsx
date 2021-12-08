import * as React from 'react';
import { Table, tableFilters, TablePaginator, TableProps } from '@itwin/itwinui-react';
import { ReportContext } from './Report';
import type { FileRecord, SourceFilesInfo } from './typings';
import type { Column } from 'react-table';

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
    const files = fileRecords || context?.data.filerecords || [];
    return files
      .map(({ file, auditrecords }) =>
        (auditrecords ?? []).map(({ auditinfo }) => ({ fileId: file?.identifier, ...auditinfo }))
      )
      .flat();
  }, [fileRecords, context?.data.filerecords]);

  const getFileNameFromId = React.useCallback(
    (id?: string) => {
      const filesInfo = sourceFilesInfo || context?.data.sourceFilesInfo;
      return filesInfo?.fileId === id
        ? filesInfo?.fileName
        : filesInfo?.Files?.find((file) => file.fileId === id)?.fileName;
    },
    [sourceFilesInfo, context?.data.sourceFilesInfo]
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

export default DetailsTable;
