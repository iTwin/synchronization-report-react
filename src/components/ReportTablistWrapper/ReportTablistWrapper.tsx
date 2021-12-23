import * as React from 'react';
import classnames from 'classnames';
import './ReportTablistWrapper.scss';

/**
 * `ReportTablistWrapper` is wrapper component for Tablist, ReportSearchbar and other user defined components to be placed over tables.
 *  It should be used as a child of `Report`.
 *
 * `children` should be specified to add inner components
 */
export const ReportTablistWrapper = ({
  children,
  className,
  ...rest
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={classnames('isr-tablist-wrapper', className)} {...rest}>
      {children}
    </div>
  );
};