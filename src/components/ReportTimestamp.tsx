import * as React from 'react';
import { ReportContext } from './Report';
import { Text } from '@itwin/itwinui-react';

const defaultDisplayStrings = {
  runCompleted: 'Run completed',
};

/**
 * `ReportTimestamp` simply displays a muted string containing the timestamp when the synchronization run was completed.
 * If used outside `Report`, `timestamp` will need to be specified manually.
 */
export const ReportTimestamp = ({
  timestamp,
  displayStrings: userDisplayStrings,
  ...rest
}: {
  timestamp?: string;
  displayStrings?: typeof defaultDisplayStrings;
  className?: string;
}) => {
  const context = React.useContext(ReportContext);

  if (!timestamp) {
    if (!context) {
      throw new Error('timestamp must be specified or ReportTimestamp must be used inside Report');
    }
    timestamp = context.reportData.context?.timestamp;
  }

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...userDisplayStrings }),
    [userDisplayStrings]
  );

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
    <Text variant='small' isMuted={true} {...rest}>
      {`${displayStrings.runCompleted}: ${date}`}
    </Text>
  );
};
