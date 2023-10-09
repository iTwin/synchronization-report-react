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
  // "Dgn_0215": ``,
  Dwg_0203: `${SyncWikiBaseUrl}/68522/data-access#Dwg_0203`,
  Dwg_0199: `${SyncWikiBaseUrl}/68521/unexpected-data#Dwg_0199`,
  Revit_0002: `${SyncWikiBaseUrl}/68291/missing-data#Revit0002`,
  Revit_0025: `${SyncWikiBaseUrl}/68291/missing-data#Revit0025`,
};

export function hasHelpArticle(issueId: string | undefined): boolean {
  if (!issueId) return false;
  return helpArticles[issueId] !== undefined;
}

export function getHelpArticleUrl(issueId: string): string {
  return helpArticles[issueId];
}
