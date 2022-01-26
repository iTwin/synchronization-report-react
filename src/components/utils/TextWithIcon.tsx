/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import './TextWithIcon.scss';
import classnames from 'classnames';

export const TextWithIcon = ({
  icon,
  children,
  className,
  ...rest
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={classnames('isr-text-with-icon', className)} {...rest}>
      {icon && <span className='isr-icon'>{icon}</span>}
      {children}
    </div>
  );
};
