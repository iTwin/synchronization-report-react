import React from 'react';
import { useState, useEffect } from 'react';
import cx from 'classnames';
import { FileRecord, SourceFile } from './typings';
import './ReportBanner.scss';
import { StatusIcon } from './StatusIcon';
import { ReportContext } from './Report';

export type ReportBannerProps = {
  fileRecords?: FileRecord[];
  filesProcessed?: SourceFile[];
  currentTab?: 'files' | 'details';
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

  const [errorCount, setErrorCount] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const [infoCount, setInfoCount] = useState(0);
  const [issuesCount, setIssuesCount] = useState(0);

  useEffect(() => {
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

  const [failedFileCount, setFailedFileCount] = useState(0);
  useEffect(() => {
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
          className={cx('isr-header-banner', {
            'isr-negative': currentTab === 'files' && failedFileCount > 0,
          })}
        >
          {/* Todo: Make files table filter by status when clicking on '1 file failed'*/}
          {currentTab === 'files' && filesProcessed && (
            <>
              <div className='isr-header-banner-message'>{filesProcessed.length + ' File(s) Processed'}</div>
              {failedFileCount > 0 && (
                <>
                  <StatusIcon status='error' />
                  <div className='isr-header-banner-message'>{failedFileCount + ' file(s) failed to synchronize'}</div>
                </>
              )}
              {issuesCount > 0 ? (
                <div className='isr-header-banner-message'>{issuesCount + ' Synchronization Issues Found'}</div>
              ) : (
                <>
                  <StatusIcon status='success' />
                  <div className='isr-header-banner-message'>{'No Synchronization Issues Found'}</div>
                </>
              )}
            </>
          )}

          {/* Todo: Make details table filter by issue type when clicking on issue*/}
          {currentTab === 'details' && fileRecords && (
            <>
              {issuesCount > 0 ? (
                <>
                  <div className='isr-header-banner-message'>{issuesCount + ' Synchronization Issues'}</div>
                  {errorCount > 0 && (
                    <>
                      <StatusIcon status='error' />
                      <div className='isr-header-banner-message'>{'Errors: ' + errorCount}</div>
                    </>
                  )}
                  {warningCount > 0 && (
                    <>
                      <StatusIcon status='warning' />
                      <div className='isr-header-banner-message'>{'Warnings: ' + warningCount}</div>
                    </>
                  )}
                  {infoCount > 0 && (
                    <>
                      <StatusIcon status='informational' />
                      <div className='isr-header-banner-message'>{'Other Issues: ' + infoCount}</div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <StatusIcon status='success' />
                  <div className='isr-header-banner-message'>{'No Synchronization Issues Found'}</div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
