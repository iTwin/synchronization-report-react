import * as React from 'react';
import classNames from 'classnames';
import { LabeledInput } from '@itwin/itwinui-react';
import { ReportContext } from './Report';
import SvgSearch from '@itwin/itwinui-icons-react/esm/icons/Search';
import './ReportSearchbar.scss';

/**
 * `ReportSearchbar` is component for search input, which can be used to filter `Details` and `Files` tables
 */
export const ReportSearchbar = ({ className, ...rest }: { className?: string }) => {
  const context = React.useContext(ReportContext);

  if (!context) {
    throw new Error('ReportSearchbar must be used inside the Report component');
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
      svgIcon={<SvgSearch />}
      iconDisplayStyle='inline'
      {...rest}
    />
  );
};
