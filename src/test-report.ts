/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { AuditInfo, ReportData, SourceFile, WorkflowMapping } from './components/report-data-typings';

export const testMapping: WorkflowMapping = {
  MissingData: {
    Material: ['Workflow1', 'Workflow2'],
    ReferenceFile: ['Workflow2', 'Workflow3', 'Workflow4'],
  },
  VisualFidelity: {
    Level: ['Workflow4', 'Workflow5'],
  },
};

export const testReport = {
  context: {
    reportType: 'detailReport',
    operationType: 'NORMAL_UPDATE',
    jobid: '21811fe3-7291-4b97-9501-54a5b7b1f1f8',
    contextid: '6b8ffd11-8234-40f9-a401-93da356d8a48',
    imodelid: '07fb67e3-476f-450a-a8e8-d243d6ac5f2e',
    activityid: '52f19a09-6a45-4c4b-bae6-7ba721b268c5',
    briefcaseid: '2',
    timestamp: '2026-07-14T06:30:19.680Z',
  },
  sourceFilesInfo: {
    itemType: 'MasterFile',
    dataSource: 'Dms Manifest',
    path: '',
    fileId: 'bd150b8f-4539-4d79-9212-cf6099170036',
    fileName: 'dwg2018_001.dwg',
    fileExists: true,
    Files: [],
    bimFileExists: true,
  },
  filerecords: [
    {
      file: {
        identifier: 'bd150b8f-4539-4d79-9212-cf6099170036',
        path: '',
      },
      auditrecords: [
        {
          elementinfo: {
            ecinstanceid: '',
            sourceid: '',
          },
          auditinfo: {
            level: 'Warning',
            issueid: 'Dwg_0176',
            category: 'Visual Fidelity',
            message: "Missing TrueType font 'Arial (arial.ttf)'. Some elements may not display properly.",
            type: 'Font',
          },
        },
      ],
    },
  ],
};

export const testReport2 = {
  context: {
    reportType: 'detailReport',
    operationType: 'NORMAL_UPDATE',
    jobid: '21811fe3-7291-4b97-9501-54a5b7b1f1f8',
    contextid: '6b8ffd11-8234-40f9-a401-93da356d8a48',
    imodelid: '07fb67e3-476f-450a-a8e8-d243d6ac5f2e',
    activityid: '9b6df77f-0e66-4c0a-99ac-ec6ff626045f',
    briefcaseid: '4',
    timestamp: '2026-07-14T06:31:40.958Z',
  },
  sourceFilesInfo: {
    itemType: 'MasterFile',
    dataSource: 'Dms Manifest',
    path: '',
    fileId: '7113558b-e152-4976-bb42-16a83c72590c',
    fileName: 'dwg2018_003_RENAMED.dwg',
    fileExists: true,
    Files: [],
    bimFileExists: true,
  },
  filerecords: [
    {
      file: {
        identifier: '7113558b-e152-4976-bb42-16a83c72590c',
        path: '',
      },
      auditrecords: [
        {
          elementinfo: {
            ecinstanceid: '',
            sourceid: '',
          },
          auditinfo: {
            level: 'Warning',
            issueid: 'Dwg_0176',
            category: 'Visual Fidelity',
            message: "Missing TrueType font 'Arial (arial.ttf)'. Some elements may not display properly.",
            type: 'Font',
          },
        },
      ],
    },
  ],
};
