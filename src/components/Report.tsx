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
import { Label, ThemeProvider } from '@itwin/itwinui-react';
import './Report.scss';
import { ReportInfoPanel } from './ReportInfoPanel';
import { ReportInfoPanelWrapper } from './ReportInfoPanelWrapper';
import { ReportHeaderBannerWrapper } from './ReportHeaderBannerWrapper';
import ReportDebugIds from './ReportDebugIds';
import { ReportTitleWrapper } from './ReportTitleWrapper';
import { defaultWorkflowMapping } from './report-workflow-mapping';

type Levels = 'Error' | 'Warning' | 'Info' | 'Fatal' | 'Critical';
export type Issues = 'Error' | 'Warning' | 'Info';
export type Tables = 'files' | 'problems';

type AuditInfo = Partial<{
  level: Levels;
  category: string;
  message: string;
  type: string;
  fileName: string;
  filePath: string;
}>;

export const ReportContext = React.createContext<
  | {
      reportData: ReportData;
      workflowMapping?: WorkflowMapping;
      currentTable: Tables;
      setCurrentTable: (table: Tables | ((prev: Tables) => Tables)) => void;
      currentAuditInfo?: AuditInfo;
      setCurrentAuditInfo: (auditInfo?: AuditInfo) => void;
      focusedIssues: Issues[];
      setFocusedIssues: (issues: Issues[] | ((issues: Issues[]) => Issues[])) => void;
      focusedWorkflows: string[];
      setFocusedWorkflows: (issues: string[] | ((issues: string[]) => string[])) => void;
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
 * <Report data={reportData} workflowMapping={workflowMapping}/>
 *
 * @example
 * <Report data={reportData} workflowMapping={workflowMapping}>
 *   <div style={{ display: 'flex' }}>
 *    <ReportTitle />
 *    <ReportDebugIds />
 *   </div>
 *   <ReportTableSelect />
 *   <ReportInfoPanelWrapper>
 *     <ReportTableView>
 *       <FilesTable />
 *       <ProblemsTable />
 *     </ReportTableView>
 *     <ReportInfoPanel />
 *   </ReportInfoPanelWrapper>
 * </Report>
 */
export const Report = ({
  data,
  workflowMapping = defaultWorkflowMapping,
  children,
  className,
}: {
  /** The report data should be compatible with the type definitions. */
  data: ReportData;
  workflowMapping?: WorkflowMapping;
  className?: string;
  children?: React.ReactNode;
}) => {
  const [selectedTable, setSelectedTable] = React.useState<Tables>('problems');
  const [currentAuditInfo, setCurrentAuditInfo] = React.useState<AuditInfo | undefined>();
  const [focusedIssues, setFocusedIssues] = React.useState<Issues[]>(['Error']);
  const [focusedWorkflows, setFocusedWorkflows] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!workflowMapping) return;
    const allWorkflows = Array.from(
      new Set(Object.values(workflowMapping).flatMap((c) => Object.values(c).flatMap((i) => i)))
    );
    setFocusedWorkflows([...allWorkflows, 'Unorganized']);
  }, [workflowMapping]);

  return (
    <ThemeProvider theme='inherit'>
      <ReportContext.Provider
        value={{
          reportData: data,
          workflowMapping,
          currentTable: selectedTable,
          setCurrentTable: setSelectedTable,
          currentAuditInfo,
          setCurrentAuditInfo,
          focusedIssues: focusedIssues,
          setFocusedIssues: setFocusedIssues,
          focusedWorkflows: focusedWorkflows,
          setFocusedWorkflows: setFocusedWorkflows,
        }}
      >
        <div className={classnames('isr-report-main', className)}>
          {children ?? (
            <>
              <ReportTitleWrapper>
                <ReportTitle />
                <ReportDebugIds />
              </ReportTitleWrapper>
              <ReportTimestamp />
              <ReportHeaderBannerWrapper>
                <ReportBanner />
              </ReportHeaderBannerWrapper>
              <ReportTableSelectWrapper>
                <Label as='span'>Synchronization Issues</Label>
                <ReportTableSelect />
              </ReportTableSelectWrapper>
              <ReportInfoPanelWrapper>
                <ReportTableView>
                  <FilesTable />
                  <ProblemsTable />
                </ReportTableView>
                <ReportInfoPanel />
              </ReportInfoPanelWrapper>
            </>
          )}
        </div>
      </ReportContext.Provider>
    </ThemeProvider>
  );
};

export default Report;
