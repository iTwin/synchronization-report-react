import * as React from 'react';
import { ReportContext } from './Report';
import { Text } from '@itwin/itwinui-react';

export type ReportTitleProps = {
  fileName?: string;
};

export const ReportTitle = (props: ReportTitleProps) => {
  const context = React.useContext(ReportContext);
  const fileName = React.useMemo(() => {
    return props.fileName || context?.reportData.sourceFilesInfo?.fileName;
  }, [context?.reportData.sourceFilesInfo?.fileName, props.fileName]);

  return <Text variant={'title'}>{'Synchronization Report | ' + fileName ?? 'unknown'}</Text>;
};
