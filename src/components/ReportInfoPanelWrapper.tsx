/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InformationPanelWrapper } from '@itwin/itwinui-react';
import classnames from 'classnames';
import './ReportInfoPanelWrapper.scss';

export const ReportInfoPanelWrapper = ({
  className,
  children,
  ...rest
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <InformationPanelWrapper className={classnames('isr-info-panel-wrapper', className)} {...rest}>
    {children}
  </InformationPanelWrapper>
);
