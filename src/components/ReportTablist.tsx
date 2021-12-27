import * as React from 'react';
import { HorizontalTabs, Tab } from '@itwin/itwinui-react';
import { ReportContext } from './Report';
import './ReportTablist.scss';

const defaultDisplayStrings = {
  files: 'Files',
  details: 'Details',
};

/**
 * `ReportTablist` shows the files and details tabs (only the tab selectors, not the panel content).
 * It should be used as a descendant of `Report`.
 *
 * Two `children` can be specified to show custom tab components.
 */
export const ReportTablist = ({
  displayStrings: userDisplayStrings,
  children,
  className,
  ...rest
}: {
  displayStrings?: Partial<typeof defaultDisplayStrings>;
  children?: [React.ReactNode, React.ReactNode];
  className?: string;
}) => {
  const context = React.useContext(ReportContext);

  if (!context) {
    throw new Error('ReportTabs must be used inside the Report component');
  }

  const { currentTab, setCurrentTab } = context;

  const displayStrings = { ...defaultDisplayStrings, ...userDisplayStrings };

  return (
    <div className='isr-report-tablist'>
      <HorizontalTabs
        activeIndex={currentTab === 'files' ? 0 : 1}
        onTabSelected={(index) => setCurrentTab(index === 0 ? 'files' : 'details')}
        labels={
          children ?? [
            <Tab key='files' label={displayStrings['files']} />,
            <Tab key='details' label={displayStrings['details']} />,
          ]
        }
        type='borderless'
        wrapperClassName={className}
        {...rest}
      />
    </div>
  );
};
