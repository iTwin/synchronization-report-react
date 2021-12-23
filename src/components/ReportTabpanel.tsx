import * as React from 'react';
import classnames from 'classnames';
import { FilesTable } from './FilesTable';
import { DetailsTable } from './DetailsTable';
import { ReportContext } from './Report';
import './ReportTabpanel.scss';

/**
 * `ReportTabpanel` shows the `FilesTable` or `DetailsTable` depending on the active tab.
 *
 * The `FilesTable` and `DetailsTable` can be passed as children with custom props (e.g. localization, custom icons).
 *
 * @example
 * <ReportTabpanel>
 *   <FilesTable displayStrings={{ ... }} />
 *   <DetailsTable displayStrings={{ ... }} />
 * </ReportTabpanel>
 */
export const ReportTabpanel = ({
  currentTab,
  children,
  className,
  ...rest
}: {
  /**
   * Current tab. Will be inferred from context if not specified.
   */
  currentTab?: 'files' | 'details';
  /**
   * Two `children` can be specified to override the tables.
   * @default
   * [<FilesTable />, <DetailsTable />]
   */
  children?: [React.ReactNode, React.ReactNode];
  className?: string;
  id?: string;
}) => {
  const context = React.useContext(ReportContext);
  if (!currentTab) {
    if (!context) {
      throw new Error('currentTab must be specified or this component must be used inside Report');
    }
    currentTab = context.currentTab;
  }

  const filesTable = children?.[0] ?? <FilesTable />;
  const detailsTable = children?.[1] ?? <DetailsTable />;

  return (
    <div className={classnames('isr-report-tabpanel', className)} role='tabpanel' {...rest}>
      {currentTab === 'files' ? filesTable : detailsTable}
    </div>
  );
};
