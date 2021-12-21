import * as React from 'react';
import { ReportContext } from './Report';
import { Text } from '@itwin/itwinui-react';

const defaultDisplayStrings = {
  synchronizationReport: 'Synchronization Report',
};

export type ReportTitleProps = {
  fileName?: string;
  userDisplayStrings?: typeof defaultDisplayStrings;
};

export const ReportTitle = (props: ReportTitleProps) => {
  const context = React.useContext(ReportContext);
  const fileName = React.useMemo(() => {
    return props.fileName || context?.reportData.sourceFilesInfo?.fileName;
  }, [context?.reportData.sourceFilesInfo?.fileName, props.fileName]);

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...props.userDisplayStrings }),
    [props.userDisplayStrings]
  );

  return <Text variant={'title'}>{`${displayStrings.synchronizationReport} | ${fileName ?? 'unknown'}`}</Text>;
};
