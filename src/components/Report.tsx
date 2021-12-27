import * as React from 'react';
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

export const Report = ({ data, children }: { data: ReportData; children?: React.ReactNode }) => {
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
      <div className='isr-report-main'>
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
