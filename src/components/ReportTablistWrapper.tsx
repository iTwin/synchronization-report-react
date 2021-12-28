import * as React from 'react';
import classnames from 'classnames';
import './ReportTablistWrapper.scss';

/**
 * `ReportTablistWrapper` is wrapper component for Tablist, ReportSearchbar and other user defined components to be placed over tables.
 *  It should be used as a child of `Report`.
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

// details table - auditInfo -> move filter up or move fn inline
// remove debug ids from report. +
// searchbar - errors and comments
// searchbar - placeholder +
// icon - import from file +
// wrapper - remove from folder +
// wrapperclassnames - tablist component or first child in wrapper (this choice). +
// searchstring comment improved
// color icon to grayish - iui-icons-color +
// sort to files table - different pr
