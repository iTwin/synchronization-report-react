import * as React from 'react';
import classnames from 'classnames';
import './ReportServiceRequestSupport.scss';
import { ReportContext } from './Report';
import { Button, IconButton, Tooltip } from '@itwin/itwinui-react';
import { SvgCopy } from '@itwin/itwinui-icons-react/cjs/icons';
import { ReportDataContext } from './typings';

export type ReportServiceRequestSupportProps = {
  data?: ReportDataContext;
  currentTab?: 'files' | 'details';
  className?: string;
  contextName?: string;
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

export const ReportServiceRequestSupport = (props: ReportServiceRequestSupportProps) => {
  const { serviceReportUrl, onCreateServiceRequestClick } = props;

  const context = React.useContext(ReportContext);
  const data = props.data || context?.reportData.context;
  const [showDebugIDs, setShowDebugIDs] = React.useState(false);

  const activityID = data?.activityid ?? 'No Activity ID';
  const briefcaseID = data?.briefcaseid ?? 'No Briefcase ID';
  const contextId = data?.contextid ?? 'No Context ID';
  const contextName = props.contextName ?? 'No Context Name';
  const jobDefID = props.jobDefID ?? 'No Job Definition ID';
  const jobID = data?.jobid ?? 'No Job ID';
  const jobRunID = props.jobRunID ?? 'No Job Run ID';
  const modelID = data?.imodelid ?? 'No iModel ID';
  const modelName = props.modelName ?? 'No Model Name';
  const organizationName = props.organizationName ?? 'No Organization Name';
  const userEmail = props.userEmail ?? 'No User Email';

  const handleCopyTextClicked = () => {
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

  const onCreateSrClick = React.useCallback(() => {
    if (onCreateServiceRequestClick) {
      onCreateServiceRequestClick();
      return;
    }

    if (serviceReportUrl) {
      window.open(serviceReportUrl, '_blank');
    }
  }, [serviceReportUrl, onCreateServiceRequestClick]);

  const supportInfo = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: { target: any }) => {
    if (supportInfo?.current?.contains(e.target)) {
      return;
    }
    setShowDebugIDs(false);
  };

  React.useEffect(() => {
    if (showDebugIDs) {
      document.addEventListener('pointerdown', handleClickOutside);
    } else {
      document.removeEventListener('pointerdown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [handleClickOutside, showDebugIDs]);

  return (
    <>
      <div className={classnames('isr-report-service-request-support', props.className)} ref={supportInfo}>
        <div className='isr-support-open' onClick={() => setShowDebugIDs(!showDebugIDs)}>
          {'IDs for Tech Support'}
        </div>
        {showDebugIDs && (
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
            <div className='isr-support-service-request-buttons'>
              <Tooltip content={'Copy to clipboard and paste in service request'} placement='bottom'>
                <IconButton onClick={handleCopyTextClicked}>
                  <SvgCopy />
                </IconButton>
              </Tooltip>
              <Button styleType='cta' onClick={onCreateSrClick}>
                {'Create Service Request'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
