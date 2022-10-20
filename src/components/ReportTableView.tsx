/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import { FilesTable } from './FilesTable';
import { ProblemsTable } from './ProblemsTable';
import { ReportContext } from './Report';
import './ReportTableView.scss';
import WorkflowTable from './WorkflowTable';

/**
 * `ReportTableView` shows the `FilesTable`, `ProblemsTable`, or `WorkflowTable` depending on the active selection.
 *
 * The `FilesTable`, `ProblemsTable`, or `WorkflowTable` can be passed as children with custom props (e.g. localization, custom icons).
 *
 * @example
 * <ReportTableView>
 *   <FilesTable displayStrings={{ ... }} />
 *   <ProblemsTable displayStrings={{ ... }} />
 *   <WorkflowTable displayStrings={{ ... }} />
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
  //TODO TYPE THIS TO THE TABLES TYPES
  currentTable?: string;
  /**
   * Two `children` can be specified to override the tables.
   * @default
   * [<FilesTable />, <ProblemsTable />, <WorkflowTable />]
   */
  children?: [React.ReactNode, React.ReactNode, React.ReactNode];
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

  const filesTable = children?.[0] ?? <FilesTable />;
  const problemsTable = children?.[1] ?? <ProblemsTable />;
  const workflowTable = children?.[2] ?? <WorkflowTable />;

  return (
    <div className={classnames('isr-report-table-view', className)} {...rest}>
      {(() => {
        switch (currentTable) {
          case 'files':
            return filesTable;
          case 'problems':
            return problemsTable;
          case 'workflow':
            return workflowTable;
        }
      })()}
    </div>
  );
};
