/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ReportContext } from './Report';
import { Surface, Text } from '@itwin/itwinui-react';
import { BannerTile } from './utils';
import SvgClock from '@itwin/itwinui-icons-react/cjs/icons/Clock';
import './ReportTimestamp.scss';
import SvgDocument from '@itwin/itwinui-icons-react/cjs/icons/Document';

const defaultDisplayStrings = {
  syncTime: 'Sync Time',
  files: 'Files',
};

/**
 * `ReportTimestamp` simply displays a muted string containing the timestamp when the synchronization run was completed.
 * If used outside `Report`, `timestamp` will need to be specified manually.
 */
export const ReportTimestamp = ({
  timestamp,
  filesCount,
  displayStrings: userDisplayStrings,
}: {
  timestamp?: Date;
  filesCount?: number;
  displayStrings?: Partial<typeof defaultDisplayStrings>;
  className?: string;
}) => {
  const context = React.useContext(ReportContext);

  if (!timestamp && !filesCount) {
    if (!context) {
      throw new Error(
        'timestamp and numberOfFiles must be specified or ReportTimestamp and list of files must be used inside Report'
      );
    }
    timestamp = new Date(context.reportData.context?.timestamp ?? '');
    filesCount = context.reportData.sourceFilesInfo?.Files?.length;
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

    options = { hour: 'numeric', minute: '2-digit' };
    setTime(timestamp?.toLocaleTimeString([], options) ?? '');
  }, [timestamp]);

  return (
    // <Text variant='small' isMuted={true} {...rest}>
    //   {`${displayStrings.syncTime}: ${date}`}
    // </Text>
    <Surface elevation={1} className='isr-timestamp-container'>
      <BannerTile icon={<SvgClock />}>
        <span>
          <Text>{date}</Text>
          <Text>{time}</Text>
        </span>
        <Text variant='small'>{displayStrings.syncTime}</Text>
      </BannerTile>
      <BannerTile icon={<SvgDocument />}>
        <Text variant='title' style={{ fontWeight: 'bold' }}>
          {context?.reportData.sourceFilesInfo?.Files?.length}
        </Text>
        <Text variant='small'>{displayStrings.files}</Text>
      </BannerTile>
    </Surface>
  );
};
