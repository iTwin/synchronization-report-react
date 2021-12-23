import * as React from 'react';
import { IconButton, LabeledInput } from '@itwin/itwinui-react';
import { ReportContext } from './Report';
import { SvgSearch } from '@itwin/itwinui-icons-react';
import './ReportSearchbar.scss';
import classNames from 'classnames';
import { FileRecord } from './typings';

/**

 */
export const ReportSearchbar = ({
  className,
  ...rest
}: {
  fileRecords?: FileRecord[];
  setFileRecords?: () => void;
  className?: string;
}) => {
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
