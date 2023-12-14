import { ApplicationInsights, ITelemetryItem } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

interface ApplicationInsightProps {
  connectionString: string;
  customEventProperties?: {};
  customEventName: string;
}

export const ApplicationInsightService = (props: ApplicationInsightProps) => {
  const { connectionString, customEventName, customEventProperties } = props;

  const reactPlugin = new ReactPlugin();
  if (connectionString) {
    const appInsights = new ApplicationInsights({
      config: {
        connectionString: connectionString,
        extensions: [reactPlugin],
      },
    });

    appInsights.loadAppInsights();

    if (props.customEventProperties) {
      appInsights.trackEvent({ name: customEventName }, customEventProperties);
      appInsights.flush();
    }
  }
};
