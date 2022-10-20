/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import { ProblemsTable } from './ProblemsTable';
import { FilesTable } from './FilesTable';
import { ReportData, WorkflowMapping } from './report-data-typings';
import { ReportTitle } from './ReportTitle';
import { ReportTimestamp } from './ReportTimestamp';
import { ReportBanner } from './ReportBanner';
import { ReportTableSelect } from './ReportTableSelect';
import { ReportTableView } from './ReportTableView';
import { ReportTableSelectWrapper } from './ReportTableSelectWrapper';
import { Label } from '@itwin/itwinui-react';
import './Report.scss';
import WorkflowTable from './WorkflowTable';
import { ReportInfoPanel } from './ReportInfoPanel';
import { ReportInfoPanelWrapper } from './ReportInfoPanelWrapper';
import { ReportHeaderBannerWrapper } from './ReportHeaderBannerWrapper';

type Levels = 'Error' | 'Warning' | 'Info' | 'Fatal' | 'Critical';
export type Issues = 'Error' | 'Warning' | 'Info';

type AuditInfo = Partial<{
  level: Levels;
  category: string;
  message: string;
  type: string;
  fileName: string;
  filePath: string;
  impactedWorkflows: string[];
}>;

export const ReportContext = React.createContext<
  | {
      reportData: ReportData;
      workflowMapping?: WorkflowMapping;
      currentTable: string;
      setCurrentTable: (table: string | ((prev: string) => string)) => void;
      searchString: string;
      setSearchString: (search: string) => void;
      currentAuditInfo?: AuditInfo;
      setCurrentAuditInfo: (auditInfo?: AuditInfo) => void;
      focusedIssues: Issues[];
      setFocusedIssues: (issues: Issues[] | ((issues: Issues[]) => Issues[])) => void;
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
 *     <ProblemsTable />
 *     <WorkflowTable />
 *   </ReportTabpanel>
 * </Report>
 */
export const Report = ({
  data,
  workflowMapping,
  children,
  className,
}: {
  /** The report data should be compatible with the type definitions. */
  data: ReportData;
  workflowMapping?: WorkflowMapping;
  className?: string;
  children?: React.ReactNode;
}) => {
  const [selectedTab, setSelectedTable] = React.useState<string>('workflow');
  const [searchString, setSearchString] = React.useState<string>('');
  const [currentAuditInfo, setCurrentAuditInfo] = React.useState<AuditInfo | undefined>();
  const [focusedIssues, setFocusedIssues] = React.useState<Issues[]>(['Error']);

  return (
    <ReportContext.Provider
      value={{
        reportData: data,
        workflowMapping,
        currentTable: selectedTab,
        setCurrentTable: setSelectedTable,
        searchString: searchString,
        setSearchString: setSearchString,
        currentAuditInfo,
        setCurrentAuditInfo,
        focusedIssues: focusedIssues,
        setFocusedIssues: setFocusedIssues,
      }}
    >
      <div className={classnames('isr-report-main', className)}>
        {children ?? (
          <>
            <ReportTitle />
            <ReportHeaderBannerWrapper>
              <ReportTimestamp />
              <ReportBanner />
            </ReportHeaderBannerWrapper>
            <ReportTableSelectWrapper>
              {/* <ReportSearchbar /> */}
              <Label as='span'>Issues Found</Label>
              <ReportTableSelect />
            </ReportTableSelectWrapper>
            <ReportInfoPanelWrapper>
              <ReportTableView>
                <FilesTable />
                <ProblemsTable />
                <WorkflowTable />
              </ReportTableView>
              <ReportInfoPanel />
            </ReportInfoPanelWrapper>
          </>
        )}
      </div>
    </ReportContext.Provider>
  );
};

export default Report;
