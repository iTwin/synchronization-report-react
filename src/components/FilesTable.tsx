import * as React from 'react';
import classnames from 'classnames';
import { Table, tableFilters, Text, Small, Tooltip, Badge } from '@itwin/itwinui-react';
import type { TableProps } from '@itwin/itwinui-react';
import type { SourceFilesInfo, SourceFile } from './typings';
import type { CellProps, Row } from 'react-table';
import { StatusIcon } from './utils';
import { ReportContext } from './Report';
import './FilesTable.scss';

export const FilesTable = ({
  sourceFilesInfo,
  className,
  ...rest
}: { sourceFilesInfo?: SourceFilesInfo } & Partial<TableProps>) => {
  const context = React.useContext(ReportContext);

  const data = React.useMemo(() => {
    const filesInfo = sourceFilesInfo || context?.reportData.sourceFilesInfo;
    return [{ ...filesInfo, mainFile: true }, ...(filesInfo?.Files ?? [])];
  }, [sourceFilesInfo, context?.reportData.sourceFilesInfo]);

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
            Cell: (props: CellProps<SourceFile>) => {
              return (
                <div className='isr-file-name'>
                  <Text>{props.row.original.fileName}</Text>
                  {props.row.original.mainFile && <Badge backgroundColor='primary'>master</Badge>}
                </div>
              );
            },
          },
          {
            id: 'status',
            Header: 'Status',
            Filter: tableFilters.TextFilter(),
            maxWidth: 250,
            Cell: (props: CellProps<SourceFile>) => {
              return !props.row.original.fileExists && !props.row.original.bimFileExists ? (
                <div className='isr-status-message isr-status-negative'>
                  <StatusIcon status='error' className='isr-grid-icon' />
                  <Text className='isr-grid-text'>Failed</Text>
                  <Small className='isr-grid-subText'>File by that name not found at this datasource/path.</Small>
                </div>
              ) : (
                <div className='isr-status-message isr-status-positive'>
                  <StatusIcon status='success' className='isr-grid-icon' />
                  <Text className='isr-grid-text'>Processed</Text>
                </div>
              );
            },
          },
          {
            id: 'path',
            accessor: 'path',
            Header: 'Path',
            Filter: tableFilters.TextFilter(),
            Cell: (props: CellProps<SourceFile>) => {
              return (
                props.row.original.path && (
                  <Tooltip content={props.row.original.path}>
                    <div className='isr-tooltip-block'>
                      <Text className='isr-data-text'>{props.row.original.path}</Text>
                    </div>
                  </Tooltip>
                )
              );
            },
          },
          {
            id: 'fileId',
            accessor: 'fileId',
            Header: 'File ID',
            Filter: tableFilters.TextFilter(),
            maxWidth: 320,
            Cell: (props: CellProps<SourceFile>) => {
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
        className={classnames('isr-files-table', className)}
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        isSortable
        rowProps={({ original: { fileExists, bimFileExists } }: Row<SourceFile>) => ({
          // classnames for adding status styling to row (e.g. stripe at the beginning of the row)
          className: classnames({
            'iui-negative': !fileExists && !bimFileExists,
          }),
        })}
        {...rest}
      />
    </>
  );
};
