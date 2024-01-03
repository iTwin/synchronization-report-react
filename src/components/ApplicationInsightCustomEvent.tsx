/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ApplicationInsightService } from './ApplicationInsightService';
import { TotalIssueCount } from './Report';
import { syncReportOpenTelemetryDataType } from './report-data-typings';

export function runSyncReportOpenEvent(
  applicationInsight?: ApplicationInsightService,
  syncReportOpenPropsData?: syncReportOpenTelemetryDataType,
  completeIssueCounts?: TotalIssueCount,
  issueLinkClickCount?: number,
  issueLinksClicked?: boolean,
  onSyncReportOpenEventPerform?: () => void
) {
  const syncReportOpenEventData = {
    countOfIssueIds: completeIssueCounts?.issueCount?.toString() || '',
    countOfIssueIdLinks: completeIssueCounts?.linkedIssueCount?.toString() || '',
    countOfIssueIdLinksClicked: issueLinkClickCount?.toString() || '',
    issueLinksClicked: issueLinksClicked?.toString(),
  };

  const completeTelemtry = { ...syncReportOpenPropsData, ...syncReportOpenEventData };
  if (applicationInsight) {
    applicationInsight.trackCustomEvent('SyncReportOpenedEvent', completeTelemtry);
  }
  onSyncReportOpenEventPerform?.();
}

export function runIssueArticleOpenEvent(
  applicationInsight?: ApplicationInsightService,
  clickedIssueId?: string,
  issueArticlePropsData?: any,
  onIssueArticleOpenEventPerform?: () => void
) {
  const issueArticleEventData = { issueId: clickedIssueId };
  const completeTelemtry = { ...issueArticlePropsData, ...issueArticleEventData };

  if (applicationInsight) {
    applicationInsight.trackCustomEvent('IssueArticleOpenedEvent', completeTelemtry);
    applicationInsight.flushEvent();
  }
  onIssueArticleOpenEventPerform?.();
}
