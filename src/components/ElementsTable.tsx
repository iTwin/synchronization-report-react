/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import { Table, tableFilters, TablePaginator } from '@itwin/itwinui-react';
import { ReportContext } from './Report';
import type { TableProps } from '@itwin/itwinui-react';
import type { ElementRecord } from './report-data-typings';
import type { Column } from 'react-table';
import './ElementsTable.scss';

const defaultDisplayStrings = {
  repositoryLinkId: 'Repository Link ID',
  reason: 'Reason',
  elementCount: 'Element Count',
};

/**
 * ElementsTable should be shown when the elements table selection is active. It contains details about missing elements.
 *
 * Localization is supported using the `displayStrings` prop.
 * All of `Table` props from iTwinUI-react are also supported.
 */
export const ElementsTable = ({
  elementsRecords,
  displayStrings: userDisplayStrings,
  className,
  ...rest
}: {
  elementsRecords?: ElementRecord[];
  displayStrings?: Partial<typeof defaultDisplayStrings>;
} & Partial<TableProps>) => {
  const context = React.useContext(ReportContext);

  const data = React.useMemo(() => {
    const elements = elementsRecords || context?.reportData.elementRecords || [];
    const data = elements.map((elementRecord) => ({
      elementCount: elementRecord?.elementids?.split(',').length,
      ...elementRecord,
    }));
    return data;
  }, [context?.reportData.elementRecords, elementsRecords]);

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...userDisplayStrings }),
    [userDisplayStrings]
  );

  type TableRow = Partial<typeof data[number]>;

  const columns = React.useMemo(
    () =>
      [
        {
          Header: 'Table',
          columns: [
            {
              id: 'repositorylinkId',
              accessor: 'repositorylinkId',
              Header: displayStrings.repositoryLinkId,
              Filter: tableFilters.TextFilter(),
              minWidth: 50,
              maxWidth: 250,
            },
            {
              id: 'elementCount',
              accessor: 'elementCount',
              Header: displayStrings.elementCount,
              Filter: tableFilters.TextFilter(),
            },
            {
              id: 'reason',
              accessor: 'reason',
              Header: displayStrings.reason,
              Filter: tableFilters.TextFilter(),
            },
          ],
        },
      ] as Column<TableRow>[],
    [displayStrings.elementCount, displayStrings.reason, displayStrings.repositoryLinkId]
  );

  return (
    <Table
      enableVirtualization
      className={classnames('isr-elements-table', className)}
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      emptyFilteredTableContent='No results found. Clear or try another filter.'
      isSortable
      paginatorRenderer={(props) => <TablePaginator pageSizeList={[10, 25, 50]} {...props} />}
      {...rest}
    />
  );
};

export default ElementsTable;
