/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tooltip } from '@itwin/itwinui-react';
import SvgInfoCircular from '@itwin/itwinui-icons-react/esm/icons/InfoCircular';
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
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  return (
    <>
      <span
        className={classnames('isr-line-clamp', className)}
        ref={(el) => {
          if (el) {
            setIsOverflowing(el.scrollHeight > el.offsetHeight);
          }
        }}
        {...rest}
      >
        {children}
      </span>
      {isOverflowing && (
        <Tooltip content={children} appendTo={() => document.body}>
          <span aria-hidden className='isr-tooltip-icon'>
            <SvgInfoCircular />
          </span>
        </Tooltip>
      )}
    </>
  );
};
