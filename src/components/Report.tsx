import * as React from 'react';
import { HorizontalTabs, Tab } from '@itwin/itwinui-react';
import { DetailsTable } from './DetailsTable';
import { FilesTable } from './FilesTable';
import { ReportData } from './typings';
import { ReportTitle } from './ReportTitle';
import { ReportTimestamp } from './ReportTimestamp';
import { ReportBanner } from './ReportBanner';
import './Report.scss';

type _TabName = 'files' | 'details';

export const ReportContext = React.createContext<
  | {
      reportData: ReportData;
      currentTab: _TabName;
      setCurrentTab: (tab: _TabName | ((prev: _TabName) => _TabName)) => void;
    }
  | undefined
>(undefined);

export const Report = ({ data }: { data: ReportData }) => {
  const [selectedTab, setSelectedTab] = React.useState<_TabName>('files');

  return (
    <ReportContext.Provider value={{ reportData: data, currentTab: selectedTab, setCurrentTab: setSelectedTab }}>
      <div className='isr-report-main'>
        <ReportTitle />
        <ReportTimestamp />
        <ReportBanner />
        {/* Todo: Add ReportDebugIds */}

        <div className='isr-report-tabs-wrapper'>
          <HorizontalTabs
            activeIndex={selectedTab === 'files' ? 0 : 1}
            onTabSelected={(index) => setSelectedTab(index === 0 ? 'files' : 'details')}
            labels={[<Tab key='files' label='Files' />, <Tab key='details' label='Details' />]}
            type='borderless'
            contentClassName='isr-report-tabs-content'
          >
            {selectedTab === 'files' ? (
              <FilesTable className='isr-report-table' />
            ) : (
              <DetailsTable className='isr-report-table' />
            )}
          </HorizontalTabs>
        </div>
      </div>
    </ReportContext.Provider>
  );
};

export default Report;
