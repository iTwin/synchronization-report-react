/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import { ClampWithTooltip, StatusIcon } from './utils';
import { Table, tableFilters, Text, Badge, DefaultCell, Anchor } from '@itwin/itwinui-react';
import type { TableProps } from '@itwin/itwinui-react';
import type { SourceFilesInfo, SourceFile, FileRecord } from './report-data-typings';
import type { CellProps, Column, Row, CellRendererProps } from 'react-table';
import { ReportContext } from './Report';
import SvgFiletypeMicrostation from '@itwin/itwinui-icons-color-react/esm/icons/FiletypeMicrostation';
import SvgFiletypeDocument from '@itwin/itwinui-icons-color-react/esm/icons/FiletypeDocument';
import SvgStatusError from '@itwin/itwinui-icons-color-react/esm/icons/StatusError';
import './FilesTable.scss';

const defaultDisplayStrings = {
  failed: 'Failed',
  processed: 'Processed',
  processedWithIssues: 'Processed with issues',
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
 * FilesTable should be shown when the files selection is active. It contains information about the processing and source of files.
 *
 * Localization is supported using the `displayStrings` prop, and custom icons can be specified using `fileTypeIcons` and `datasourceIcons`.
 * All of `Table` props from iTwinUI-react are also supported.
 */
export const FilesTable = ({
  displayStrings: userDisplayStrings,
  sourceFilesInfo,
  fileRecords,
  fileTypeIcons: userFileTypeIcons,
  datasourceIcons,
  className,
  ...rest
}: {
  sourceFilesInfo?: SourceFilesInfo;
  fileRecords?: FileRecord[];
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
  fileRecords ??= context?.reportData.filerecords ?? [];
  const data = React.useMemo(() => {
    const filesInfo = sourceFilesInfo || context?.reportData.sourceFilesInfo;
    return [
      { ...filesInfo, mainFile: true },
      ...(filesInfo && filesInfo.Files ? filesInfo.Files.filter((file: SourceFile) => file.state !== 'Hidden') : []),
    ];
  }, [sourceFilesInfo, context?.reportData.sourceFilesInfo]);

  const processedWithIssues = React.useMemo(() => {
    const fileStatusEntries = data
      .filter((sourceFile) => !!sourceFile.fileId)
      .map(({ fileId }) => {
        const hasIssue = fileRecords
          ?.filter(({ file }) => file?.identifier === fileId)
          .flatMap(({ auditrecords }) => auditrecords ?? [])
          .some(({ auditinfo }) => ['Critical', 'Fatal', 'Warning', 'Error'].includes(auditinfo?.level ?? ''));
        return [fileId, hasIssue] as const;
      });

    return Object.fromEntries(fileStatusEntries) as Record<string, boolean>;
  }, [data, fileRecords]);

  const columns = React.useMemo(
    () =>
      [
        {
          id: 'fileName',
          accessor: 'fileName',
          minWidth: 125,
          Header: displayStrings['fileName'],
          Filter: tableFilters.TextFilter(),
          cellRenderer: ({ cellElementProps, cellProps }: CellRendererProps<SourceFile>) => {
            const extension = cellProps.row.original.fileName?.substring(
              cellProps.row.original.fileName.lastIndexOf('.') + 1
            );
            return (
              <DefaultCell
                cellElementProps={cellElementProps}
                cellProps={cellProps}
                startIcon={extension && extension in filetypeIcons ? filetypeIcons[extension] : <SvgFiletypeDocument />}
              >
                <div className='isr-file-name'>
                  {cellProps.row.original.fileName}
                  {cellProps.row.original.mainFile && (
                    <Badge backgroundColor='primary'>{displayStrings['mainFile']}</Badge>
                  )}
                </div>
              </DefaultCell>
            );
          },
        },
        {
          id: 'status',
          Header: displayStrings['status'],
          minWidth: 75,
          maxWidth: 200,
          cellRenderer: ({ cellElementProps, cellProps }: CellRendererProps<SourceFile>) =>
            /* Note: This field can be changed to `State` value from row props. */
            !cellProps.row.original.fileExists && !cellProps.row.original.bimFileExists ? (
              <DefaultCell cellElementProps={cellElementProps} cellProps={cellProps} startIcon={<SvgStatusError />}>
                <Text>{displayStrings['failed']}</Text>
              </DefaultCell>
            ) : cellProps.row.original.fileId && processedWithIssues[cellProps.row.original.fileId] ? (
              <DefaultCell
                cellElementProps={cellElementProps}
                cellProps={cellProps}
                startIcon={<StatusIcon status='warning' />}
              >
                <Text>{displayStrings['processedWithIssues']}</Text>
              </DefaultCell>
            ) : (
              <DefaultCell
                cellElementProps={cellElementProps}
                cellProps={cellProps}
                startIcon={<StatusIcon status='success' />}
              >
                <Text>{displayStrings['processed']}</Text>
              </DefaultCell>
            ),
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
                <Anchor href={props.row.original.path} target='_blank' rel='noopener noreferrer'>
                  {props.row.original.path}
                </Anchor>
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
          cellRenderer: ({ cellElementProps, cellProps }: CellRendererProps<SourceFile>) => (
            <DefaultCell
              cellElementProps={cellElementProps}
              cellProps={cellProps}
              startIcon={
                datasourceIcons && cellProps.value in datasourceIcons ? datasourceIcons[cellProps.value] : undefined
              }
            >
              {cellProps.value}
            </DefaultCell>
          ),
        },
      ] as Column<SourceFile>[],
    [displayStrings, filetypeIcons, processedWithIssues, datasourceIcons]
  );

  const rowProps = React.useCallback(
    ({
      original: { fileExists, bimFileExists },
    }: Row<SourceFile>): {
      status?: 'positive' | 'warning' | 'negative';
    } => (!fileExists && !bimFileExists ? { status: 'negative' } : {}),
    []
  );

  return (
    <>
      <Table
        enableVirtualization
        className={classnames('isr-files-table', className)}
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        emptyFilteredTableContent='No results found. Clear or try another filter.'
        isSortable
        rowProps={rowProps}
        {...rest}
      />
    </>
  );
};
