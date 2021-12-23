import * as React from 'react';
import classnames from 'classnames';
import { Table, tableFilters, TablePaginator } from '@itwin/itwinui-react';
import { ReportContext } from './Report';
import { ClampWithTooltip, StatusIcon, TextWithIcon } from './utils';
import type { TableProps } from '@itwin/itwinui-react';
import type { AuditInfo, AuditRecord, FileRecord, SourceFilesInfo } from './typings';
import type { Column, Row, CellProps, CellRendererProps } from 'react-table';
import SvgFiletypeMicrostation from '@itwin/itwinui-icons-color-react/esm/icons/FiletypeMicrostation';
import SvgFiletypeDocument from '@itwin/itwinui-icons-color-react/esm/icons/FiletypeDocument';
import './DetailsTable.scss';
import { useCallback } from 'react';

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
};

const defaultFileTypeIcons = {
  dgn: <SvgFiletypeMicrostation />,
  dgnlib: <SvgFiletypeMicrostation />,
};

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
  fileTypeIcons?: Record<string, JSX.Element>;
  displayStrings?: typeof defaultDisplayStrings;
} & Partial<TableProps>) => {
  const filetypeIcons = React.useMemo(
    () => ({ ...defaultFileTypeIcons, ...userFileTypeIcons } as Record<string, JSX.Element>),
    [userFileTypeIcons]
  );

  const context = React.useContext(ReportContext);
  const search = context?.searchString || '';

  const filterProp = useCallback(
    (prop?: string) => {
      if (!prop) return false;
      return prop.toLowerCase().includes(search);
    },
    [search]
  );

  const filterFile = useCallback(
    (file: AuditInfo) => {
      return (
        filterProp(file.fileName) ||
        filterProp(file.level) ||
        filterProp(file.category) ||
        filterProp(file.type) ||
        filterProp(file.message)
      );
    },
    [filterProp]
  );

  const data = React.useMemo(() => {
    const files = fileRecords || context?.reportData.filerecords || [];
    return files
      .map(({ file, auditrecords }) =>
        (auditrecords ?? []).map(({ auditinfo }) => ({ fileId: file?.identifier, ...auditinfo }))
      )
      .flat()
      .filter((file) => filterFile(file));
  }, [fileRecords, context?.reportData.filerecords, filterFile]);

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
          // classnames for adding status styling to row (e.g. stripe at the beginning of the row)
          className: classnames({
            'iui-negative': level === 'Fatal' || level === 'Error',
            'iui-warning': level === 'Critical' || level === 'Warning',
          }),
        })}
        paginatorRenderer={(props) => <TablePaginator pageSizeList={[10, 25, 50]} {...props} />}
        {...rest}
      />
    </>
  );
};

export default DetailsTable;
