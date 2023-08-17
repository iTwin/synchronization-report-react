/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import './ReportDebugIds.scss';
import { ReportContext } from './Report';
import { Button, LabeledTextarea, Modal } from '@itwin/itwinui-react';
import { ReportDataContext } from './report-data-typings';
import Tippy from '@tippyjs/react';
import { SvgInfoCircularHollow } from '@itwin/itwinui-icons-react';
import { CopyToClipboardButton } from './copyToClipboardButton';

const defaultDisplayStrings = {
  activityid: 'taskId',
  briefcaseid: 'Briefcase Id',
  contextid: 'Context Id',
  contextName: 'Ctx. Name',
  jobDefID: 'Job Def. Id',
  jobid: 'jobId',
  jobRunId: 'runId',
  modelid: 'Model Id',
  modelName: 'Model Name',
  organizationName: 'Org. Name',
  userEmail: 'User Email',
  reportAnIssue: 'Report an issue',
};

export type debugIdData = {
  reportData?: ReportDataContext;
  contextName?: string;
  jobDefID?: string;
  jobRunId?: string;
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
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { data } = props;

  const context = React.useContext(ReportContext);
  const reportData = props.data?.reportData || context?.reportData.context;

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...props.displayStrings }),
    [props.displayStrings]
  );

  const debugIds = {
    taskId: reportData?.activityid === '' ? 'No taskId' : reportData?.activityid,
    'Briefcase Id': reportData?.briefcaseid === '' ? 'No Briefcase Id' : reportData?.briefcaseid,
    'Context Id': reportData?.contextid === '' ? 'No Context Id' : reportData?.contextid,
    'Ctx. Name': data?.contextName === '' ? 'No Context Name' : data?.contextName,
    'Job Def. Id': data?.jobDefID === '' ? 'No Job Definition Id' : data?.jobDefID,
    jobId: reportData?.jobid === '' ? 'No jobId' : reportData?.jobid,
    runId: data?.jobRunId === '' ? 'No runId' : data?.jobRunId,
    'iModel Id': reportData?.imodelid === '' ? 'No iModel Id' : reportData?.imodelid,
    'iModel Name': data?.modelName === '' ? 'No Model Name' : data?.modelName,
    'Org. Name': data?.organizationName === '' ? 'No Organization Name' : data?.organizationName,
    'User Email': data?.userEmail === '' ? 'No User Email' : data?.userEmail,
  };

  const dataToInclude = `
    ${displayStrings.jobRunId}: ${debugIds['runId']}
    ${displayStrings.jobid}: ${debugIds['jobId']}
    ${displayStrings.activityid}: ${debugIds['taskId']}
  `;

  return (
    <div className={props.className}>
      <Tippy
        content={
          <Modal
            className='report-issue-modal'
            title={'Report an issue'}
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <LabeledTextarea
              label={'Please include the following data in the report'}
              value={dataToInclude}
              onChange={() => null} // Ignore
            />
            <div className='modal-button__bottom-right'>
              <CopyToClipboardButton value={dataToInclude} />
            </div>
          </Modal>
        }
        trigger='click'
        interactive={true}
        placement='auto-start'
      >
        <Button
          className='isr-support-open'
          styleType='borderless'
          size='small'
          onClick={() => setModalOpen(!modalOpen)}
        >
          <SvgInfoCircularHollow fill='rgb(0, 113, 184)' style={{ verticalAlign: 'text-bottom', marginRight: '4px' }} />
          {displayStrings.reportAnIssue}
        </Button>
      </Tippy>
    </div>
  );
};

export default ReportDebugIds;
