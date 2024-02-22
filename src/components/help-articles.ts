/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const SyncWikiBaseUrl =
  'https://communities.bentley.com/products/digital-twin-cloud-services/itwin-services/w/synchronization-wiki';

// map of errors with help articles along with their URL
const helpArticles: { [issueId: string]: string } = {
  Dgn_0000: `${SyncWikiBaseUrl}/68291/missing-data#Dgn_0000`,
  Dgn_0066: `${SyncWikiBaseUrl}/68292/inconsistent-data#Dgn_0066`,
  Dgn_0199: `${SyncWikiBaseUrl}/68292/inconsistent-data#dgn_0199`,
  Dgn_0205: `${SyncWikiBaseUrl}/68077/itwin-extents#OutlierElements`,
  Dgn_0214: `${SyncWikiBaseUrl}/68291/missing-data#Dgn_0214`,
  Dgn_0215: `${SyncWikiBaseUrl}/68077/imodel-display-extents#DgnV8_0191`,
  Dgn_0060: `${SyncWikiBaseUrl}/69204/synchronization-category/#Dgn_0060`,
  DgnV8_0132: `${SyncWikiBaseUrl}/68291/missing-data#Dgn_0214`,
  DgnV8_0191: `${SyncWikiBaseUrl}/68077/imodel-display-extents#DgnV8_0191`,
  DgnV8_0164: `${SyncWikiBaseUrl}/69223/business-properties/#DgnV8_0164`,
  DgnV8_0142: `${SyncWikiBaseUrl}/68292/inconsistent-data#Dgn_0066`,
  DgnV8_0141: `${SyncWikiBaseUrl}/68292/inconsistent-data#Dgn_0066`,
  DgnV8_0133: `${SyncWikiBaseUrl}/68291/missing-data#DgnV8_0133`,
  DgnV8_0068: `${SyncWikiBaseUrl}/68291/missing-data/#DgnV8_0068`,
  Dwg_0203: `${SyncWikiBaseUrl}/68522/data-access#Dwg_0203`,
  Dwg_0199: `${SyncWikiBaseUrl}/68521/unexpected-data#Dwg_0199`,
  Revit_0002: `${SyncWikiBaseUrl}/68291/missing-data#Revit0002`,
  Revit_0025: `${SyncWikiBaseUrl}/68291/missing-data#Revit0025`,
  Revit_0021: `${SyncWikiBaseUrl}/68077/imodel-display-extents#Revit_0021`,
  Revit_0031: `${SyncWikiBaseUrl}/69156/unsupported/#Revit_0031`,
  ifc_0020: `${SyncWikiBaseUrl}/68292/inconsistent-data#ifc_0020`,
  Ifc_0021: `${SyncWikiBaseUrl}/68292/inconsistent-data#ifc_0020`,
  Ifc_0048: `${SyncWikiBaseUrl}/68292/inconsistent-data/#Ifc_0048`,
  SPPID_0001: `${SyncWikiBaseUrl}/68521/unexpected-data/#SPPID_0001`,
  SPPID_0002: `${SyncWikiBaseUrl}/68521/unexpected-data/#SPPID_0002`,
  Dgn_0188: `${SyncWikiBaseUrl}/68291/missing-data/#Dgn_0188`,
  Dwg_0162: `${SyncWikiBaseUrl}/68522/data-access#Dwg_0162`,
  Civil_0004: `${SyncWikiBaseUrl}/68291/missing-data/#Civil_0004`,
  Civil_0010: `${SyncWikiBaseUrl}/68291/missing-data/#Civil_0010`,
  DgnV8_0046: `${SyncWikiBaseUrl}/68291/missing-data/#DgnV8_0046`,
  DgnV8_0057: `${SyncWikiBaseUrl}/69202/visual-fidelity/#DgnV8_0057`,
  DgnV8_0000: `${SyncWikiBaseUrl}/68077/imodel-display-extents/#DgnV8_0000`,
  Dwg_0163: `${SyncWikiBaseUrl}/68522/data-access/#Dwg_0163`,
  Ifc_0027: `${SyncWikiBaseUrl}/68291/missing-data/#Ifc_0027`,
  Civil_0002: `${SyncWikiBaseUrl}/69204/synchronization-category/#Civil_0002`,
  Dgn_0200: `${SyncWikiBaseUrl}/68077/imodel-display-extents/#Dgn_0200`,
  DgnV8_0005: `${SyncWikiBaseUrl}/69202/visual-fidelity/#DgnV8_0005`,
  DgnV8_0044: `${SyncWikiBaseUrl}/69202/visual-fidelity/#DgnV8_0044`,
  DgnV8_0126: `${SyncWikiBaseUrl}/68291/missing-data/#DgnV8_0126`,
  Dwg_0103: `${SyncWikiBaseUrl}/68291/missing-data/#Dwg_0103`,
  EC_0001: `${SyncWikiBaseUrl}/69223/business-properties/#EC_0001`,
  DgnV8_0030: `${SyncWikiBaseUrl}/69156/unsupported/#DgnV8_0030`,
  Ifc_0010: `${SyncWikiBaseUrl}/68077/imodel-display-extents/#Ifc_0010`,
  Ifc_0034: `${SyncWikiBaseUrl}/68291/missing-data/#Ifc_0034`,
  Revit_0014: `${SyncWikiBaseUrl}/68521/unexpected-data/#Revit_0014`,
  Revit_0016: `${SyncWikiBaseUrl}/68521/unexpected-data/#Revit_0014`,
  Revit_0030: `${SyncWikiBaseUrl}/69223/business-properties/#Revit_0030`,
  Revit_0023: `${SyncWikiBaseUrl}/68077/imodel-display-extents/#Revit_0023`,
  DgnV8_0158: `${SyncWikiBaseUrl}/69223/business-properties/#DgnV8_0158`,
  Nwd_0010: `${SyncWikiBaseUrl}/69156/unsupported/#Nwd_0010`,
  Dgn_0022: `${SyncWikiBaseUrl}/69202/visual-fidelity/#DGN_0022`,
  SPx_0002: `${SyncWikiBaseUrl}/68077/imodel-display-extents/#SPx_0002`,
  Dwg_0089: `${SyncWikiBaseUrl}/69202/visual-fidelity/#Dwg_0089`,
  SPPID_0015: `${SyncWikiBaseUrl}/70516/corrupt-data/#SPPID_0015`,
  Ifc_0042: `${SyncWikiBaseUrl}/68292/inconsistent-data/#Ifc_0042`,
  Ifc_0038: `${SyncWikiBaseUrl}/68291/missing-data/#Ifc_0038`,
  C3d_0022: `${SyncWikiBaseUrl}/69204/synchronization-category/#C3d_0022`,
  NWD_0012: `${SyncWikiBaseUrl}/68291/missing-data/#NWD_0012`,
  Civil_0003: `${SyncWikiBaseUrl}/68291/missing-data/#Civil_0003`,
  DgnV8_01344: `${SyncWikiBaseUrl}/68521/unexpected-data/#DgnV8_01344`,
};

export function hasHelpArticle(issueId: string | undefined): boolean {
  if (!issueId) return false;
  return helpArticles[issueId] !== undefined;
}

export function getHelpArticleUrl(issueId: string): string {
  return helpArticles[issueId];
}
