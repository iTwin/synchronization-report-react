/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  Anchor,
  InformationPanel,
  InformationPanelBody,
  InformationPanelHeader,
  Label,
  Text,
} from '@itwin/itwinui-react';
import React from 'react';
import { ReportContext } from './Report';
import './ReportInfoPanel.scss';
import { StatusIcon } from './utils';

const defaultDisplayStrings = {
  status: 'Severity',
  issueType: 'Type',
  category: 'Category',
  impactedWorkflows: 'Impacted Workflows',
  fileName: 'File Name',
  message: 'Message',
  metadata: 'Metadata',
  filePath: 'File Path',
  fileId: 'File ID',
  fileStatus: 'File Status',
  dataSource: 'Data Source',
  failed: 'Failed',
  processedWithIssues: 'Processed with issues',
  processed: 'Processed',
};

export const ReportInfoPanel = ({
  displayStrings: userDisplayStrings,
  className,
  ...rest
}: {
  displayStrings?: Partial<typeof defaultDisplayStrings>;
  className?: string;
}) => {
  const context = React.useContext(ReportContext);

  if (!context) {
    throw new Error('ReportInfoPanel must be used inside the Report component');
  }

  const displayStrings = { ...defaultDisplayStrings, ...userDisplayStrings };

  const { currentAuditInfo, setCurrentAuditInfo, setActiveRow } = context;

  const onClose = () => {
    setCurrentAuditInfo(undefined);
    setActiveRow('');
  };

  return (
    <InformationPanel className={className} isOpen={!!currentAuditInfo} {...rest}>
      <InformationPanelHeader onClose={onClose}>
        <Text variant='subheading'>{currentAuditInfo?.category ?? displayStrings['metadata']}</Text>
      </InformationPanelHeader>
      <InformationPanelBody className='isr-info-panel-body'>
        {currentAuditInfo?.category && (
          <span>
            <Label as='span'>{displayStrings['category']}</Label>
            {currentAuditInfo.category}
          </span>
        )}
        {currentAuditInfo?.type && (
          <span>
            <Label as='span'>{displayStrings['issueType']}</Label>
            {currentAuditInfo?.type ?? ''}
          </span>
        )}
        <span>
          {currentAuditInfo?.level && (
            <>
              <Label as='span'>{displayStrings['status']}</Label>
              <span className='isr-icon-inline'>
                <StatusIcon
                  status={
                    ['Error', 'Fatal', 'Critical'].some((level) => level === currentAuditInfo.level)
                      ? 'error'
                      : currentAuditInfo.level === 'Warning'
                      ? 'warning'
                      : 'informational'
                  }
                />
                {currentAuditInfo.level}
              </span>
            </>
          )}
        </span>

        {currentAuditInfo?.message && (
          <span>
            <Label as='span'>{displayStrings['message']}</Label>
            {currentAuditInfo?.message}
          </span>
        )}
        {currentAuditInfo?.fileName && (
          <span>
            <Label as='span'>{displayStrings['fileName']}</Label>
            {currentAuditInfo.fileName}
          </span>
        )}
        <span>
          <Label as='span'>{displayStrings['fileStatus']}</Label>
          <span className='isr-icon-inline'>
            {!currentAuditInfo?.fileExists && !currentAuditInfo?.bimFileExists ? (
              <>
                <StatusIcon status='error' />
                {displayStrings['failed']}
              </>
            ) : currentAuditInfo.fileId && currentAuditInfo.fileStatus ? (
              <>
                <StatusIcon status='warning' />
                {displayStrings['processedWithIssues']}
              </>
            ) : (
              <>
                <StatusIcon status='success' />
                {displayStrings['processed']}
              </>
            )}
          </span>
        </span>
        {currentAuditInfo?.path && (
          <span>
            <Label as='span'>{displayStrings['filePath']}</Label>
            <Anchor href={currentAuditInfo?.path} target='_blank'>
              {currentAuditInfo?.path}
            </Anchor>
          </span>
        )}
        {currentAuditInfo?.fileId && (
          <span>
            <Label as='span'>{displayStrings['fileId']}</Label>
            {currentAuditInfo?.fileId}
          </span>
        )}
        {currentAuditInfo?.dataSource && (
          <span>
            <Label as='span'>{displayStrings['dataSource']}</Label>
            {currentAuditInfo?.dataSource}
          </span>
        )}
      </InformationPanelBody>
    </InformationPanel>
  );
};
