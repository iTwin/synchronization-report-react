import * as React from 'react';
import classnames from 'classnames';
import { DetailsTable } from './DetailsTable';
import { FilesTable } from './FilesTable';
import { ReportData } from './typings';
import { ReportTitle } from './ReportTitle';
import { ReportTimestamp } from './ReportTimestamp';
import { ReportBanner } from './ReportBanner';
import { ReportTablist } from './ReportTablist';
import { ReportTabpanel } from './ReportTabpanel';
import './Report.scss';

export const ReportContext = React.createContext<
  | {
      reportData: ReportData;
      currentTab: 'files' | 'details';
      setCurrentTab: (tab: 'files' | 'details' | ((prev: 'files' | 'details') => 'files' | 'details')) => void;
      severityFilter: 'error' | 'warning' | 'info' | 'failed' | undefined;
      setSeverityFilter: (severity: 'error' | 'warning' | 'info' | 'failed' | undefined) => void;
    }
  | undefined
>(undefined);

/**
 * `Report` is the root component where the report data should be passed.
 *
 * When `children` are not specified, a default sensible layout is shown.
 *
 * For extra flexibility (e.g. custom layouts, localization), the individual components can be passed as `children`
 * along with any additional elements. The report data is made available to child components through context so that
 * it does not need to be passed individually.
 *
 * @example
 * <Report data={reportData} />
 *
 * @example
 * <Report data={reportData}>
 *   <ReportTitle />
 *   <ReportTimestamp />
 *   <ReportBanner />
 *
 *   <div style={{ display: 'flex' }}>
 *     <ReportTablist />
 *     <ReportDebugIds />
 *   </div>
 *
 *   <ReportTabpanel>
 *     <FilesTable />
 *     <DetailsTable />
 *   </ReportTabpanel>
 * </Report>
 */
export const Report = ({
  data,
  children,
  className,
}: {
  /** The report data should be compatible with the type definitions. */
  data: ReportData;
  className?: string;
  children?: React.ReactNode;
}) => {
  const [selectedTab, setSelectedTab] = React.useState<'files' | 'details'>('files');
  const [severityFilter, setSeverityFilter] = React.useState<'error' | 'warning' | 'info' | 'failed' | undefined>();

  return (
    <ReportContext.Provider
      value={{
        reportData: data,
        currentTab: selectedTab,
        setCurrentTab: setSelectedTab,
        severityFilter: severityFilter,
        setSeverityFilter: setSeverityFilter,
      }}
    >
      <div className={classnames('isr-report-main', className)}>
        {children ?? (
          <>
            <ReportTitle />
            <ReportTimestamp />
            <ReportBanner />
            <ReportTablist />
            <ReportTabpanel>
              <FilesTable />
              <DetailsTable />
            </ReportTabpanel>
          </>
        )}
      </div>
    </ReportContext.Provider>
  );
};

export default Report;
