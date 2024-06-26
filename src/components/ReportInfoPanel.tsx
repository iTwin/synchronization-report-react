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
import { getHelpArticleUrl, hasHelpArticle } from './help-articles';

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
  dataSource: 'Data Source',
  failed: 'Failed',
  processedWithIssues: 'Processed with issues',
  processed: 'Processed',
  learnMore: 'Learn more about this issue',
};

export const ReportInfoPanel = ({
  displayStrings: userDisplayStrings,
  onIssueArticleOpened,
  className,
  ...rest
}: {
  displayStrings?: Partial<typeof defaultDisplayStrings>;
  onIssueArticleOpened?: (issueId: string) => void;
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
        <Text variant='subheading'>{currentAuditInfo?.issueid ?? displayStrings['metadata']}</Text>
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
            {hasHelpArticle(currentAuditInfo?.issueid) && (
              <>
                <br />{' '}
                <Anchor
                  href={getHelpArticleUrl(currentAuditInfo?.issueid || '')}
                  onClick={() => currentAuditInfo?.issueid && context?.onIssueArticleOpened?.(currentAuditInfo.issueid)}
                  target='_blank'
                >
                  {displayStrings['learnMore']}
                </Anchor>
              </>
            )}
          </span>
        )}
        {currentAuditInfo?.fileName && (
          <span>
            <Label as='span'>{displayStrings['fileName']}</Label>
            {currentAuditInfo.fileName}
          </span>
        )}
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
