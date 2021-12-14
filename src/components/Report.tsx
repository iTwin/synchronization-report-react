import * as React from 'react';
import { DetailsTable } from './DetailsTable';
import { FilesTable } from './FilesTable';
import { ReportData } from './typings';
import { ReportTitle } from './ReportTitle';
import { ReportTimestamp } from './ReportTimestamp';
import { ReportBanner } from './ReportBanner';
import { ReportTabs } from './ReportTabs';
import './Report.scss';

export const ReportContext = React.createContext<
  | {
      reportData: ReportData;
      currentTab: 'files' | 'details';
      setCurrentTab: (tab: 'files' | 'details' | ((prev: 'files' | 'details') => 'files' | 'details')) => void;
    }
  | undefined
>(undefined);

export const Report = ({ data, children }: { data: ReportData; children?: React.ReactNode }) => {
  const [selectedTab, setSelectedTab] = React.useState<'files' | 'details'>('files');

  return (
    <ReportContext.Provider value={{ reportData: data, currentTab: selectedTab, setCurrentTab: setSelectedTab }}>
      <div className='isr-report-main'>
        {children ?? (
          <>
            <ReportTitle />
            <ReportTimestamp />
            <ReportBanner />
            {/* Todo: Add ReportDebugIds */}

            <ReportTabs filesTable={<FilesTable />} detailsTable={<DetailsTable />} />
          </>
        )}
      </div>
    </ReportContext.Provider>
  );
};

export default Report;
