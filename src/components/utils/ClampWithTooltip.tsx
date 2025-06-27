/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tooltip } from '@itwin/itwinui-react';
import './ClampWithTooltip.scss';
import classnames from 'classnames';

export const ClampWithTooltip = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Tooltip content={children}>
      <span className={classnames('isr-line-clamp', className)} {...rest}>
        {children}
      </span>
    </Tooltip>
  );
};
