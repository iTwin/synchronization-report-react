import * as React from 'react';
import classnames from 'classnames';
import { DropdownMenu, IconButton, MenuItem, Table, tableFilters, TablePaginator } from '@itwin/itwinui-react';
import { ReportContext } from './Report';
import { ClampWithTooltip, StatusIcon, TextWithIcon } from './utils';
import type { TableProps } from '@itwin/itwinui-react';
import type { FileRecord, SourceFilesInfo } from './typings';
import type { Column, Row, CellProps, CellRendererProps } from 'react-table';
import SvgFiletypeMicrostation from '@itwin/itwinui-icons-color-react/esm/icons/FiletypeMicrostation';
import SvgFiletypeDocument from '@itwin/itwinui-icons-color-react/esm/icons/FiletypeDocument';
import SvgMore from '@itwin/itwinui-icons-react/esm/icons/More';
import SvgCopy from '@itwin/itwinui-icons-react/esm/icons/Copy';
import './DetailsTable.scss';

const defaultDisplayStrings = {
  Fatal: 'Fatal Error',
  Error: 'Error',
  Critical: 'Critical Warning',
  Warning: 'Warning',
  Info: 'Info',
  fileName: 'File name',
  level: 'Severity',
  category: 'Category',
  type: 'Type',
  message: 'Message',
  copyRow: 'Copy row',
  moreOptions: 'More options',
};

const defaultFileTypeIcons = {
  dgn: <SvgFiletypeMicrostation />,
  dgnlib: <SvgFiletypeMicrostation />,
};

/**
 * DetailsTable should be shown when the details tab is active. It contains details about the synchronization issues.
 *
 * Localization is supported using the `displayStrings` prop, and custom icons can be specified using `fileTypeIcons`.
 * All of `Table` props from iTwinUI-react are also supported.
 */
export const DetailsTable = ({
  fileRecords,
  sourceFilesInfo,
  fileTypeIcons: userFileTypeIcons,
  displayStrings: userDisplayStrings,
  className,
  ...rest
}: {
  fileRecords?: FileRecord[];
  sourceFilesInfo?: SourceFilesInfo;
  /** Icons to show before the file names. */
  fileTypeIcons?: Record<string, JSX.Element>;
  displayStrings?: Partial<typeof defaultDisplayStrings>;
} & Partial<TableProps>) => {
  const filetypeIcons = React.useMemo(
    () => ({ ...defaultFileTypeIcons, ...userFileTypeIcons } as Record<string, JSX.Element>),
    [userFileTypeIcons]
  );

  const context = React.useContext(ReportContext);
  const search = context?.searchString || '';

  const severityFilter = React.useCallback(
    (file: any) => {
      if (context?.severityFilter === 'error') {
        return file.level === 'Error' || file.level === 'Fatal';
      } else if (context?.severityFilter === 'warning') {
        return file.level === 'Warning' || file.level === 'Critical';
      } else if (context?.severityFilter === 'info') {
        return file.level === 'Info';
      }
      return true;
    },
    [context?.severityFilter]
  );

  const data = React.useMemo(() => {
    const files = fileRecords || context?.reportData.filerecords || [];
    return files
      .map(({ file, auditrecords }) =>
        (auditrecords ?? []).map(({ auditinfo }) => ({ fileId: file?.identifier, ...auditinfo }))
      )
      .flat()
      .filter(
        (file) =>
          severityFilter(file) &&
          Object.values(file).some(
            (value) => value && typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
          )
      );
  }, [fileRecords, context?.reportData.filerecords, severityFilter, search]);

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...userDisplayStrings }),
    [userDisplayStrings]
  );

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
              Header: displayStrings.fileName,
              Filter: tableFilters.TextFilter(),
              cellClassName: 'iui-main',
              minWidth: 150,
              Cell: ({ value }: CellProps<TableRow>) => {
                const extension = value?.substring(value.lastIndexOf('.') + 1);
                return (
                  <TextWithIcon
                    icon={extension && extension in filetypeIcons ? filetypeIcons[extension] : <SvgFiletypeDocument />}
                  >
                    {value}
                  </TextWithIcon>
                );
              },
            },
            {
              id: 'level',
              accessor: 'level',
              Header: displayStrings.level,
              Filter: tableFilters.TextFilter(),
              minWidth: 75,
              maxWidth: 250,
              sortType: sortByLevel,
              cellRenderer: ({ cellElementProps, cellProps }: CellRendererProps<TableRow>) => {
                const level = cellProps.row.original.level;
                const _isError = level === 'Error' || level === 'Fatal';
                const _isWarning = level === 'Warning' || level === 'Critical';

                return (
                  <div
                    {...cellElementProps}
                    className={classnames(
                      {
                        'isr-details-status-fatal': level === 'Fatal',
                        'isr-details-status-negative': level === 'Error',
                        'isr-details-status-critical': level === 'Critical',
                        'isr-details-status-warning': level === 'Warning',
                        'isr-details-status-primary': level === 'Info',
                      },
                      cellElementProps.className
                    )}
                  >
                    {level && (
                      <TextWithIcon
                        icon={<StatusIcon status={_isError ? 'error' : _isWarning ? 'warning' : 'informational'} />}
                      >
                        {level in displayStrings ? displayStrings[level] : level}
                      </TextWithIcon>
                    )}
                  </div>
                );
              },
            },
            {
              id: 'category',
              accessor: 'category',
              Header: displayStrings.category,
              Filter: tableFilters.TextFilter(),
              minWidth: 75,
              maxWidth: 250,
              Cell: ({ value }: CellProps<TableRow>) => value.replace(/([A-Z])/g, ' $1'), // add spaces between words
            },
            {
              id: 'type',
              accessor: 'type',
              Header: displayStrings.type,
              Filter: tableFilters.TextFilter(),
              minWidth: 50,
              maxWidth: 250,
              Cell: ({ value }: CellProps<TableRow>) => value.replace(/([A-Z])/g, ' $1'), // add spaces between words
            },
            {
              id: 'message',
              accessor: 'message',
              Header: displayStrings.message,
              Filter: tableFilters.TextFilter(),
              minWidth: 200,
              cellClassName: 'isr-details-message',
              Cell: ({ value }: CellProps<TableRow>) => <ClampWithTooltip>{value}</ClampWithTooltip>,
            },
            {
              id: 'more',
              Header: '',
              minWidth: 48,
              width: 48,
              maxWidth: 48,
              columnClassName: 'iui-slot',
              cellClassName: classnames('iui-slot', 'isr-details-slot-cell'),
              Cell: ({ row: { original } }: CellProps<TableRow>) => (
                <DropdownMenu
                  menuItems={(close) => [
                    <MenuItem
                      key='copy'
                      icon={<SvgCopy />}
                      onClick={async () => {
                        try {
                          await window.navigator.clipboard.writeText(JSON.stringify(original));
                        } catch (_) {
                          console.error('Cannot write to clipboard');
                        } finally {
                          close();
                        }
                      }}
                    >
                      {displayStrings.copyRow}
                    </MenuItem>,
                  ]}
                >
                  <div className='isr-details-more-button'>
                    <IconButton styleType='borderless' aria-label={displayStrings.moreOptions}>
                      <SvgMore />
                    </IconButton>
                  </div>
                </DropdownMenu>
              ),
            },
          ],
        },
      ] as Column<TableRow>[],
    [displayStrings, filetypeIcons, getFileNameFromId, sortByLevel]
  );

  return (
    <>
      <Table
        className={classnames('isr-details-table', className)}
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        isSortable
        initialState={{ sortBy: [{ id: 'level' }] }}
        rowProps={({ original: { level } }: Row<TableRow>) => ({
          className: classnames(
            'isr-details-row',
            // classnames for adding status styling to row (e.g. stripe at the beginning of the row)
            {
              'iui-negative': level === 'Fatal' || level === 'Error',
              'iui-warning': level === 'Critical' || level === 'Warning',
            }
          ),
        })}
        paginatorRenderer={(props) => <TablePaginator pageSizeList={[10, 25, 50]} {...props} />}
        {...rest}
      />
    </>
  );
};

export default DetailsTable;
