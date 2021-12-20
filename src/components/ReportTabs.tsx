import * as React from 'react';
import classnames from 'classnames';
import { HorizontalTabs, Tab } from '@itwin/itwinui-react';
import { ReportContext } from './Report';
import { DetailsTable } from './DetailsTable';
import { FilesTable } from './FilesTable';
import './ReportTabs.scss';

const defaultDisplayStrings = {
  files: 'Files',
  details: 'Details',
};

/**
 * `ReportTabs` component has the main parts of the report, and must be used as a child of `Report`.
 * It includes the tabs as well as the `FilesTable` and `DetailsTable` shown in those tabs.
 *
 * Two `children` can be specified to override/add content shown in the tabs.
 * The first child is shown when files tab is active, and second child is shown when details tab is active.
 * @example
 * <Report>
 *   <ReportTabs />
 * <Report>
 *
 * @example
 * <Report>
 *   <ReportTabs>
 *     <FilesTable className='custom-filestable-overrides' />
 *     <DetailsTable className='custom-detailstable-overrides' />
 *   </ReportTabs>
 * </Report>
 */
export const ReportTabs = ({
  displayStrings: userDisplayStrings,
  children,
  className,
  ...rest
}: {
  displayStrings?: typeof defaultDisplayStrings;
  children?: [React.ReactNode, React.ReactNode];
  className?: string;
}) => {
  const context = React.useContext(ReportContext);

  if (!context) {
    throw new Error('ReportTabs must be used inside the Report component');
  }

  const { currentTab, setCurrentTab } = context;

  const displayStrings = { ...defaultDisplayStrings, ...userDisplayStrings };

  const filesTable = children?.[0] ?? <FilesTable />;
  const detailsTable = children?.[1] ?? <DetailsTable />;

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
