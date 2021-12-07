import React from 'react';
import { useState, useEffect } from 'react';
import './ReportTimestamp.scss';

export type ReportTimestampProps = {
  timestamp?: string;
};

export const ReportTimestamp = (props: ReportTimestampProps) => {
  const { timestamp } = props;

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
