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
};

export const ReportBanner = (props: ReportBannerProps) => {
  const { fileRecords, filesProcessed } = props;

  const context = React.useContext(ReportContext);
  const [errorCount, setErrorCount] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const [infoCount, setInfoCount] = useState(0);
  const [issuesCount, setIssuesCount] = useState(0);
  useEffect(() => {
    let error = 0;
    let warning = 0;
    let info = 0;
    fileRecords?.forEach((file) => {
      file.auditrecords?.forEach((record) => {
        switch (record.auditinfo?.level) {
          case 'Error':
          case 'Fatal':
            error++;
            break;
          case 'Warning':
          case 'Critical':
            warning++;
            break;
          case 'Info':
            info++;
            break;
        }
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
      if (file.state != 'Processed')
        //Count failed or missing files
        failed++;
    });
    setFailedFileCount(failed);
  }, [filesProcessed]);

  return (
    <>
      {(fileRecords || filesProcessed) && (
        <div
          className={cx('isr-header-banner', {
            'isr-negative': context?.currentTab === 'files' && failedFileCount > 0,
          })}
        >
          {/* Todo: Make files table filter by status when clicking on '1 file failed'*/}
          {context?.currentTab === 'files' && filesProcessed && (
            <>
              <div className='isr-header-banner-message'>{filesProcessed.length + ' File(s) Processed | '}</div>
              {failedFileCount > 0 && (
                <>
                  <StatusIcon status='error' />
                  <div className='isr-header-banner-message'>
                    {failedFileCount + ' file(s) failed to synchronize  | '}
                  </div>
                </>
              )}
              {issuesCount > 0 ? (
                <div className='isr-header-banner-message'>{issuesCount + ' Synchronization Issues Found'}</div>
              ) : (
                <>
                  <StatusIcon status='success' />
                  <div>{'No Synchronization Issues Found'}</div>
                </>
              )}
            </>
          )}

          {/* Todo: Make details table filter by issue type when clicking on issue*/}
          {context?.currentTab === 'details' && fileRecords && (
            <>
              {issuesCount > 0 ? (
                <>
                  <div>{issuesCount + ' Synchronization Issues |'}</div>
                  {errorCount > 0 && (
                    <>
                      <StatusIcon status='error' />
                      <div>{'Errors: ' + errorCount + ' |'}</div>
                    </>
                  )}
                  {warningCount > 0 && (
                    <>
                      <StatusIcon status='warning' />
                      <div>{'Warnings: ' + warningCount + ' |'}</div>
                    </>
                  )}
                  {infoCount > 0 && (
                    <>
                      <StatusIcon status='informational' />
                      <div>{'Other Issues: ' + infoCount}</div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <StatusIcon status='success' />
                  <div>{'No Synchronization Issues Found'}</div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
