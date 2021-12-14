import * as React from 'react';
import { ReportContext } from './Report';
import { Text } from '@itwin/itwinui-react';

export type ReportTimestampProps = {
  timestamp?: string;
};

export const ReportTimestamp = (props: ReportTimestampProps) => {
  const context = React.useContext(ReportContext);
  const timestamp = React.useMemo(() => {
    return props.timestamp || context?.reportData.context?.timestamp;
  }, [context?.reportData.context?.timestamp, props.timestamp]);

  const [date, setDate] = React.useState<string>('');
  React.useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    setDate(timestamp ? new Date(timestamp).toLocaleDateString(undefined, options) : '');
  }, [timestamp]);

  return (
    <Text variant='small' isMuted={true}>
      {'Run Completed: ' + date}
    </Text>
  );
};
