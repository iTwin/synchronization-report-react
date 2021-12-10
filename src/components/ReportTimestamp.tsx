import React from 'react';
import { useState, useEffect } from 'react';
import './ReportTimestamp.scss';
import { ReportContext } from './Report';

export type ReportTimestampProps = {
  timestamp?: string;
};

export const ReportTimestamp = (props: ReportTimestampProps) => {
  const context = React.useContext(ReportContext);
  const timestamp = React.useMemo(() => {
    return props.timestamp || context?.reportData.context?.timestamp;
  }, [context?.reportData.context?.timestamp, props.timestamp]);

  const [date, setDate] = useState<string>('');
  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    setDate(timestamp ? new Date(timestamp).toLocaleDateString(undefined, options) : '');
  }, [timestamp]);

  return <div className='isr-header-timestamp'>{'Run Completed: ' + date}</div>;
};
