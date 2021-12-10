import React from 'react';
import './ReportTitle.scss';
import { ReportContext } from './Report';

export type ReportTitleProps = {
  fileName?: string;
};

export const ReportTitle = (props: ReportTitleProps) => {
  const context = React.useContext(ReportContext);
  const fileName = React.useMemo(() => {
    return props.fileName || context?.reportData.sourceFilesInfo?.fileName;
  }, [context?.reportData.sourceFilesInfo?.fileName, props.fileName]);

  return <div className='isr-title'>{'Synchronization Report | ' + fileName ?? 'unknown'}</div>;
};
