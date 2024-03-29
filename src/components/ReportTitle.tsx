/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ReportContext } from './Report';
import { Text } from '@itwin/itwinui-react';

const defaultDisplayStrings = {
  synchronizationReport: 'Synchronization Report',
  unknown: 'unknown',
};

/**
 * `ReportTitle` simply displays a title containing the name of the main file (inferred from `Report`).
 * If used outside `Report` (e.g. passed as modal title), `fileName` will need to be specified manually.
 */
export const ReportTitle = ({
  fileName,
  displayStrings: userDisplayStrings,
  ...rest
}: {
  fileName?: string;
  displayStrings?: Partial<typeof defaultDisplayStrings>;
  className?: string;
}) => {
  const context = React.useContext(ReportContext);

  if (!fileName) {
    if (!context) {
      throw new Error('fileName must be specified or ReportTitle must be used inside Report');
    }
    fileName = context.reportData.sourceFilesInfo?.fileName;
  }

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...userDisplayStrings }),
    [userDisplayStrings]
  );

  return (
    <Text variant={'title'} {...rest}>
      {`${fileName ?? defaultDisplayStrings.unknown} - ${displayStrings.synchronizationReport}`}
    </Text>
  );
};
