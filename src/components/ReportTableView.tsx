/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import { FilesTable } from './FilesTable';
import { ProblemsTable } from './ProblemsTable';
import { ReportContext, Tables } from './Report';
import './ReportTableView.scss';
import WorkflowTable from './WorkflowTable';
import ElementsTable from './ElementsTable';

/**
 * `ReportTableView` shows the `FilesTable`, `ProblemsTable`, `WorkflowTable`, or `ElementsTable` depending on the active selection.
 *
 * The `FilesTable`, `ProblemsTable`, `WorkflowTable`, or `ElementsTable` can be passed as children with custom props (e.g. localization, custom icons).
 *
 * @example
 * <ReportTableView>
 *   <FilesTable displayStrings={{ ... }} />
 *   <ProblemsTable displayStrings={{ ... }} />
 *   <WorkflowTable displayStrings={{ ... }} />
 *   <ElementsTable displayStrings={{ ... }} />
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
  /**
   * Four `children` can be specified to override the tables.
   * @default
   * [<FilesTable />, <ProblemsTable />, <WorkflowTable />, <ElementsTable />]
   */
  children?: [React.ReactNode, React.ReactNode, React.ReactNode, React.ReactNode];
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
  const elementsTable = children?.[3] ?? <ElementsTable />;

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
          case 'elements':
            return elementsTable;
        }
      })()}
    </div>
  );
};
