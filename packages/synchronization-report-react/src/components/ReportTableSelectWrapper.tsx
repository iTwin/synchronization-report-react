/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import classnames from 'classnames';
import './ReportTableSelectWrapper.scss';

/**
 * `ReportTableSelectWrapper` is wrapper component for Table selection.
 */
export const ReportTableSelectWrapper = ({
  children,
  className,
  ...rest
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={classnames('isr-table-select-wrapper', className)} {...rest}>
      {children}
    </div>
  );
};
