import * as React from 'react';
import { DetailsTable } from './DetailsTable';
import { FilesTable } from './FilesTable';
import { ReportData } from './typings';
import { ReportTitle } from './ReportTitle';
import { ReportTimestamp } from './ReportTimestamp';
import { ReportBanner } from './ReportBanner';
import { ReportTablist } from './ReportTablist';
import { ReportTabpanel } from './ReportTabpanel';
import { ReportTablistWrapper } from './index';
import { ReportSearchbar } from './ReportSearchbar';
import './Report.scss';
export const ReportContext = React.createContext<
  | {
      reportData: ReportData;
      currentTab: 'files' | 'details';
      setCurrentTab: (tab: 'files' | 'details' | ((prev: 'files' | 'details') => 'files' | 'details')) => void;
      searchString: string;
      setSearchString: (search: string) => void;
    }
  | undefined
>(undefined);

export const Report = ({ data, children }: { data: ReportData; children?: React.ReactNode }) => {
  const [selectedTab, setSelectedTab] = React.useState<'files' | 'details'>('files');
  const [searchString, setSearchString] = React.useState<string>('');

  return (
    <ReportContext.Provider
      value={{
        reportData: data,
        currentTab: selectedTab,
        setCurrentTab: setSelectedTab,
        searchString: searchString,
        setSearchString: setSearchString,
      }}
    >
      <div className='isr-report-main'>
        {children ?? (
          <>
            <ReportTitle />
            <ReportTimestamp />
            <ReportBanner />
            <ReportTablistWrapper>
              <ReportTablist />
              {selectedTab === 'details' && <ReportSearchbar />}
            </ReportTablistWrapper>
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
