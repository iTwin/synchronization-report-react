import * as React from 'react';
import classnames from 'classnames';
import './ReportTablistWrapper.scss';

const defaultDisplayStrings = {
  files: 'Files',
  details: 'Details',
};

/**
 * `ReportTablistWrapper` shows the files and details tabs (only the tab selectors, not the panel content).
 * It should be used as a child of `Report`.
 *
 * Two `children` can be specified to show custom tab components.
 */
export const TablistLeftside = ({
  children,
  className,
  ...rest
}: {
  displayStrings?: typeof defaultDisplayStrings;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={classnames('isr-tablist-wrapper-left', className)} {...rest}>
      {children}
    </div>
  );
};
