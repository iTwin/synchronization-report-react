/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import { FileRecord, SourceFile } from './report-data-typings';
import './ReportBanner.scss';
import { StatusIcon } from './utils';
import { ReportContext } from './Report';

const defaultDisplayStrings = {
  filesProcessed: 'file(s) processed',
  filesFailedToSynchronize: 'file(s) failed to synchronize',
  synchronizationIssuesFound: 'synchronization issues found',
  errors: 'Errors',
  warnings: 'Warnings',
  otherIssues: 'Other issues',
  noSynchronizationIssuesFound: 'No synchronization issues found',
};

export type ReportBannerProps = {
  fileRecords?: FileRecord[];
  filesProcessed?: SourceFile[];
  currentTab?: 'files' | 'details';
  className?: string;
  displayStrings?: Partial<typeof defaultDisplayStrings>;
};

/**
 * Shows an alert that should be located above the files and details tabs.
 * The alert shows counts for files processed as well as the issues and errors.
 */
export const ReportBanner = (props: ReportBannerProps) => {
  const context = React.useContext(ReportContext);

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...props.displayStrings }),
    [props.displayStrings]
  );

  const fileRecords = React.useMemo(() => {
    return props.fileRecords || context?.reportData.filerecords || [];
  }, [context?.reportData.filerecords, props.fileRecords]);

  const filesProcessed: SourceFile[] = React.useMemo(() => {
    if (props.filesProcessed) {
      return [...filesProcessed];
    } else if (context?.reportData.sourceFilesInfo?.Files) {
      return [context.reportData.sourceFilesInfo, ...context.reportData.sourceFilesInfo.Files];
    }

    return [];
  }, [context?.reportData.sourceFilesInfo, props.filesProcessed]);

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
                  {`${filesProcessed.length} ${displayStrings.filesProcessed}`}
                </span>
              </span>
              {failedFileCount > 0 && (
                <span className='isr-header-banner-section'>
                  <StatusIcon status='error' />
                  <span className='isr-header-banner-section-message'>
                    {`${failedFileCount} ${displayStrings.filesFailedToSynchronize}`}
                  </span>
                </span>
              )}
              {issuesCount > 0 ? (
                <span className='isr-header-banner-section'>
                  <span className='isr-header-banner-section-message'>
                    {`${issuesCount} ${displayStrings.synchronizationIssuesFound}`}
                  </span>
                </span>
              ) : (
                <span className='isr-header-banner-section'>
                  <StatusIcon status='success' />
                  <span className='isr-header-banner-section-message'>
                    {displayStrings.noSynchronizationIssuesFound}
                  </span>
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
                    <span className='isr-header-banner-section-message'>
                      {`${issuesCount} ${displayStrings.synchronizationIssuesFound}`}
                    </span>
                  </span>
                  {errorCount > 0 && (
                    <span className='isr-header-banner-section'>
                      <StatusIcon status='error' />
                      <span className='isr-header-banner-section-message'>{`${displayStrings.errors}: ${errorCount}`}</span>
                    </span>
                  )}
                  {warningCount > 0 && (
                    <span className='isr-header-banner-section'>
                      <StatusIcon status='warning' />
                      <span className='isr-header-banner-section-message'>{`${displayStrings.warnings}: ${warningCount}`}</span>
                    </span>
                  )}
                  {infoCount > 0 && (
                    <span className='isr-header-banner-section'>
                      <StatusIcon status='informational' />
                      <span className='isr-header-banner-section-message'>{`${displayStrings.otherIssues}: ${infoCount}`}</span>
                    </span>
                  )}
                </>
              ) : (
                <span className='isr-header-banner-section'>
                  <StatusIcon status='success' />
                  <span className='isr-header-banner-section-message'>
                    {displayStrings.noSynchronizationIssuesFound}
                  </span>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
