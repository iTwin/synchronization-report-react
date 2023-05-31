/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { LabeledSelect, SelectOption } from '@itwin/itwinui-react';
import { ReportContext, Tables } from './Report';

const defaultDisplayStrings = {
  files: 'Files',
  problems: 'Issues',
};

/**
 * `ReportTableSelect` shows the selection for different tables (only the table selection, not the panel content).
 * It should be used as a descendant of `Report`.
 *
 * Two `children` can be specified to show custom tab components.
 */
export const ReportTableSelect = ({
  displayStrings: userDisplayStrings,
  options,
  className,
  ...rest
}: {
  displayStrings?: Partial<typeof defaultDisplayStrings>;
  options?: SelectOption<Tables>[];
  className?: string;
}) => {
  const context = React.useContext(ReportContext);

  if (!context) {
    throw new Error('ReportTableSelect must be used inside the Report component');
  }

  const { currentTable, setCurrentTable } = context;

  const displayStrings = { ...defaultDisplayStrings, ...userDisplayStrings };

  return (
    <LabeledSelect
      label='Show by'
      displayStyle='inline'
      options={
        options ?? [
          { value: 'problems', label: displayStrings['problems'] },
          { value: 'files', label: displayStrings['files'] },
        ]
      }
      onChange={setCurrentTable}
      value={currentTable}
      className={className}
      {...rest}
    />
  );
};
