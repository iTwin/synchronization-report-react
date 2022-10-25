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
  activityid: 'Activity Id',
  briefcaseid: 'Briefcase Id',
  contextid: 'Context Id',
  contextName: 'Ctx. Name',
  jobDefID: 'Job Def. Id',
  jobid: 'Job Id',
  jobRunID: 'Job Run Id',
  modelid: 'Model Id',
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
};

/**
 * Button that opens a menu to display debug ids for creating a service request.
 *
 * `children` can be specified to add more content in the menu.
 */
export const ReportDebugIds = (props: ReportDebugIdsProps) => {
  const { data } = props;

  const context = React.useContext(ReportContext);
  const reportData = props.data?.reportData || context?.reportData.context;

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...props.displayStrings }),
    [props.displayStrings]
  );

  const debugIds = {
    'Activity Id': reportData?.activityid === '' ? 'No Activity Id' : reportData?.activityid,
    'Briefcase Id': reportData?.briefcaseid === '' ? 'No Briefcase Id' : reportData?.briefcaseid,
    'Context Id': reportData?.contextid === '' ? 'No Context Id' : reportData?.contextid,
    'Ctx. Name': data?.contextName === '' ? 'No Context Name' : data?.contextName,
    'Job Def. Id': data?.jobDefID === '' ? 'No Job Definition Id' : data?.jobDefID,
    'Job Id': reportData?.jobid === '' ? 'No Job Id' : reportData?.jobid,
    'Job Run Id': data?.jobRunID === '' ? 'No Job Run Id' : data?.jobRunID,
    'iModel Id': reportData?.imodelid === '' ? 'No iModel Id' : reportData?.imodelid,
    'iModel Name': data?.modelName === '' ? 'No Model Name' : data?.modelName,
    'Org. Name': data?.organizationName === '' ? 'No Organization Name' : data?.organizationName,
    'User Email': data?.userEmail === '' ? 'No User Email' : data?.userEmail,
  };

  return (
    <div className={props.className}>
      <Tippy
        content={
          <div className='isr-support-debugIDWrapper'>
            {debugIds['Activity Id'] && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.activityid}:`}</div>
                <div className='isr-support-debugID-id'>{debugIds['Activity Id']}</div>
              </div>
            )}
            {debugIds['Briefcase Id'] && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.briefcaseid}:`}</div>
                <div className='isr-support-debugID-id'>{debugIds['Briefcase Id']}</div>
              </div>
            )}
            {debugIds['Context Id'] && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.contextid}:`}</div>
                <div className='isr-support-debugID-id'>{debugIds['Context Id']}</div>
              </div>
            )}
            {debugIds['Ctx. Name'] && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.contextName}:`}</div>
                <div className='isr-support-debugID-id'>{debugIds['Ctx. Name']}</div>
              </div>
            )}
            {debugIds['Job Def. Id'] && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.jobDefID}:`}</div>
                <div className='isr-support-debugID-id'>{debugIds['Job Def. Id']}</div>
              </div>
            )}
            {debugIds['Job Id'] && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.jobid}:`}</div>
                <div className='isr-support-debugID-id'>{debugIds['Job Id']}</div>
              </div>
            )}
            {debugIds['Job Run Id'] && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.jobRunID}:`}</div>
                <div className='isr-support-debugID-id'>{debugIds['Job Run Id']}</div>
              </div>
            )}
            {debugIds['iModel Id'] && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.modelid}:`}</div>
                <div className='isr-support-debugID-id'>{debugIds['iModel Id']}</div>
              </div>
            )}
            {debugIds['iModel Name'] && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.modelName}:`}</div>
                <div className='isr-support-debugID-id'>{debugIds['iModel Name']}</div>
              </div>
            )}
            {debugIds['Org. Name'] && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.organizationName}:`}</div>
                <div className='isr-support-debugID-id'>{debugIds['Org. Name']}</div>
              </div>
            )}
            {debugIds['User Email'] && (
              <div className='isr-support-debugID'>
                <div className='isr-support-debugID-title'>{`${displayStrings.userEmail}:`}</div>
                <div className='isr-support-debugID-id'>{debugIds['User Email']}</div>
              </div>
            )}
            {props.children}
          </div>
        }
        trigger='click'
        interactive={true}
        placement='auto-start'
      >
        <Button className='isr-support-open' styleType='borderless' size='small'>
          {displayStrings.idsForTechSupport}
        </Button>
      </Tippy>
    </div>
  );
};

export default ReportDebugIds;
