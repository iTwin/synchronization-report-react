/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

export class ApplicationInsightService {
  private appInsight: ApplicationInsights;
  constructor(connectionString?: string, instrumentationKey?: string) {
    const reactPlugin = new ReactPlugin();
    this.appInsight = new ApplicationInsights({
      config: {
        connectionString: connectionString,
        instrumentationKey: instrumentationKey,
        extensions: [reactPlugin],
        maxBatchInterval: 0,
        isStorageUseDisabled: true,
      },
    });
    this.appInsight.loadAppInsights();
  }

  trackCustomEvent(customEventName: string, customEventProperties?: Record<string, unknown>) {
    this.appInsight.trackEvent({ name: customEventName }, customEventProperties);
  }

  flushEvent() {
    this.appInsight.flush();
  }
}
