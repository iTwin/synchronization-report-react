import * as React from 'react';
import { Table, tableFilters, TableProps, Text, Small, Tooltip, MiddleTextTruncation } from '@itwin/itwinui-react';
import { SourceFilesInfo } from './typings';
import { CellProps } from 'react-table';
import SvgStatusError from '@itwin/itwinui-icons-color-react/esm/icons/StatusError';
import SvgStatusSuccess from '@itwin/itwinui-icons-color-react/esm/icons/StatusSuccess';
import './FilesTable.scss';

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
            Header: 'Status',
            Filter: tableFilters.TextFilter(),
            maxWidth: 250,
            Cell: (props: CellProps<SourceFile>) => {
              return !props.row.original.fileExists && !props.row.original.bimFileExists ? (
                <div className='isr-status-message'>
                  <SvgStatusError className='isr-grid-icon' />
                  <Text className='isr-grid-text isr-status-negative'>Failed</Text>
                  <Small className='isr-grid-subText'>File by that name not found at this datasource/path.</Small>
                </div>
              ) : (
                <div className='isr-status-message'>
                  <SvgStatusSuccess className='isr-grid-icon' />
                  <Text className='isr-grid-text isr-status-positive'>Processed</Text>
                </div>
              );
            },
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
            Cell: (props: CellProps<SourceFile>) => {
              return (
                <Tooltip content={props.row.original.path}>
                  <div className='isr-tooltip-block'>
                    <MiddleTextTruncation
                      className='isr-data-text'
                      style={{ flexGrow: 1 }}
                      text={props.row.original.path!}
                    />
                  </div>
                </Tooltip>
              );
            },
          },
          {
            id: 'fileId',
            accessor: 'fileId',
            Header: 'File ID',
            Filter: tableFilters.TextFilter(),
            maxWidth: 320,
            Cell: (props: any) => {
              return (
                <Tooltip content={props.row.original.fileId}>
                  <div className='isr-tooltip-block'>
                    <Text className='isr-data-text'>{props.row.original.fileId}</Text>
                  </div>
                </Tooltip>
              );
            },
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
