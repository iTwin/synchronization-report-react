/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { AuditInfo, ReportData, SourceFile, WorkflowMapping } from './components/report-data-typings';

export const testMapping: WorkflowMapping = {
  MissingData: {
    Material: ['Workflow1', 'Workflow2'],
    ReferenceFile: ['Workflow3', 'Workflow4'],
  },
  VisualFidelity: {
    Level: ['Workflow5'],
  },
};

export const testReport = {
  context: {
    reportType: 'detailReport',
    operationType: 'NORMAL_UPDATE',
    jobid: '2559e4ea-76e5-41a5-9593-003491045c90',
    contextid: 'a038854f-aade-4d8a-bc7f-a0b57bd35a3c',
    imodelid: 'cb3896e7-1ca8-43a5-9bbb-4e1cc7e58fa0',
    activityid: 'fd32f29b-e8da-4712-adb7-ffc7923120b8',
    briefcaseid: '2',
    timestamp: '2021-04-13T14:06:12.892Z',
  },
  sourceFilesInfo: {
    itemType: 'File',
    dataSource: 'ProjectShare',
    path: 'https://projectshareweb.bentley.com/a038854f-aade-4d8a-bc7f-a0b57bd35a3c/a038854f-aade-4d8a-bc7f-a0b57bd35a3c/0c7c3266-ecc1-4c89-8fe5-34083703d445',
    fileId: '0c7c3266-ecc1-4c89-8fe5-34083703d445',
    fileName: 'House_Model.dgn',
    fileExists: true,
    Files: [
      {
        fileId: '',
        fileName: 'drawingseed.dgnlib',
        path: '',
        state: 'Missing',
        iModelFileId: '',
        fileExists: false,
        failureReason: '',
        bimFileExists: false,
      },
    ],
    bimFileExists: true,
  },
  filerecords: [
    {
      file: {
        identifier: '0c7c3266-ecc1-4c89-8fe5-34083703d445',
        path: 'a038854f-aade-4d8a-bc7f-a0b57bd35a3c/a038854f-aade-4d8a-bc7f-a0b57bd35a3c/0c7c3266-ecc1-4c89-8fe5-34083703d445',
        ignoredelements: [
          { ignoredelementinfo: { repositorylinkId: '2199023255553', elementsids: '511978,529166,531902' } },
        ],
      },
      auditrecords: [
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Fatal',
            category: 'MissingData',
            message: 'The file was not found - z:\\materials\\anisotropy\\anisotropy_crosshatched001.jpg',
            type: 'Material',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Error',
            category: 'MissingData',
            message: 'The file was not found - brick01_clean_g',
            type: 'Material',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Error',
            category: 'MissingData',
            message: 'The file was not found - concrete004_sketchy_g',
            type: 'Material',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Error',
            category: 'MissingData',
            message: 'The file was not found - tex03.jpg',
            type: 'Material',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Error',
            category: 'MissingData',
            message: 'The file was not found - wdfloor01_clean_g',
            type: 'Material',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Error',
            category: 'MissingData',
            message: 'The file was not found - border brescia_coral.jpg',
            type: 'Material',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Plan-First Floor (509007)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 1st] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Plan-Second Floor (508367)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Callouts] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [floor lamp] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-First Floor (509007)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Plan-First Floor (509007)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [light fixture] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-First Floor (509007)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 20] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-First Floor (509007)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 4] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-First Floor (509007)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 1] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-First Floor (509007)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 2] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-First Floor (509007)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Ceiling Light] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-First Floor (509007)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [pendant light fixture] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-First Floor (509007)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 1st] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [floor lamp] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Plan-Second Floor (508367)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [light fixture] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 20] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Callouts] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 4] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 1] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 2] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Ceiling Light] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [pendant light fixture] is turned on for some attachments but is turned off for [[House_Model.dgn, Plan-Second Floor (508367)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Plan-First Floor (509007)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Plan-Second Floor (508367)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Section-Back (509542)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Section-Left (509279)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Section-Wall (511247)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Section-Back (509542)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Section-Left (509279)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Section-Wall (511247)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [floor lamp] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Front (510566)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Elevation-Front (510566)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [light fixture] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Front (510566)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 20] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Front (510566)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 4] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Front (510566)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 1] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Front (510566)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 2] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Front (510566)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Ceiling Light] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Front (510566)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [pendant light fixture] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Front (510566)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [floor lamp] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Back (510622)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Elevation-Back (510622)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [light fixture] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Back (510622)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 20] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Back (510622)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 4] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Back (510622)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 1] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Back (510622)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 2] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Back (510622)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Ceiling Light] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Back (510622)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [pendant light fixture] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Back (510622)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [floor lamp] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Right (510733)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Elevation-Right (510733)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [light fixture] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Right (510733)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 20] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Right (510733)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 4] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Right (510733)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 1] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Right (510733)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 2] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Right (510733)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Ceiling Light] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Right (510733)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [pendant light fixture] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Right (510733)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [floor lamp] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Front (510566)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Elevation-Front (510566)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [light fixture] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Front (510566)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 20] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Front (510566)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [floor lamp] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Back (510622)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Elevation-Back (510622)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [light fixture] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Back (510622)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 20] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Back (510622)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [floor lamp] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Right (510733)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Elevation-Right (510733)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [light fixture] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Right (510733)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Level 20] is turned on for some attachments but is turned off for [[House_Model.dgn, Elevation-Right (510733)]]',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Elevation-Front (510566)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Elevation-Back (510622)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Info',
            category: 'VisualFidelity',
            message:
              'Level [Dry Wall 2nd] has a different definition in [[House_Model.dgn, Elevation-Right (510733)]] than in other files or attachments: color (14803425 vs. 4210752)',
            type: 'Level',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Error',
            category: 'MissingData',
            message: 'Reference model drawingseed.dgnlib is missing in Master model.',
            type: 'ReferenceFile',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Error',
            category: 'MissingData',
            message: 'Reference model drawingseed.dgnlib is missing in Master model.',
            type: 'ReferenceFile',
          },
        },
        {
          elementinfo: { ecinstanceid: '', sourceid: '' },
          auditinfo: {
            level: 'Error',
            category: 'MissingData',
            message: 'Reference model drawingseed.dgnlib is missing in Master model.',
            type: 'ReferenceFile',
          },
        },
      ],
    },
  ],
} as ReportData;

// EXTRA MOCK DATA
export const filesTableData = [
  {
    fileName: 'File 1.dgn',
    state: 'Failed',
    path: 'https://projectwisedocumentservice.bentley.com/pwdi-download?guid=bd8f1159-2bf0-4955-9cf2-c0caf3dd204e',
    fileId: 'bd8f1159-2bf0-4955-9cf2-c0caf3dd204e',
    dataSource: '{Datasource}',
  },
  {
    fileName: 'File 2.dgn',
    state: 'Processed',
    path: '{Path}',
    fileId: '{File ID}',
    dataSource: '{Datasource}',
  },
  {
    fileName: 'File 3.dgn',
    state: 'Processed',
    path: '{Path}',
    fileId: '{File ID}',
    dataSource: '{Datasource}',
  },
  {
    fileName: 'File 4.dgn',
    state: 'Processed',
    path: '{Path}',
    fileId: '{File ID}',
    dataSource: '{Datasource}',
  },
  {
    fileName: 'File 5.dgn',
    state: 'Processed',
    path: '{Path}',
    fileId: '{File ID}',
    dataSource: '{Datasource}',
  },
  {
    fileName: 'File 6.dgn',
    state: 'Processed',
    path: '{Path}',
    fileId: '{File ID}',
    dataSource: '{Datasource}',
  },
  {
    fileName: 'File 7.dgn',
    state: 'Processed',
    path: '{Path}',
    fileId: '{File ID}',
    dataSource: '{Datasource}',
  },
  {
    fileName: 'File 8.dgn',
    state: 'Processed',
    path: '{Path}',
    fileId: '{File ID}',
    dataSource: '{Datasource}',
  },
] as SourceFile[];
export const detailsTableData = [
  {
    fileName: '053-AKB-02-00-MM.i.dgn',
    level: 'Error',
    category: 'Inconsistent data',
    type: 'Duplicate model',
    message: 'Duplicate models found\nMaster Subject: SS_Pitch\nMissing Input File: pw://filepath',
    recommendedaction: 'Review models in the source',
  },
  {
    fileName: '053-AKB-02-00-MM.i.dgn',
    level: 'Critical',
    category: 'Business properties',
    type: 'EC Relationship Class',
    message: 'Could not find source and target ECInstances for relationship',
    recommendedaction: 'Review the incoming elements',
  },
  {
    fileName: '053-AKB-02-00-MM.i.dgn',
    level: 'Fatal',
    category: 'Missing data',
    type: 'Material',
    message: 'Duplicate models found\nMaster Subject: SS_Pitch\nMissing Input File: pw://filepath',
    recommendedaction: 'Review models in the source',
  },
  {
    fileName: '053-AKB-02-00-MM.i.dgn',
    level: 'Info',
    category: 'Visual fidelity',
    type: 'Material',
    message: 'Level [PS_SOLID] is turned on for some attachments but turned off for',
    recommendedaction: 'Review models in the source',
  },
  {
    fileName: '053-AKB-02-00-MM.i.dgn',
    level: 'Warning',
    category: '{Category}',
    type: '{Type}',
    message: '{Explanatory message}',
    recommendedaction: '{Action user can take to resolve the issue}',
  },
  {
    fileName: '053-AKB-02-00-MM.i.dgn',
    level: 'Error',
    category: 'Unsupported',
    type: 'Material',
    message: 'PBR materials not supported for texture file',
    recommendedaction: 'Review models in the source',
  },
] as AuditInfo[];
