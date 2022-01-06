export type ReportData = {
  context?: ReportDataContext;
  sourceFilesInfo?: SourceFilesInfo;
  filerecords?: FileRecord[];
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
  level?: 'Fatal' | 'Error' | 'Critical' | 'Warning' | 'Info';
  category?: string;
  message?: string;
  type?: string;
  fileName?: string;
  [k: string]: unknown;
};
