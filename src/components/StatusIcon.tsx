import * as React from 'react';
import classnames from 'classnames';
import SvgStatusSuccess from '@itwin/itwinui-icons-react/esm/icons/StatusSuccess';
import SvgStatusError from '@itwin/itwinui-icons-react/esm/icons/StatusError';
import SvgStatusWarning from '@itwin/itwinui-icons-react/esm/icons/StatusWarning';
import SvgInfoCircular from '@itwin/itwinui-icons-react/esm/icons/InfoCircular';
import './StatusIcon.scss';

const StatusIconMap = {
  success: SvgStatusSuccess,
  error: SvgStatusError,
  warning: SvgStatusWarning,
  informational: SvgInfoCircular,
} as const;

export const StatusIcon = ({
  status,
  ...args
}: { status: keyof typeof StatusIconMap } & React.ComponentPropsWithoutRef<'svg'>) => {
  const Element = StatusIconMap[status];
  return <Element {...args} className={classnames('isr-status-icon', `isr-status-icon-${status}`, args.className)} />;
};
