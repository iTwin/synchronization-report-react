import React from 'react';
import { Button } from '@itwin/itwinui-react';
import { SvgClose } from '@itwin/itwinui-icons-react/cjs/icons';
import './ReportTitle.scss';

export type ReportTitleProps = {
  fileName?: string;
};

export const ReportTitle = (props: ReportTitleProps) => {
  const { fileName } = props;

  return (
    <div className='isr-report-title'>
      <div className='isr-title'>{'Synchronization Report | ' + fileName ?? 'unknown'}</div>
      <div className='isr-title-buttons'>
        {/* <Button startIcon={<SvgExport />}>Export</Button> */}
        <Button startIcon={<SvgClose />}>Close</Button>
      </div>
    </div>
  );
};
