import { useState, useEffect, useCallback } from 'react';
import { Button, IconButton, Tooltip } from '@itwin/itwinui-react';
import {
  SvgExport,
  SvgClose,
  SvgStatusSuccess,
  SvgStatusWarning,
  SvgStatusError,
  SvgInfoCircular,
  SvgCopy
} from '@itwin/itwinui-icons-react/cjs/icons';
import { ReportData } from './typings';
import './ReportHeader.scss';

export type ReportHeaderProps = {
  data: ReportData;
  contextName?: string; //Todo: How to pass in these props
  jobDefID?: string;
  jobRunID?: string;
  modelName?: string;
  organizationName?: string;
  userEmail?: string;
  /// If defined and `onCreateServiceRequestClick` is not defined, this url will be opened in a new tab when creating a new service request
  serviceReportUrl?: string;
  /// If defined, clicking on the button to create a service request will call this function.
  onCreateServiceRequestClick?: () => void;
};

export const ReportHeader = (props: ReportHeaderProps) => {
  const {
    data,
    serviceReportUrl,
    onCreateServiceRequestClick,
  } = props;

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

  const activityID = data?.context?.activityid ?? 'No Activity ID';
  const briefcaseID = data?.context?.briefcaseid ?? 'No Briefcase ID';
  const contextId = data?.context?.contextid ?? 'No Context ID';
  const contextName = props.contextName ?? 'No Context Name';
  const jobDefID = props.jobDefID ?? 'No Job Definition ID';
  const jobID = data?.context?.jobid ?? 'No Job ID';
  const jobRunID = props.jobRunID ?? 'No Job Run ID';
  const modelID = data?.context?.imodelid ?? 'No iModel ID';
  const modelName = props.modelName ?? 'No Model Name';
  const organizationName = props.organizationName ?? 'No Organization Name';
  const userEmail = props.userEmail ?? 'No User Email';

  const handleCopyTextClicked = ()=>{
    // DO NOT LOCALIZE!!! This is used for pasting into the service request form in English.
    const debugString = `
      Activity ID: ${activityID}
      Briefcase ID: ${briefcaseID}
      Context ID: ${contextId}
      Ctx. Name: ${contextName}
      Job Def. ID: ${jobDefID}
      Job ID: ${jobID}
      Job Run ID: ${jobRunID}
      iModel ID: ${modelID}
      iModel Name: ${modelName}
      Org. Name: ${organizationName}
      User Email: ${userEmail}`;

     navigator.clipboard.writeText(debugString);
    };

    const onCreateSrClick = useCallback(() => {
      if (onCreateServiceRequestClick) {
        onCreateServiceRequestClick();
        return;
      }
  
      if (serviceReportUrl) {
        window.open(serviceReportUrl, '_blank');
      }
    }, [serviceReportUrl, onCreateServiceRequestClick]);


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

          <div className='isr-header-supportWrapper'>
            <div className='isr-support-button' onClick={() => (setShowSupport(!showSupport))}>
              {'IDs for Tech Support'}
            </div>
            {showSupport && (
            <div className='isr-support-debugIDWrapper'>
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>Activity ID:</div>
                <div className='isr-support-debugID-id'>{activityID}</div>
              </div>
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>Briefcase ID:</div>
                <div className='isr-support-debugID-id'>{briefcaseID}</div>
              </div>
              <div className='isr-support-debugID'>
              <div className='isr-support-debugID-title'>Context ID:</div>
                <div className='isr-support-debugID-id'>{contextId}</div>
              </div>
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>Ctx. Name:</div>
                <div className='isr-support-debugID-id'>{contextName}</div>
              </div>
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>Job Def. ID:</div>
                <div className='isr-support-debugID-id'>{jobDefID}</div>
              </div>
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>Job ID:</div>
                <div className='isr-support-debugID-id'>{jobID}</div>
              </div>
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>Job Run ID:</div>
                <div className='isr-support-debugID-id'>{jobRunID}</div>
              </div>
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>Model ID:</div>
                <div className='isr-support-debugID-id'>{modelID}</div>
              </div>
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>Model Name:</div>
                <div className='isr-support-debugID-id'>{modelName}</div>
              </div>
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>Org. Name:</div>
                <div className='isr-support-debugID-id'>{organizationName}</div>
              </div>
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>User Email:</div>
                <div className='isr-support-debugID-id'>{userEmail}</div>
              </div>
              <div className='isr-support-debugID-buttons'>
                <Tooltip content={'Copy to clipboard and paste in service request'} placement='bottom'>
                  <IconButton onClick={handleCopyTextClicked}>
                    <SvgCopy />
                  </IconButton>
                </Tooltip>
                <Button styleType='cta' onClick={onCreateSrClick}>
                  {'Create Service Request'}
                </Button></div>
              </div>
          )}
          </div>

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
