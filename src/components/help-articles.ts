/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const SyncWikiBaseUrl =
  'https://communities.bentley.com/products/digital-twin-cloud-services/itwin-services/w/synchronization-wiki';

const NewKBArticleBaseUrl = 'https://bentleysystems.service-now.com/community?id=kb_article_view&sysparm_article=';

// map of errors with help articles along with their URL
const helpArticles: { [issueId: string]: string } = {
  C3d_0022: `${NewKBArticleBaseUrl}KB0098355#C3d_0022`,
  Civil_0004: `${NewKBArticleBaseUrl}KB0098314#Civil_0004`,
  Civil_0010: `${NewKBArticleBaseUrl}KB0098314#Civil_0010`,
  Civil_0002: `${NewKBArticleBaseUrl}KB0098355#Civil_0002`,
  Civil_0003: `${NewKBArticleBaseUrl}KB0098314#Civil_0003`,
  Dgn_0000: `${NewKBArticleBaseUrl}KB0098314#Dgn_0000`,
  Dgn_0203: `${NewKBArticleBaseUrl}KB0098322#Dgn_0203`,
  Dgn_0204: `${NewKBArticleBaseUrl}KB0098322#Dgn_0204`,
  Dgn_0066: `${NewKBArticleBaseUrl}KB0098331#Dgn_0066`,
  Dgn_0199: `${NewKBArticleBaseUrl}KB0098331#dgn_0199`,
  Dgn_0205: `${NewKBArticleBaseUrl}KB0098322#Dgn_0205`,
  Dgn_0214: `${NewKBArticleBaseUrl}KB0098314#Dgn_0214`,
  Dgn_0215: `${NewKBArticleBaseUrl}KB0098322#Dgn_0215`,
  Dgn_0060: `${NewKBArticleBaseUrl}KB0098355#Dgn_0060`,
  Dgn_0022: `${SyncWikiBaseUrl}/69202/visual-fidelity/#DGN_0022`,
  Dgn_0188: `${NewKBArticleBaseUrl}KB0098314#Dgn_0188`,
  Dgn_0200: `${NewKBArticleBaseUrl}KB0098322#Dgn_0200`,
  DgnV8_0005: `${NewKBArticleBaseUrl}KB0098329#DgnV8_0005`,
  DgnV8_0044: `${NewKBArticleBaseUrl}KB0098329#DgnV8_0044`,
  DgnV8_0126: `${NewKBArticleBaseUrl}KB0098314#DgnV8_0126`,
  DgnV8_0132: `${NewKBArticleBaseUrl}KB0098314#Dgn_0214`,
  DgnV8_0191: `${NewKBArticleBaseUrl}KB0098322#DgnV8_0191`,
  DgnV8_0164: `${NewKBArticleBaseUrl}KB0098327#DgnV8_0164`,
  DgnV8_0142: `${NewKBArticleBaseUrl}KB0098331#Dgn_0066`,
  DgnV8_0141: `${NewKBArticleBaseUrl}KB0098331#Dgn_0066`,
  DgnV8_0133: `${NewKBArticleBaseUrl}KB0098314#DgnV8_0133`,
  DgnV8_0068: `${NewKBArticleBaseUrl}KB0098314#DgnV8_0068`,
  DgnV8_0046: `${NewKBArticleBaseUrl}KB0098314#DgnV8_0046`,
  DgnV8_0057: `${NewKBArticleBaseUrl}KB0098329#DgnV8_0057`,
  DgnV8_0000: `${NewKBArticleBaseUrl}KB0098322#DgnV8_0000`,
  DgnV8_0030: `${NewKBArticleBaseUrl}KB0098325#DgnV8_0030`,
  DgnV8_0158: `${NewKBArticleBaseUrl}KB0098327#DgnV8_0158`,
  DgnV8_01344: `${NewKBArticleBaseUrl}KB0098320#DgnV8_01344`,
  Dwg_0203: `${NewKBArticleBaseUrl}KB0098356#Dwg_0203`,
  Dwg_0103: `${NewKBArticleBaseUrl}KB0098314#Dwg_0103`,
  Dwg_0199: `${NewKBArticleBaseUrl}KB0098320#Dwg_0199`,
  Dwg_0163: `${NewKBArticleBaseUrl}KB0098356#Dwg_0163`,
  Dwg_0162: `${NewKBArticleBaseUrl}KB0098356#Dwg_0162`,
  Dwg_0089: `${NewKBArticleBaseUrl}KB0098329#Dwg_0089`,
  EC_0001: `${NewKBArticleBaseUrl}KB0098327#EC_0001`,
  ifc_0020: `${NewKBArticleBaseUrl}KB0098331#ifc_0020`,
  Ifc_0021: `${NewKBArticleBaseUrl}KB0098331#ifc_0020`,
  Ifc_0048: `${NewKBArticleBaseUrl}KB0098331#Ifc_0048`,
  Ifc_0027: `${NewKBArticleBaseUrl}KB0098314#Ifc_0027`,
  Ifc_0010: `${NewKBArticleBaseUrl}KB0098322#Ifc_0010`,
  Ifc_0034: `${NewKBArticleBaseUrl}KB0098314#Ifc_0034`,
  Ifc_0042: `${NewKBArticleBaseUrl}KB0098331#Ifc_0042`,
  Ifc_0038: `${NewKBArticleBaseUrl}KB0098314#Ifc_0038`,
  Nwd_0010: `${NewKBArticleBaseUrl}KB0098325#Nwd_0010`,
  NWD_0012: `${NewKBArticleBaseUrl}KB0098314#NWD_0012`,
  Revit_0002: `${NewKBArticleBaseUrl}KB0098314#Revit0002`,
  Revit_0025: `${NewKBArticleBaseUrl}KB0098314#Revit0025`,
  Revit_0021: `${NewKBArticleBaseUrl}KB0098322#Revit_0021`,
  Revit_0031: `${NewKBArticleBaseUrl}KB0098325#Revit_0031`,
  Revit_0014: `${NewKBArticleBaseUrl}KB0098320#Revit_0014`,
  Revit_0016: `${NewKBArticleBaseUrl}KB0098322#Revit_0016`,
  Revit_0030: `${NewKBArticleBaseUrl}KB0098327#Revit_0030`,
  Revit_0023: `${NewKBArticleBaseUrl}KB0098322#Revit_0023`,
  SPPID_0001: `${NewKBArticleBaseUrl}KB0098320#SPPID_0001`,
  SPPID_0002: `${NewKBArticleBaseUrl}KB0098320#SPPID_0002`,
  SPx_0002: `${NewKBArticleBaseUrl}KB0098322#SPx_0002`,
  SPPID_0015: `${NewKBArticleBaseUrl}KB0098350#SPPID_0015`,
};

export function hasHelpArticle(issueId: string | undefined): boolean {
  if (!issueId) return false;
  return helpArticles[issueId] !== undefined;
}

export function getHelpArticleUrl(issueId: string): string {
  return helpArticles[issueId];
}
