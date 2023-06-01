/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import { ProblemsTable } from './ProblemsTable';
import { ReportContext, Tables } from './Report';
import './ReportTableView.scss';

/**
 * `ReportTableView` shows the `FilesTable`, `ProblemsTable`, depending on the active selection.
 *
 * The `FilesTable`, `ProblemsTable`, can be passed as children with custom props (e.g. localization, custom icons).
 *
 * @example
 * <ReportTableView>
 *   <FilesTable displayStrings={{ ... }} />
 *   <ProblemsTable displayStrings={{ ... }} />
 * </ReportTableView>
 */
export const ReportTableView = ({
  currentTable,
  children,
  className,
  ...rest
}: {
  /**
   * Current table. Will be inferred from context if not specified.
   */
  currentTable?: Tables;
  children?: React.ReactNode[];
  className?: string;
  id?: string;
}) => {
  const context = React.useContext(ReportContext);
  if (!currentTable) {
    if (!context) {
      throw new Error('currentTab must be specified or this component must be used inside Report');
    }
    currentTable = context.currentTable;
  }

  const problemsTable = children?.[1] ?? <ProblemsTable />;

  return (
    <div className={classnames('isr-report-table-view', className)} {...rest}>
      {problemsTable}
    </div>
  );
};
