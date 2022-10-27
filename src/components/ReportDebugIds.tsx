/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import './ReportDebugIds.scss';
import { ReportContext } from './Report';
import { Button, Label, Text } from '@itwin/itwinui-react';
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
                <Label as='span'>{`${displayStrings.activityid}:`}</Label>
                <Text>{debugIds['Activity Id']}</Text>
              </div>
            )}
            {debugIds['Briefcase Id'] && (
              <div className='isr-support-debugID'>
                <Label as='span'>{`${displayStrings.briefcaseid}:`}</Label>
                <Text>{debugIds['Briefcase Id']}</Text>
              </div>
            )}
            {debugIds['Context Id'] && (
              <div className='isr-support-debugID'>
                <Label as='span'>{`${displayStrings.contextid}:`}</Label>
                <Text>{debugIds['Context Id']}</Text>
              </div>
            )}
            {debugIds['Ctx. Name'] && (
              <div className='isr-support-debugID'>
                <Label as='span'>{`${displayStrings.contextName}:`}</Label>
                <Text>{debugIds['Ctx. Name']}</Text>
              </div>
            )}
            {debugIds['Job Def. Id'] && (
              <div className='isr-support-debugID'>
                <Label as='span'>{`${displayStrings.jobDefID}:`}</Label>
                <Text>{debugIds['Job Def. Id']}</Text>
              </div>
            )}
            {debugIds['Job Id'] && (
              <div className='isr-support-debugID'>
                <Label as='span'>{`${displayStrings.jobid}:`}</Label>
                <Text>{debugIds['Job Id']}</Text>
              </div>
            )}
            {debugIds['Job Run Id'] && (
              <div className='isr-support-debugID'>
                <Label as='span'>`${displayStrings.jobRunID}:`</Label>
                <Text>{debugIds['Job Run Id']}</Text>
              </div>
            )}
            {debugIds['iModel Id'] && (
              <div className='isr-support-debugID'>
                <Label as='span'>{`${displayStrings.modelid}:`}</Label>
                <Text>{debugIds['iModel Id']}</Text>
              </div>
            )}
            {debugIds['iModel Name'] && (
              <div className='isr-support-debugID'>
                <Label as='span'>{`${displayStrings.modelName}:`}</Label>
                <Text>{debugIds['iModel Name']}</Text>
              </div>
            )}
            {debugIds['Org. Name'] && (
              <div className='isr-support-debugID'>
                <Label as='span'>{`${displayStrings.organizationName}:`}</Label>
                <Text>{debugIds['Org. Name']}</Text>
              </div>
            )}
            {debugIds['User Email'] && (
              <div className='isr-support-debugID'>
                <Label as='span'>{`${displayStrings.userEmail}:`}</Label>
                <Text>{debugIds['User Email']}</Text>
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
