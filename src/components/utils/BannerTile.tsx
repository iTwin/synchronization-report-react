/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import classNames from 'classnames';
import * as React from 'react';
import './BannerTile.scss';

export type BannerTileProps = {
  icon?: React.ReactNode;
  children: [React.ReactNode, React.ReactNode];
  selected?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export const BannerTile = (props: BannerTileProps) => {
  const { icon, children, selected, className, ...rest } = props;
  return (
    <div
      {...rest}
      className={classNames(
        'isr-banner-tile-item',
        {
          'isr-banner-tile-item-selected': selected,
          'isr-banner-tile-item-on-click': !!rest.onClick,
        },
        className
      )}
    >
      {icon && <div className='isr-banner-tile-icon'>{icon}</div>}
      <span className='isr-banner-tile-body'>{children[0]}</span>
      <span className='isr-banner-tile-footer'>{children[1]}</span>
    </div>
  );
};
