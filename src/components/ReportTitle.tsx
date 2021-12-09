import React from 'react';
import './ReportTitle.scss';

export type ReportTitleProps = {
  fileName?: string;
};

export const ReportTitle = (props: ReportTitleProps) => {
  const { fileName } = props;

  return <div className='isr-title'>{'Synchronization Report | ' + fileName ?? 'unknown'}</div>;
};
