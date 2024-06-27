/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ReportContext } from './Report';
import { Text } from '@itwin/itwinui-react';
import SvgClock from '@itwin/itwinui-icons-react/cjs/icons/Clock';
import './ReportTimestamp.scss';
import SvgDocument from '@itwin/itwinui-icons-react/cjs/icons/Document';
import { ReportType, SourceFile } from './report-data-typings';

const defaultDisplayStrings = {
  syncTime: 'Sync Time',
  files: 'Files Processed',
};

/**
 * `ReportTimestamp` simply displays a muted string containing the timestamp when the synchronization run was completed.
 * If used outside `Report`, `timestamp` will need to be specified manually.
 */
export const ReportTimestamp = ({
  timestamp,
  filesCount,
  filesProcessed,
  displayStrings: userDisplayStrings,
}: {
  timestamp?: Date;
  filesProcessed?: SourceFile[];
  filesCount?: number;
  displayStrings?: Partial<typeof defaultDisplayStrings>;
  className?: string;
}) => {
  const context = React.useContext(ReportContext);
  const reportType = context?.reportData.context?.reportType;
  if (!timestamp && !filesCount) {
    if (!context) {
      throw new Error(
        'timestamp and numberOfFiles must be specified or ReportTimestamp and list of files must be used inside Report'
      );
    }

    timestamp = new Date(context.reportData.context?.timestamp ?? '');
    filesCount = [context.reportData.sourceFilesInfo, ...(context.reportData.sourceFilesInfo?.Files || [])].length;
  }

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...userDisplayStrings }),
    [userDisplayStrings]
  );

  const [date, setDate] = React.useState<string>('');
  const [time, setTime] = React.useState<string>('');
  React.useEffect(() => {
    let options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    setDate(timestamp?.toLocaleDateString(undefined, options) ?? '');

    options = { hour: '2-digit', minute: '2-digit', hour12: false };
    setTime(timestamp?.toLocaleTimeString([], options) ?? '');
  }, [timestamp]);

  const allFilesProcessed: SourceFile[] = React.useMemo(() => {
    if (filesProcessed) {
      return [...filesProcessed];
    } else if (context?.reportData.sourceFilesInfo?.Files) {
      return [context.reportData.sourceFilesInfo, ...context.reportData.sourceFilesInfo.Files];
    }

    return [];
  }, [context?.reportData.sourceFilesInfo, filesProcessed]);

  const processedFilesCount = allFilesProcessed.filter((file) => file.fileExists && file.bimFileExists).length;

  return (
    <div className='isr-timestamp-container'>
      <span>
        <Text>
          {' '}
          <SvgClock /> {date} {time} {displayStrings.syncTime}
          {reportType !== ReportType.TransformationReport ? (
            <>
              | <SvgDocument /> {processedFilesCount}/{filesCount} {displayStrings.files}
            </>
          ) : null}
        </Text>
      </span>
    </div>
  );
};
