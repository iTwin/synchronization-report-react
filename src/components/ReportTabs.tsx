import * as React from 'react';
import classnames from 'classnames';
import { HorizontalTabs, Tab } from '@itwin/itwinui-react';
import { ReportContext } from './Report';
import './ReportTabs.scss';

const defaultDisplayStrings = {
  files: 'Files',
  details: 'Details',
} as const;

export const ReportTabs = ({
  displayStrings: userDisplayStrings,
  filesTable,
  detailsTable,
  className,
  ...rest
}: {
  displayStrings?: Record<keyof typeof defaultDisplayStrings, string>;
  filesTable: React.ReactNode;
  detailsTable: React.ReactNode;
  className?: string;
}) => {
  const context = React.useContext(ReportContext);

  if (!context) {
    throw new Error('ReportTabs must be used inside the Report component');
  }

  const { currentTab, setCurrentTab } = context;

  const displayStrings = { ...defaultDisplayStrings, ...userDisplayStrings };

  return (
    <HorizontalTabs
      activeIndex={currentTab === 'files' ? 0 : 1}
      onTabSelected={(index) => setCurrentTab(index === 0 ? 'files' : 'details')}
      labels={[
        <Tab key='files' label={displayStrings['files']} />,
        <Tab key='details' label={displayStrings['details']} />,
      ]}
      type='borderless'
      contentClassName='isr-report-tabs-content'
      wrapperClassName={classnames('isr-report-tabs-wrapper', className)}
      {...rest}
    >
      {currentTab === 'files' ? filesTable : detailsTable}
    </HorizontalTabs>
  );
};
