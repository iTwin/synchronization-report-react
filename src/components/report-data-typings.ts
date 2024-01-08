/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
export type ReportData = {
  context?: ReportDataContext;
  sourceFilesInfo?: SourceFilesInfo;
  filerecords?: FileRecord[];
  elementRecords?: ElementRecord[];
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
};

export type FileRecord = {
  auditrecords?: AuditRecord[];
  file?: {
    identifier?: string;
    path?: string;
    [k: string]: unknown;
  };
};

export type AuditRecord = {
  auditinfo?: AuditInfo;
  elementinfo?: {
    ecinstanceid?: string;
    sourceid?: string;
  };
};

export type AuditInfo = {
  issueid?: string;
  level?: 'Fatal' | 'Error' | 'Critical' | 'Warning' | 'Info';
  category?: string;
  message?: string;
  type?: string;
  fileName?: string;
  [k: string]: unknown;
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
  ultimateId?: string;
}

export interface issueArticleOpenTelemetryDataType {
  iModelId?: string;
  projectId?: string;
  userEmail?: string;
  connectionId?: string;
  runId?: string;
  reportId?: string;
  isDetailsColumnEnabled?: string;
  ultimateId?: string;
}
