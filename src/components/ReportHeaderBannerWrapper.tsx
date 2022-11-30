/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import './ReportHeaderBannerWrapper.scss';

/**
 * `ReportHeaderBannerWrapper` is wrapper component for ReportTimestamp, ReportBanner and other components in the header.
 */
export const ReportHeaderBannerWrapper = ({
  children,
  className,
  ...rest
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={classnames('isr-report-header-banner', className)} {...rest}>
      {children}
    </div>
  );
};
