import { useState, useEffect } from 'react';
import { Button } from '@itwin/itwinui-react';
import {
  SvgExport,
  SvgClose,
  SvgStatusSuccess,
  SvgStatusWarning,
  SvgStatusError,
  SvgInfoCircular
} from '@itwin/itwinui-icons-react/cjs/icons';
import { ReportData } from './typings';
import './ReportHeader.scss';

export const ReportHeader = ({ data }: { data?: ReportData }) => {
  const [showSupport, setShowSupport] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const [infoCount, setInfoCount] = useState(0);
  const [issuesCount, setIssuesCount] = useState(0);
  useEffect(()=>{
    let error = 0;
    let warning = 0;
    let info = 0;
    data?.filerecords?.forEach((file)=>{
      file.auditrecords?.forEach((record)=>{
        switch (record.auditinfo?.level){
          case 'Error':
            error++;
            break;
          case 'Warning':
            warning++;
            break;
          case 'Info':
            info++;
            break;
        }
      })
    })
    setErrorCount(error);
    setWarningCount(warning);
    setInfoCount(info);
    setIssuesCount(error + warning + info);
  }, [data])

  const [date, setDate] = useState<string>('date');
  useEffect(()=>{
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      setDate(
        data?.context?.timestamp
          ? new Date(data.context.timestamp).toLocaleDateString(
              undefined,
              options
            )
          : ''
      );
    }, [data])


  return (
    <>
      <div className='isr-report-header'>
          <div className='isr-header-title-wrapper'>
            <div className='isr-header-title'>{'Synchronization Report | ' + data?.sourceFilesInfo?.fileName ?? 'unknown'}</div>
            <div className='isr-header-titleDate'>{'Run Completed: ' + date}</div>
          </div>
          <div className='isr-header-close'>
            <Button startIcon={<SvgExport />} >Export</Button>
            <Button startIcon={<SvgClose />} >Close</Button>
          </div>

          <div className='isr-header-support' onClick={() => (setShowSupport(!showSupport))}>{'IDs for Tech Support'}</div>
          {showSupport && (
            <div className='isr-support-contextMenu'>Context</div>
          )}
          <div className='isr-header-issues'>

          {issuesCount > 0 ? (
            <>
              <div>{issuesCount + ' Synchronization Issues |'}</div>
              {errorCount > 0 && (
                <>
                <SvgStatusError className='isr-status-icon isr-negative'/>
                <div>{'Errors: ' + errorCount + ' |'}</div>
                </>
              )}
              {warningCount > 0 && (
                <>
                <SvgStatusWarning className='isr-status-icon isr-warning'/>
                <div>{'Warnings: ' + warningCount + ' |'}</div>
                </>
              )}
              {infoCount > 0 && (
                <>
                <SvgInfoCircular className='isr-status-icon isr-informational'/>
                <div>{'Other Issues: ' + infoCount }</div>
                </>
              )}
              </>
          ): (
          <>
          <SvgStatusSuccess className='isr-status-icon isr-positive'/>
          <div>{'No Issues Found' }</div>
          </>
          )}
          </div>
        </div>
    </>

  );
};
