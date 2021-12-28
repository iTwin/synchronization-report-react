import * as React from 'react';
import { IconButton, LabeledInput } from '@itwin/itwinui-react';
import { ReportContext } from './Report';
import SvgSearch from '@itwin/itwinui-icons-react/esm/icons/Search';
import './ReportSearchbar.scss';
import classNames from 'classnames';

/**
 * `ReportSearchbar` is component for search input. It sets searchString which later can be used to filter tables.
 *
 *  It should be used as a child of `ReportTablistWrapper`.
 */
export const ReportSearchbar = ({ className, ...rest }: { className?: string }) => {
  const context = React.useContext(ReportContext);

  if (!context) {
    throw new Error('ReportTabs must be used inside the Report component');
  }

  const { setSearchString } = context;

  const searchStringHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  return (
    <LabeledInput
      onChange={(e) => searchStringHandler(e)}
      className={classNames('isr-searchbar', className)}
      placeholder='Search'
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
