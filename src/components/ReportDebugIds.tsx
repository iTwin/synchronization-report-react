/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import './ReportDebugIds.scss';
import { ReportContext } from './Report';
import { Button } from '@itwin/itwinui-react';
import { ReportDataContext } from './report-data-typings';
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
  idsForTechSupport: 'IDs for Tech Support',
};

export type debugIdData = {
  reportData?: ReportDataContext;
  contextName?: string;
  jobDefID?: string;
  jobRunID?: string;
  modelName?: string;
  organizationName?: string;
  userEmail?: string;
};

export type ReportDebugIdsProps = {
  data?: debugIdData;
  currentTab?: 'files' | 'details';
  className?: string;
  displayStrings?: Partial<typeof defaultDisplayStrings>;
  children?: React.ReactNode;
  hideBlankValues?: boolean;
};

/**
 * Button that opens a menu to display debug ids for creating a service request.
 *
 * `children` can be specified to add more content in the menu.
 */
export const ReportDebugIds = (props: ReportDebugIdsProps) => {
  const { data, hideBlankValues } = props;

  const context = React.useContext(ReportContext);
  const reportData = props.data?.reportData || context?.reportData.context;

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...props.displayStrings }),
    [props.displayStrings]
  );

  const debugIDs = {
    'Activity ID': reportData?.activityid ?? 'No Activity ID',
    'Briefcase ID': reportData?.briefcaseid ?? 'No Briefcase ID',
    'Context ID': reportData?.contextid ?? 'No Context ID',
    'Ctx. Name': data?.contextName ?? 'No Context Name',
    'Job Def. ID': data?.jobDefID ?? 'No Job Definition ID',
    'Job ID': reportData?.jobid ?? 'No Job ID',
    'Job Run ID': data?.jobRunID ?? 'No Job Run ID',
    'iModel ID': reportData?.imodelid ?? 'No iModel ID',
    'iModel Name': data?.modelName ?? 'No Model Name',
    'Org. Name': data?.organizationName ?? 'No Organization Name',
    'User Email': data?.userEmail ?? 'No User Email',
  };

  return (
    <div className={props.className}>
      <Tippy
        content={
          <div className='isr-support-debugIDWrapper'>
            {(!hideBlankValues || reportData?.activityid) && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.activityid}:`}</div>
                <div className='isr-support-debugID-id'>{debugIDs['Activity ID']}</div>
              </div>
            )}
            {(!hideBlankValues || reportData?.briefcaseid) && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.briefcaseid}:`}</div>
                <div className='isr-support-debugID-id'>{debugIDs['Briefcase ID']}</div>
              </div>
            )}
            {(!hideBlankValues || reportData?.contextid) && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.contextid}:`}</div>
                <div className='isr-support-debugID-id'>{debugIDs['Context ID']}</div>
              </div>
            )}
            {(!hideBlankValues || data?.contextName) && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.contextName}:`}</div>
                <div className='isr-support-debugID-id'>{debugIDs['Ctx. Name']}</div>
              </div>
            )}
            {(!hideBlankValues || data?.jobDefID) && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.jobDefID}:`}</div>
                <div className='isr-support-debugID-id'>{debugIDs['Job Def. ID']}</div>
              </div>
            )}
            {(!hideBlankValues || reportData?.jobid) && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.jobid}:`}</div>
                <div className='isr-support-debugID-id'>{debugIDs['Job ID']}</div>
              </div>
            )}
            {(!hideBlankValues || data?.jobRunID) && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.jobRunID}:`}</div>
                <div className='isr-support-debugID-id'>{debugIDs['Job Run ID']}</div>
              </div>
            )}
            {(!hideBlankValues || reportData?.imodelid) && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.modelid}:`}</div>
                <div className='isr-support-debugID-id'>{debugIDs['iModel ID']}</div>
              </div>
            )}
            {(!hideBlankValues || data?.modelName) && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.modelName}:`}</div>
                <div className='isr-support-debugID-id'>{debugIDs['iModel Name']}</div>
              </div>
            )}
            {(!hideBlankValues || data?.organizationName) && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.organizationName}:`}</div>
                <div className='isr-support-debugID-id'>{debugIDs['Org. Name']}</div>
              </div>
            )}
            {(!hideBlankValues || data?.userEmail) && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.userEmail}:`}</div>
                <div className='isr-support-debugID-id'>{debugIDs['User Email']}</div>
              </div>
            )}
            {props.children}
          </div>
        }
        trigger='click'
        interactive={true}
        placement='bottom-end'
      >
        <Button className='isr-support-open' styleType='borderless' size='small'>
          {displayStrings.idsForTechSupport}
        </Button>
      </Tippy>
    </div>
  );
};

export default ReportDebugIds;
