import * as React from 'react';
import classnames from 'classnames';
import { StatusIcon, ClampWithTooltip } from './utils';
import { Table, tableFilters, Text, Badge } from '@itwin/itwinui-react';
import type { TableProps } from '@itwin/itwinui-react';
import type { SourceFilesInfo, SourceFile } from './typings';
import type { CellProps, Row } from 'react-table';
import { ReportContext } from './Report';
import './FilesTable.scss';

const defaultDisplayStrings = {
  failed: 'Failed',
  processed: 'Processed',
  fileName: 'File name',
  status: 'Status',
  path: 'Path',
  fileID: 'File ID',
  datasource: 'Datasource',
  mainFile: 'master',
};

/** Table to display Files in Report. */
export const FilesTable = ({
  displayStrings: userDisplayStrings,
  sourceFilesInfo,
  className,
  ...rest
}: {
  sourceFilesInfo?: SourceFilesInfo;
  displayStrings?: typeof defaultDisplayStrings;
} & Partial<TableProps>) => {
  const displayStrings = { ...defaultDisplayStrings, ...userDisplayStrings };

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
            minWidth: 220,
            Header: displayStrings['fileName'],
            Filter: tableFilters.TextFilter(),
            Cell: (props: CellProps<SourceFile>) => {
              return (
                <div className='isr-file-name'>
                  <Text>{props.row.original.fileName}</Text>
                  {props.row.original.mainFile && <Badge backgroundColor='primary'>{displayStrings['mainFile']}</Badge>}
                </div>
              );
            },
          },
          {
            id: 'status',
            Header: displayStrings['status'],
            Filter: tableFilters.TextFilter(),
            minWidth: 120,
            maxWidth: 250,
            Cell: (props: CellProps<SourceFile>) => {
              /* Note: This field can be changed to `State` value from row props. */
              return !props.row.original.fileExists && !props.row.original.bimFileExists ? (
                <div className='isr-files-status-message isr-status-negative'>
                  <StatusIcon status='error' className='isr-grid-icon' />
                  <Text className='isr-grid-text'>{displayStrings['failed']}</Text>
                </div>
              ) : (
                <div className='isr-files-status-message isr-status-positive'>
                  <StatusIcon status='success' className='isr-grid-icon' />
                  <Text className='isr-grid-text'>{displayStrings['processed']}</Text>
                </div>
              );
            },
          },
          {
            id: 'path',
            accessor: 'path',
            minWidth: 150,
            Header: displayStrings['path'],
            Filter: tableFilters.TextFilter(),
            Cell: (props: CellProps<SourceFile>) => {
              return (
                props.row.original.path && (
                  <a
                    className='isr-files-data-text isr-files-link'
                    href={props.row.original.path}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {props.row.original.path}
                  </a>
                )
              );
            },
          },
          {
            id: 'fileId',
            accessor: 'fileId',
            minWidth: 150,
            Header: displayStrings['fileID'],
            Filter: tableFilters.TextFilter(),
            Cell: (props: CellProps<SourceFile>) => {
              return <ClampWithTooltip className='isr-files-data-text'>{props.row.original.fileId}</ClampWithTooltip>;
            },
          },
          {
            id: 'dataSource',
            accessor: 'dataSource',
            maxWidth: 300,
            minWidth: 200,
            Header: displayStrings['datasource'],
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
        isResizable
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
