import { useState } from 'react';
import { HorizontalTabs, Tab } from '@itwin/itwinui-react';
import { DetailsTable } from './DetailsTable';
import { FilesTable } from './FilesTable';
import { ReportData } from './typings';
import './Report.scss';

export const Report = ({ data }: { data?: ReportData }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className='isr-report-main'>
      <div className='isr-report-tabs-wrapper'>
        <HorizontalTabs
          activeIndex={selectedTab}
          onTabSelected={setSelectedTab}
          labels={[<Tab label='Files' />, <Tab label='Details' />]}
          type='borderless'
          contentClassName='isr-report-tabs-content'
        >
          {selectedTab === 0 ? (
            <FilesTable className='isr-report-table' sourceFilesInfo={data?.sourceFilesInfo} />
          ) : (
            <DetailsTable
              className='isr-report-table'
              fileRecords={data?.filerecords}
              sourceFilesInfo={data?.sourceFilesInfo}
            />
          )}
        </HorizontalTabs>
      </div>
    </div>
  );
};
