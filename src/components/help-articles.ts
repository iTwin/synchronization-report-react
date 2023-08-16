/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const helpArticleBaseUrl =
  'https://communities.bentley.com/products/digital-twin-cloud-services/itwin-services/w/synchronization-wiki/68150/synchronization-report-knowledge-base';

// list of errors that contain a help article
const helpArticleErrors = [
  'Dgn_0000',
  'Dgn_0066',
  'Dgn_0199',
  'Dgn_0205',
  'Dgn_0214',
  'Dgn_0215',
  'Revit_0002',
  'Revit_0025',
];

export function hasHelpArticle(errorId: string | undefined): boolean {
  if (!errorId) return false;
  return helpArticleErrors.includes(errorId);
}

export function getHelpArticleUrl(errorId: string): string {
  return `${helpArticleBaseUrl}#${errorId}`;
}
