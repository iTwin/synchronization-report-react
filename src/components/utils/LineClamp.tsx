import * as React from 'react';
import classnames from 'classnames';
import { Button, Tooltip } from '@itwin/itwinui-react';
import './LineClamp.scss';
import SvgInfoCircular from '@itwin/itwinui-icons-react/esm/icons/InfoCircular';

export const LineClamp = ({
  children,
  className,
  overflowMode = 'hidden',
  lineCount = 2,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  overflowMode?: 'tooltip' | 'button' | 'hidden';
  lineCount?: number;
}) => {
  const [isButtonVisible, setIsButtonVisible] = React.useState(false);
  const [isOverflowing, setIsOverflowing] = React.useState(true);
  const Element = overflowMode === 'button' ? 'div' : React.Fragment;

  return (
    <Element>
      <span
        className={classnames('isr-line-clamp', className)}
        style={
          {
            display: isButtonVisible && !isOverflowing ? 'inline' : undefined,
            '--line-clamp': isOverflowing ? lineCount : undefined,
          } as React.CSSProperties
        }
        ref={(el) => {
          if (el) {
            setIsButtonVisible(overflowMode === 'button' && el.scrollHeight > el.offsetHeight);
            setIsOverflowing(el.scrollHeight > el.offsetHeight);
          }
        }}
        {...rest}
      >
        {children}
      </span>
      {isOverflowing && overflowMode === 'tooltip' && (
        <Tooltip content={children} appendTo={() => document.body}>
          <span tabIndex={0} className='isr-tooltip-icon'>
            <SvgInfoCircular />
          </span>
        </Tooltip>
      )}
      {isButtonVisible && (
        <Button
          className='isr-line-clamp-button'
          styleType='borderless'
          size='small'
          onClick={() => setIsOverflowing((overflowing) => !overflowing)}
        >
          {isOverflowing ? 'See more' : 'See less'}
        </Button>
      )}
    </Element>
  );
};
