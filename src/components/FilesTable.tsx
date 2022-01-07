import * as React from 'react';
import classnames from 'classnames';
import { StatusIcon, ClampWithTooltip, TextWithIcon } from './utils';
import { Table, tableFilters, Text, Badge } from '@itwin/itwinui-react';
import type { TableProps } from '@itwin/itwinui-react';
import type { SourceFilesInfo, SourceFile } from './report-data-typings';
import type { CellProps, Row } from 'react-table';
import { ReportContext } from './Report';
import SvgFiletypeMicrostation from '@itwin/itwinui-icons-color-react/esm/icons/FiletypeMicrostation';
import SvgFiletypeDocument from '@itwin/itwinui-icons-color-react/esm/icons/FiletypeDocument';
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

const defaultFileTypeIcons = {
  dgn: <SvgFiletypeMicrostation />,
  dgnlib: <SvgFiletypeMicrostation />,
};

/**
 * FilesTable should be shown when the files tab is active. It contains information about the processing and source of files.
 *
 * Localization is supported using the `displayStrings` prop, and custom icons can be specified using `fileTypeIcons` and `datasourceIcons`.
 * All of `Table` props from iTwinUI-react are also supported.
 */
export const FilesTable = ({
  displayStrings: userDisplayStrings,
  sourceFilesInfo,
  fileTypeIcons: userFileTypeIcons,
  datasourceIcons,
  className,
  ...rest
}: {
  sourceFilesInfo?: SourceFilesInfo;
  displayStrings?: Partial<typeof defaultDisplayStrings>;
  /** Icons to show before the file names. */
  fileTypeIcons?: Record<string, JSX.Element>;
  /**
   * Custom icons to show in the dataSource column.
   * @example
   * datasourceIcons={{ 'iTwin File Service': <Svg>...</Svg> }}
   */
  datasourceIcons?: Record<string, JSX.Element>;
} & Partial<TableProps>) => {
  const filetypeIcons = React.useMemo(
    () => ({ ...defaultFileTypeIcons, ...userFileTypeIcons } as Record<string, JSX.Element>),
    [userFileTypeIcons]
  );

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...userDisplayStrings }),
    [userDisplayStrings]
  );

  const context = React.useContext(ReportContext);
  const search = context?.searchString || '';

  const filterFiles = React.useCallback(
    (file: SourceFile) =>
      Object.values(file).some(
        (value) => value && typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const data = React.useMemo(() => {
    const filesInfo = sourceFilesInfo || context?.reportData.sourceFilesInfo;
    return [{ ...filesInfo, mainFile: true }, ...(filesInfo?.Files ?? [])].filter((file) => filterFiles(file));
  }, [sourceFilesInfo, context?.reportData.sourceFilesInfo, filterFiles]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'fileName',
            accessor: 'fileName',
            minWidth: 125,
            Header: displayStrings['fileName'],
            Filter: tableFilters.TextFilter(),
            Cell: ({ row: { original } }: CellProps<SourceFile>) => {
              const extension = original.fileName?.substring(original.fileName.lastIndexOf('.') + 1);
              return (
                <div className='isr-file-name'>
                  <TextWithIcon
                    icon={extension && extension in filetypeIcons ? filetypeIcons[extension] : <SvgFiletypeDocument />}
                  >
                    {original.fileName}
                  </TextWithIcon>
                  {original.mainFile && <Badge backgroundColor='primary'>{displayStrings['mainFile']}</Badge>}
                </div>
              );
            },
          },
          {
            id: 'status',
            Header: displayStrings['status'],
            Filter: tableFilters.TextFilter(),
            minWidth: 75,
            maxWidth: 250,
            Cell: (props: CellProps<SourceFile>) => {
              /* Note: This field can be changed to `State` value from row props. */
              return !props.row.original.fileExists && !props.row.original.bimFileExists ? (
                <TextWithIcon icon={<StatusIcon status='error' />} className='isr-files-status-negative'>
                  <Text>{displayStrings['failed']}</Text>
                </TextWithIcon>
              ) : (
                <TextWithIcon icon={<StatusIcon status='success' />} className='isr-files-status-positive'>
                  <Text>{displayStrings['processed']}</Text>
                </TextWithIcon>
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
                    className='isr-files-data-text isr-files-link isr-line-clamp'
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
            minWidth: 100,
            Header: displayStrings['fileID'],
            Filter: tableFilters.TextFilter(),
            Cell: (props: CellProps<SourceFile>) => {
              return <ClampWithTooltip className='isr-files-data-text'>{props.row.original.fileId}</ClampWithTooltip>;
            },
          },
          {
            id: 'dataSource',
            accessor: 'dataSource',
            minWidth: 100,
            Header: displayStrings['datasource'],
            Filter: tableFilters.TextFilter(),
            Cell: ({ value }: CellProps<SourceFile>) => {
              return (
                <TextWithIcon icon={datasourceIcons && value in datasourceIcons && datasourceIcons[value]}>
                  {value}
                </TextWithIcon>
              );
            },
          },
        ],
      },
    ],
    [displayStrings, filetypeIcons, datasourceIcons]
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
