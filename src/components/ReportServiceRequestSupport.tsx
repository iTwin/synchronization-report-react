import * as React from 'react';
import classnames from 'classnames';
import './ReportServiceRequestSupport.scss';
import { ReportContext } from './Report';
import { Button, IconButton, Tooltip } from '@itwin/itwinui-react';
import SvgCopy from '@itwin/itwinui-icons-react/cjs/icons/Copy';
import { ReportDataContext } from './typings';
import Tippy from '@tippyjs/react';

const defaultDisplayStrings = {
  activityid: 'Activity ID',
  briefcaseid: 'Briefcase ID',
  contextid: 'Context ID',
  contextName: 'Ctx. Name',
  jobDefID: 'Job Def. ID',
  jobid: 'Job ID',
  jobRunID: 'Job Run ID',
  modelid: 'Model ID',
  modelName: 'Model Name',
  organizationName: 'Org. Name',
  userEmail: 'User Email',
};

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
  userDisplayStrings?: typeof defaultDisplayStrings;
  children?: React.ReactNode;
};

export const ReportServiceRequestSupport = (props: ReportServiceRequestSupportProps) => {
  const context = React.useContext(ReportContext);
  const data = props.data || context?.reportData.context;
  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...props.userDisplayStrings }),
    [props.userDisplayStrings]
  );

  const debugIDs = {
    'Activity ID': data?.activityid ?? 'No Activity ID',
    'Briefcase ID': data?.briefcaseid ?? 'No Briefcase ID',
    'Context ID': data?.contextid ?? 'No Context ID',
    'Ctx. Name': props.contextName ?? 'No Context Name',
    'Job Def. ID': props.jobDefID ?? 'No Job Definition ID',
    'Job ID': data?.jobid ?? 'No Job ID',
    'Job Run ID': props.jobRunID ?? 'No Job Run ID',
    'iModel ID': data?.imodelid ?? 'No iModel ID',
    'iModel Name': props.modelName ?? 'No Model Name',
    'Org. Name': props.organizationName ?? 'No Organization Name',
    'User Email': props.userEmail ?? 'No User Email',
  };

  const handleCopyTextClicked = () => {
    // DO NOT LOCALIZE!!! This is used for pasting into the service request form in English.
    let debugString = '';
    Object.entries(debugIDs).map((id) => {
      debugString = debugString + `${id[0]}: ${id[1]} \n`;
    });
    navigator.clipboard.writeText(debugString);
  };

  return (
    <div className={classnames('isr-report-service-request-support', props.className)}>
      <Tippy
        content={
          <div className='isr-support-debugIDWrapper'>
            <div className='isr-support-debugID'>
              <div className='isr-support-debugID-title'>{`${displayStrings.activityid}:`}</div>
              <div className='isr-support-debugID-id'>{debugIDs['Activity ID']}</div>
            </div>
            <div className='isr-support-debugID'>
              <div className='isr-support-debugID-title'>{`${displayStrings.briefcaseid}:`}</div>
              <div className='isr-support-debugID-id'>{debugIDs['Briefcase ID']}</div>
            </div>
            <div className='isr-support-debugID'>
              <div className='isr-support-debugID-title'>{`${displayStrings.contextid}:`}</div>
              <div className='isr-support-debugID-id'>{debugIDs['Context ID']}</div>
            </div>
            <div className='isr-support-debugID'>
              <div className='isr-support-debugID-title'>{`${displayStrings.contextName}:`}</div>
              <div className='isr-support-debugID-id'>{debugIDs['Ctx. Name']}</div>
            </div>
            <div className='isr-support-debugID'>
              <div className='isr-support-debugID-title'>{`${displayStrings.jobDefID}:`}</div>
              <div className='isr-support-debugID-id'>{debugIDs['Job Def. ID']}</div>
            </div>
            <div className='isr-support-debugID'>
              <div className='isr-support-debugID-title'>{`${displayStrings.jobid}:`}</div>
              <div className='isr-support-debugID-id'>{debugIDs['Job ID']}</div>
            </div>
            <div className='isr-support-debugID'>
              <div className='isr-support-debugID-title'>{`${displayStrings.jobRunID}:`}</div>
              <div className='isr-support-debugID-id'>{debugIDs['Job Run ID']}</div>
            </div>
            <div className='isr-support-debugID'>
              <div className='isr-support-debugID-title'>{`${displayStrings.modelid}:`}</div>
              <div className='isr-support-debugID-id'>{debugIDs['iModel ID']}</div>
            </div>
            <div className='isr-support-debugID'>
              <div className='isr-support-debugID-title'>{`${displayStrings.modelName}:`}</div>
              <div className='isr-support-debugID-id'>{debugIDs['iModel Name']}</div>
            </div>
            <div className='isr-support-debugID'>
              <div className='isr-support-debugID-title'>{`${displayStrings.organizationName}:`}</div>
              <div className='isr-support-debugID-id'>{debugIDs['Org. Name']}</div>
            </div>
            <div className='isr-support-debugID'>
              <div className='isr-support-debugID-title'>{`${displayStrings.userEmail}:`}</div>
              <div className='isr-support-debugID-id'>{debugIDs['User Email']}</div>
            </div>
            <div className='isr-support-service-request-buttons'>
              <Tooltip content={'Copy to clipboard and paste in service request'} placement='bottom'>
                <IconButton onClick={handleCopyTextClicked}>
                  <SvgCopy />
                </IconButton>
              </Tooltip>
              {props.children}
            </div>
          </div>
        }
        trigger='click'
        interactive={true}
        placement='left-end'
      >
        <Button className='isr-support-open' styleType='borderless'>
          {'IDs for Tech Support'}
        </Button>
      </Tippy>
    </div>
  );
};
