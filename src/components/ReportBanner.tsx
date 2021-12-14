import * as React from 'react';
import classnames from 'classnames';
import { FileRecord, SourceFile } from './typings';
import './ReportBanner.scss';
import { StatusIcon } from './StatusIcon';
import { ReportContext } from './Report';

export type ReportBannerProps = {
  fileRecords?: FileRecord[];
  filesProcessed?: SourceFile[];
  currentTab?: 'files' | 'details';
  className?: string;
};

export const ReportBanner = (props: ReportBannerProps) => {
  const context = React.useContext(ReportContext);

  const fileRecords = React.useMemo(() => {
    return props.fileRecords || context?.reportData.filerecords || [];
  }, [context?.reportData.filerecords, props.fileRecords]);

  const filesProcessed = React.useMemo(() => {
    return props.filesProcessed || context?.reportData.sourceFilesInfo?.Files || [];
  }, [context?.reportData.sourceFilesInfo?.Files, props.filesProcessed]);

  const currentTab = React.useMemo(() => {
    return props.currentTab || context?.currentTab;
  }, [context?.currentTab, props.currentTab]);

  const [errorCount, setErrorCount] = React.useState(0);
  const [warningCount, setWarningCount] = React.useState(0);
  const [infoCount, setInfoCount] = React.useState(0);
  const [issuesCount, setIssuesCount] = React.useState(0);

  React.useEffect(() => {
    let error = 0,
      warning = 0,
      info = 0;

    fileRecords?.forEach((file) => {
      file.auditrecords?.forEach((record) => {
        const level = record.auditinfo?.level;

        if (level === 'Error' || level === 'Fatal') error++;
        else if (level === 'Warning' || level === 'Critical') warning++;
        else if (level === 'Info') info++;
      });
    });
    setErrorCount(error);
    setWarningCount(warning);
    setInfoCount(info);
    setIssuesCount(error + warning + info);
  }, [fileRecords]);

  const [failedFileCount, setFailedFileCount] = React.useState(0);
  React.useEffect(() => {
    let failed = 0;
    filesProcessed?.forEach((file) => {
      if (file.state === 'Failed' || file.state === 'Missing') failed++;
    });
    setFailedFileCount(failed);
  }, [filesProcessed]);

  return (
    <>
      {(fileRecords || filesProcessed) && (
        <div
          className={classnames(
            'isr-header-banner',
            {
              'isr-negative': currentTab === 'files' && failedFileCount > 0,
            },
            props.className
          )}
        >
          {/* Todo: Make files table filter by status when clicking on '1 file failed'*/}
          {currentTab === 'files' && filesProcessed && (
            <div className='isr-header-banner-message'>
              <span className='isr-header-banner-section'>
                <span className='isr-header-banner-section-message'>
                  {filesProcessed.length + ' File(s) Processed'}
                </span>
              </span>
              {failedFileCount > 0 && (
                <span className='isr-header-banner-section'>
                  <StatusIcon status='error' />
                  <span className='isr-header-banner-section-message'>
                    {failedFileCount + ' file(s) failed to synchronize'}
                  </span>
                </span>
              )}
              {issuesCount > 0 ? (
                <span className='isr-header-banner-section'>
                  <span className='isr-header-banner-section-message'>
                    {issuesCount + ' Synchronization Issues Found'}
                  </span>
                </span>
              ) : (
                <span className='isr-header-banner-section'>
                  <StatusIcon status='success' />
                  <span className='isr-header-banner-section-message'>{'No Synchronization Issues Found'}</span>
                </span>
              )}
            </div>
          )}

          {/* Todo: Make details table filter by issue type when clicking on issue*/}
          {currentTab === 'details' && fileRecords && (
            <div className='isr-header-banner-message'>
              {issuesCount > 0 ? (
                <>
                  <span className='isr-header-banner-section'>
                    <span className='isr-header-banner-section-message'>{issuesCount + ' Synchronization Issues'}</span>
                  </span>
                  {errorCount > 0 && (
                    <span className='isr-header-banner-section'>
                      <StatusIcon status='error' />
                      <span className='isr-header-banner-section-message'>{'Errors: ' + errorCount}</span>
                    </span>
                  )}
                  {warningCount > 0 && (
                    <span className='isr-header-banner-section'>
                      <StatusIcon status='warning' />
                      <span className='isr-header-banner-section-message'>{'Warnings: ' + warningCount}</span>
                    </span>
                  )}
                  {infoCount > 0 && (
                    <span className='isr-header-banner-section'>
                      <StatusIcon status='informational' />
                      <span className='isr-header-banner-section-message'>{'Other Issues: ' + infoCount}</span>
                    </span>
                  )}
                </>
              ) : (
                <span className='isr-header-banner-section'>
                  <StatusIcon status='success' />
                  <span className='isr-header-banner-section-message'>{'No Synchronization Issues Found'}</span>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
