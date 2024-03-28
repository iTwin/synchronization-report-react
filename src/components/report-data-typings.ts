/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
export type AdditionalPropsType = {
  propertyName: string;
  value: unknown;
};

export type ReportData = {
  context?: ReportDataContext;
  sourceFilesInfo?: SourceFilesInfo;
  filerecords?: FileRecord[];
  elementRecords?: ElementRecord[];
  [k: string]: unknown;
  additionalPropsForUI?: AdditionalPropsType[]; // We will use this only if we need to show some additional properties in the UI and it applies same for all other datatypes.
};

export type Workflow = string;

export type Type = {
  [type: string]: Workflow[];
};

export type WorkflowMapping = {
  [category: string]: Type;
};

export type ElementRecord = {
  elementids?: string;
  reason?: string;
  repositorylinkId?: string;
  [k: string]: unknown;
  additionalPropsForUI?: AdditionalPropsType[];
};

export type SourceFilesInfo = {
  itemType?: string;
  dataSource?: string;
  path?: string;
  fileId?: string;
  fileName?: string;
  fileExists?: boolean;
  bimFileExists?: boolean;
  Files?: SourceFile[];
  [k: string]: unknown;
  additionalPropsForUI?: AdditionalPropsType[];
};

export type SourceFile = {
  fileId?: string;
  fileName?: string;
  path?: string;
  fileExists?: boolean;
  bimFileExists?: boolean;
  state?: string;
  iModelFileId?: string;
  failureReason?: string;
  [k: string]: unknown;
  additionalPropsForUI?: AdditionalPropsType[];
};

export type ReportDataContext = {
  reportType?: string;
  operationType?: string;
  jobid?: string;
  contextid?: string;
  imodelid?: string;
  activityid?: string;
  briefcaseid?: string;
  timestamp?: string;
  [k: string]: unknown;
  additionalPropsForUI?: AdditionalPropsType[];
};

export type FileRecord = {
  auditrecords?: AuditRecord[];
  file?: {
    identifier?: string;
    path?: string;
    [k: string]: unknown;
    additionalPropsForUI?: AdditionalPropsType[];
  };
  [k: string]: unknown;
  additionalPropsForUI?: AdditionalPropsType[];
};

export type AuditRecord = {
  auditinfo?: AuditInfo;
  elementinfo?: ElementInfo;
  [k: string]: unknown;
  additionalPropsForUI?: AdditionalPropsType[];
};

export type AuditInfo = {
  issueid?: string;
  level?: 'Fatal' | 'Error' | 'Critical' | 'Warning' | 'Info';
  category?: string;
  message?: string;
  type?: string;
  fileName?: string;
  [k: string]: unknown;
  additionalPropsForUI?: AdditionalPropsType[];
};

export type ElementInfo = {
  ecinstanceid?: string;
  sourceid?: string;
  [k: string]: unknown;
  additionalPropsForUI?: AdditionalPropsType[];
};

export interface SyncReportOpenedEventDataType {
  syncReportOpenTelemetry?: syncReportOpenTelemetryDataType;
  onSyncReportOpenEventPerform?: () => void;
}

export interface IssueArticleOpenEventDataType {
  issueArticleOpenTelemetry?: issueArticleOpenTelemetryDataType;
  onIssueArticleOpenEventPerform?: (issueId: string) => void;
}

export interface syncReportOpenTelemetryDataType {
  iModelId?: string;
  projectId?: string;
  userEmail?: string;
  runStatus?: string;
  taskStatus?: string;
  connectionId?: string;
  runId?: string;
  reportId?: string;
  isDetailsColumnEnabled?: string;
  consumedApplicationName?: string;
  ultimateId?: string;
  [k: string]: unknown;
  additionalPropsForAppInsights?: AdditionalPropsType[]; // We will use this only if we need to show multiple additional properties in Application Insights
}

export interface issueArticleOpenTelemetryDataType {
  iModelId?: string;
  projectId?: string;
  userEmail?: string;
  connectionId?: string;
  runId?: string;
  reportId?: string;
  isDetailsColumnEnabled?: string;
  consumedApplicationName?: string;
  ultimateId?: string;
  [k: string]: unknown;
  additionalPropsForAppInsights?: AdditionalPropsType[]; // We will use this only if we need to show multiple additional properties in Application Insights .
}
