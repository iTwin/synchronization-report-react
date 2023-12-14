/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import { ProblemsTable } from './ProblemsTable';
import { ReportData, WorkflowMapping } from './report-data-typings';
import { ReportTitle } from './ReportTitle';
import { ReportTimestamp } from './ReportTimestamp';
import { ReportBanner } from './ReportBanner';
import { ReportTableSelect } from './ReportTableSelect';
import { ReportTableSelectWrapper } from './ReportTableSelectWrapper';
import { Label, ThemeProvider } from '@itwin/itwinui-react';
import { ReportInfoPanel } from './ReportInfoPanel';
import { ReportInfoPanelWrapper } from './ReportInfoPanelWrapper';
import { ReportHeaderBannerWrapper } from './ReportHeaderBannerWrapper';
import ReportDebugIds from './ReportDebugIds';
import { ReportTitleWrapper } from './ReportTitleWrapper';
import { defaultWorkflowMapping } from './report-workflow-mapping';
import './Report.scss';
import { useCallback, useEffect, useRef } from 'react';
import { ApplicationInsightService } from './ApplicationInsightService';
import { hasHelpArticle } from './help-articles';
type Levels = 'Error' | 'Warning' | 'Info' | 'Fatal' | 'Critical';
export type Issues = 'Error' | 'Warning' | 'Info' | 'All';
export type Tables = 'files' | 'problems' | 'categories' | 'issueId';

type AuditInfo = Partial<{
  issueid: string;
  level: Levels;
  category: string;
  message: string;
  type: string;
  fileName: string;
  path: string;
  fileId: string;
  dataSource: string;
  fileStatus: boolean;
  fileExists: boolean;
  bimFileExists: boolean;
}>;

export interface customEventdataType {
  name: string;
  value: string;
}

export interface SyncReportOpenedEventDataType {
  data?: customEventdataType[];
  onSyncReportOpenEventPerform?: () => void;
}
export interface IssueArticleOpenEventDataType {
  data?: customEventdataType[];
  onIssueArticleOpenEventPerform?: () => void;
}
type TotalIssueCount = {
  issueCount?: number;
  linkedIssueCount?: number;
};
export const ReportContext = React.createContext<
  | {
      reportData: ReportData;
      workflowMapping?: WorkflowMapping;
      currentTable: Tables;
      setCurrentTable: (table: Tables | ((prev: Tables) => Tables)) => void;
      currentAuditInfo?: AuditInfo;
      setCurrentAuditInfo: (auditInfo?: AuditInfo) => void;
      focusedIssue: Issues;
      setFocusedIssue: (issue: Issues) => void;
      focusedWorkflows: string[];
      setFocusedWorkflows: (issues: string[] | ((issues: string[]) => string[])) => void;
      activeRow: string;
      setActiveRow: React.Dispatch<React.SetStateAction<string>>;
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
 *       <ProblemsTable />
 *     <ReportInfoPanel />
 *   </ReportInfoPanelWrapper>
 * </Report>
 */
export const Report = ({
  data,
  workflowMapping = defaultWorkflowMapping,
  children,
  className,
  applicationInsightConnectionString,
  SyncReportOpenedEventData,
  issueArticleOpenEventData,
}: {
  /** The report data should be compatible with the type definitions. */
  data: ReportData;
  applicationInsightConnectionString?: string;
  SyncReportOpenedEventData?: SyncReportOpenedEventDataType;
  issueArticleOpenEventData?: IssueArticleOpenEventDataType;
  workflowMapping?: WorkflowMapping;
  className?: string;
  children?: React.ReactNode;
}) => {
  const [selectedTable, setSelectedTable] = React.useState<Tables>('problems');
  const [currentAuditInfo, setCurrentAuditInfo] = React.useState<AuditInfo | undefined>();
  const [focusedIssue, setFocusedIssue] = React.useState<Issues>('All');
  const [focusedWorkflows, setFocusedWorkflows] = React.useState<string[]>([]);
  const [activeRow, setActiveRow] = React.useState<string>('');
  const shouldRunAIEvent = useRef<boolean>(true);
  const issueLinksClicked = useRef(false);
  const valueRef = useRef<TotalIssueCount>();
  const issueLinkClickCount = useRef<number>(0);
  let issueCount = 0;
  let issueLinkedCount = 0;

  React.useEffect(() => {
    window.addEventListener('beforeunload', triggerEvent);
    return () => {
      window.removeEventListener('beforeunload', triggerEvent);
    };
  });

  useEffect(() => {
    return () => {
      triggerSyncReportOpenedEvent();
    };
  }, [data]);

  React.useEffect(() => {
    if (!workflowMapping) return;
    const allWorkflows = Array.from(
      new Set(Object.values(workflowMapping).flatMap((c) => Object.values(c).flatMap((i) => i)))
    );
    setFocusedWorkflows([...allWorkflows, 'Unorganized']);
  }, [workflowMapping]);

  useEffect(() => {
    data?.filerecords?.map((filterRecord: any) => {
      issueCount = issueCount + filterRecord.auditrecords.length;
      filterRecord.auditrecords.map((auditRecord: any) => {
        const issueId = auditRecord.auditinfo.issueid;
        if (hasHelpArticle(issueId)) issueLinkedCount += 1;
      });
    });

    valueRef.current = {
      issueCount: issueCount,
      linkedIssueCount: issueLinkedCount,
    };
  }, [data]);

  const triggerEvent = (event: any) => {
    triggerSyncReportOpenedEvent();
    event.returnValue = '';
  };

  const triggerSyncReportOpenedEvent = useCallback(() => {
    if (data != null && shouldRunAIEvent.current && applicationInsightConnectionString) {
      shouldRunAIEvent.current = false;
      const syncReportOpenPropsData = SyncReportOpenedEventData?.data ? SyncReportOpenedEventData?.data : [];
      const syncReportOpenEventData = [
        {
          name: 'countOfIssueIds',
          value: valueRef.current?.issueCount?.toString() || '',
        },
        {
          name: 'countOfIssueIdLinks',
          value: valueRef.current?.linkedIssueCount?.toString() || '',
        },
        {
          name: 'countOfIssueIdLinksClicked',
          value: issueLinkClickCount.current.toString() || '',
        },
        {
          name: 'issueLinksClicked',
          value: issueLinksClicked.current.toString(),
        },
      ];

      const totalSyncReportOpenData = [...syncReportOpenPropsData, ...syncReportOpenEventData];
      const customSyncReportOpenData = Object.fromEntries(
        totalSyncReportOpenData.map((item) => [item.name, item.value])
      );

      ApplicationInsightService({
        connectionString: applicationInsightConnectionString,
        customEventProperties: customSyncReportOpenData,
        customEventName: 'SyncReportOpenedEvent',
      });

      if (SyncReportOpenedEventData?.onSyncReportOpenEventPerform)
        SyncReportOpenedEventData.onSyncReportOpenEventPerform();
    }
  }, [data]);

  const onIssueArticleOpened = useCallback((clickedIssueId: string) => {
    issueLinkClickCount.current += 1;
    if (applicationInsightConnectionString) {
      const issueArticlePropsData = issueArticleOpenEventData?.data ? issueArticleOpenEventData?.data : [];
      const issueArticleEventData = [{ name: 'issueId', value: clickedIssueId }];
      const totalIssueArticleData = [...issueArticlePropsData, ...issueArticleEventData];
      const customIssueArticleData = Object.fromEntries(totalIssueArticleData.map((item) => [item.name, item.value]));

      ApplicationInsightService({
        connectionString: applicationInsightConnectionString,
        customEventProperties: customIssueArticleData,
        customEventName: 'IssueArticleOpenedEvent',
      });
    }
    issueLinksClicked.current = true;
    if (issueArticleOpenEventData?.onIssueArticleOpenEventPerform)
      issueArticleOpenEventData.onIssueArticleOpenEventPerform();
  }, []);

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
          focusedIssue: focusedIssue,
          setFocusedIssue: setFocusedIssue,
          focusedWorkflows: focusedWorkflows,
          setFocusedWorkflows: setFocusedWorkflows,
          activeRow: activeRow,
          setActiveRow: setActiveRow,
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
                <Label as='span'>Issues found by severity</Label>
                <ReportBanner />
              </ReportHeaderBannerWrapper>
              <ReportTableSelectWrapper>
                <ReportTableSelect />
              </ReportTableSelectWrapper>
              <ReportInfoPanelWrapper>
                <ProblemsTable onIssueArticleOpened={onIssueArticleOpened} />
                <ReportInfoPanel onIssueArticleOpened={onIssueArticleOpened} />
              </ReportInfoPanelWrapper>
            </>
          )}
        </div>
      </ReportContext.Provider>
    </ThemeProvider>
  );
};

export default Report;
