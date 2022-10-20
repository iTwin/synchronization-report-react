/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { InformationPanel, InformationPanelBody, InformationPanelHeader, Label, Text } from '@itwin/itwinui-react';
import React from 'react';
import { ReportContext } from './Report';
import './ReportInfoPanel.scss';

const defaultDisplayStrings = {
  status: 'Status',
  issueType: 'Issue Type',
  impactedWorkflows: 'Impacted Workflows',
  fileName: 'File Name',
  message: 'Message',
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

  const { currentAuditInfo, setCurrentAuditInfo } = context;

  return (
    <InformationPanel className={className} isOpen={!!currentAuditInfo} {...rest}>
      <InformationPanelHeader onClose={() => setCurrentAuditInfo(undefined)}>
        <Text variant='subheading'>{currentAuditInfo?.category}</Text>
      </InformationPanelHeader>
      <InformationPanelBody className='isr-info-panel-body'>
        {currentAuditInfo?.level && (
          <span>
            <Label as='span'>{displayStrings['status']}</Label>
            {currentAuditInfo.level}
          </span>
        )}
        {currentAuditInfo?.category && (
          <span>
            <Label as='span'>{displayStrings['issueType']}</Label>
            {currentAuditInfo?.category ?? ''}
          </span>
        )}
        {currentAuditInfo?.impactedWorkflows && (
          <span>
            <Label as='span'>{displayStrings['impactedWorkflows']}</Label>
            {currentAuditInfo?.impactedWorkflows?.map((w) => (
              <Text key={w}>{w}</Text>
            ))}
          </span>
        )}
        {currentAuditInfo?.fileName && (
          <span>
            <Label as='span'>{displayStrings['fileName']}</Label>
            {currentAuditInfo.fileName}
          </span>
        )}
        {currentAuditInfo?.message && (
          <span>
            <Label as='span'>{displayStrings['message']}</Label>
            {currentAuditInfo?.message}
          </span>
        )}
      </InformationPanelBody>
    </InformationPanel>
  );
};
