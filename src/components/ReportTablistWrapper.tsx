/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import './ReportTablistWrapper.scss';

/**
 * `ReportTablistWrapper` is wrapper component for Tablist, ReportSearchbar and other user defined components to be placed over tables.
 */
export const ReportTablistWrapper = ({
  children,
  className,
  ...rest
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={classnames('isr-tablist-wrapper', className)} {...rest}>
      {children}
    </div>
  );
};
