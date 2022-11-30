/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import './ReportTitleWrapper.scss';

/**
 * `ReportTitleWrapper` is wrapper component for ReportTitle, ReportDebugIds and other components in the title section.
 */
export const ReportTitleWrapper = ({
  children,
  className,
  ...rest
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={classnames('isr-report-title-wrapper', className)} {...rest}>
      {children}
    </div>
  );
};
