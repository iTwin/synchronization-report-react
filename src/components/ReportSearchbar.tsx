import * as React from 'react';
import { IconButton, LabeledInput } from '@itwin/itwinui-react';
import { SvgSearch } from '@itwin/itwinui-icons-react';
import './ReportSearchbar.scss';
import classNames from 'classnames';

/**
 * `ReportTablistWrapper` shows the files and details tabs (only the tab selectors, not the panel content).
 * It should be used as a child of `Report`.
 *
 * Two `children` can be specified to show custom tab components.
 */
export const ReportSearchbar = ({ className, ...rest }: { className?: string }) => {
  return (
    <LabeledInput
      className={classNames('isr-searchbar', className)}
      svgIcon={
        <IconButton styleType='borderless'>
          <SvgSearch />
        </IconButton>
      }
      iconDisplayStyle='inline'
      {...rest}
    />
  );
};
