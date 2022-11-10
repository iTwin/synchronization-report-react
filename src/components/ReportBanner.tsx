/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { FileRecord, SourceFile } from './report-data-typings';
import './ReportBanner.scss';
import { BannerTile, StatusIcon } from './utils';
import { Issues, ReportContext } from './Report';
import { Select, Surface, Text } from '@itwin/itwinui-react';
import SvgFlag from '@itwin/itwinui-icons-react/esm/icons/Flag';
import SvgHierarchyTree from '@itwin/itwinui-icons-react/esm/icons/HierarchyTree';

const defaultDisplayStrings = {
  errors: 'Errors',
  warnings: 'Warnings',
  otherIssues: 'Other issues',
  totalIssues: 'Total Issues',
  workflows: 'Workflows',
};

export type ReportBannerProps = {
  fileRecords?: FileRecord[];
  filesProcessed?: SourceFile[];
  currentTable?: 'files' | 'details' | 'workflow';
  className?: string;
  displayStrings?: Partial<typeof defaultDisplayStrings>;
};

/**
 * Shows an alert that should be located above the files and details tabs.
 * The alert shows counts for files processed as well as the issues and errors.
 */
export const ReportBanner = (props: ReportBannerProps) => {
  const context = React.useContext(ReportContext);

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...props.displayStrings }),
    [props.displayStrings]
  );

  const fileRecords = React.useMemo(() => {
    return props.fileRecords || context?.reportData.filerecords || [];
  }, [context?.reportData.filerecords, props.fileRecords]);

  const filesProcessed: SourceFile[] = React.useMemo(() => {
    if (props.filesProcessed) {
      return [...filesProcessed];
    } else if (context?.reportData.sourceFilesInfo?.Files) {
      return [context.reportData.sourceFilesInfo, ...context.reportData.sourceFilesInfo.Files];
    }

    return [];
  }, [context?.reportData.sourceFilesInfo, props.filesProcessed]);

  const [errorCount, setErrorCount] = React.useState(0);
  const [warningCount, setWarningCount] = React.useState(0);
  const [infoCount, setInfoCount] = React.useState(0);
  const [issuesCount, setIssuesCount] = React.useState(0);
  const [summaryType, setSummaryType] = React.useState('totalIssues');
  const [workflowIssuesCount, setWorkFlowIssuesCount] = React.useState<Map<string, number>>(new Map());

  React.useEffect(() => {
    let error = 0,
      warning = 0,
      info = 0;
    const wCount = new Map<string, number>();
    fileRecords?.forEach((file) => {
      file.auditrecords?.forEach((record) => {
        const level = record.auditinfo?.level;
        let bannerLevel: Issues = 'Info';
        if (level === 'Error' || level === 'Fatal') {
          error++;
          bannerLevel = 'Error';
        } else if (level === 'Warning' || level === 'Critical') {
          warning++;
          bannerLevel = 'Warning';
        } else if (level === 'Info') info++;

        if (
          context?.workflowMapping &&
          record.auditinfo?.category &&
          record.auditinfo.type &&
          Object.hasOwn(context.workflowMapping, record.auditinfo.category) &&
          Object.hasOwn(context.workflowMapping[record.auditinfo.category], record.auditinfo.type) &&
          context?.focusedIssues.some((issue) => bannerLevel === issue)
        ) {
          const workflows = context.workflowMapping[record.auditinfo.category][record.auditinfo.type];
          workflows.forEach((w) => {
            const currentCount = wCount.get(w);
            const count = currentCount ?? 0;
            wCount.set(w, count + 1);
          });
        }
      });
    });
    setWorkFlowIssuesCount(wCount);
    setErrorCount(error);
    setWarningCount(warning);
    setInfoCount(info);
    setIssuesCount(error + warning + info);
  }, [context?.focusedIssues, context?.workflowMapping, fileRecords]);

  const onClickIssue = React.useCallback(
    (issue: Issues) =>
      context?.setFocusedIssues((focusedIssues) =>
        focusedIssues.some((currentIssue) => issue === currentIssue)
          ? focusedIssues.filter((i) => i !== issue)
          : [...focusedIssues, issue]
      ),
    [context]
  );

  return (
    <Surface elevation={1} className='isr-banner-container'>
      <BannerTile icon={summaryType === 'totalIssues' ? <SvgFlag /> : <SvgHierarchyTree />}>
        <Text variant='title' style={{ fontWeight: 'bold' }}>
          {summaryType === 'totalIssues' ? issuesCount : workflowIssuesCount.size}
        </Text>
        <Select
          options={[
            { value: 'totalIssues', label: displayStrings.totalIssues },
            { value: 'workflows', label: displayStrings.workflows },
          ]}
          onChange={setSummaryType}
          value={summaryType}
          size='small'
        />
      </BannerTile>
      {summaryType === 'totalIssues' ? (
        <>
          <BannerTile
            onClick={() => onClickIssue('Error')}
            selected={context?.focusedIssues.some((p) => p === 'Error')}
            icon={<StatusIcon status='error' />}
          >
            <Text variant='title' style={{ fontWeight: 'bold' }}>
              {errorCount}
            </Text>
            <Text variant='small'>{displayStrings.errors}</Text>
          </BannerTile>
          <BannerTile
            onClick={() => onClickIssue('Warning')}
            selected={context?.focusedIssues.some((p) => p === 'Warning')}
            icon={<StatusIcon status='warning' />}
          >
            <Text variant='title' style={{ fontWeight: 'bold' }}>
              {warningCount}
            </Text>
            <Text variant='small'>{displayStrings.warnings}</Text>
          </BannerTile>
          <BannerTile
            onClick={() => onClickIssue('Info')}
            selected={context?.focusedIssues.some((p) => p === 'Info')}
            icon={<StatusIcon status='informational' />}
          >
            <Text variant='title' style={{ fontWeight: 'bold' }}>
              {infoCount}
            </Text>
            <Text variant='small'>{displayStrings.otherIssues}</Text>
          </BannerTile>
        </>
      ) : (
        Array.from(workflowIssuesCount.keys()).map((w) => (
          <BannerTile key={w}>
            <Text variant='title' style={{ fontWeight: 'bold' }}>
              {workflowIssuesCount.get(w)}
            </Text>
            <Text variant='small'>{w}</Text>
          </BannerTile>
        ))
      )}
    </Surface>
  );
};
