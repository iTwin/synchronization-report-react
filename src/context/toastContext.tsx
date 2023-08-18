/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ProviderProps } from 'react';
import Toaster from '@itwin/itwinui-react/cjs/core/Toast/Toaster';
import { flushSync } from 'react-dom';

export interface IToastContext {
  toastSuccess: (message: string) => void;
  toastError: (message: string) => void;
  toastInformation: (message: string) => void;
}

interface ToastProviderProps extends Omit<ProviderProps<IToastContext>, 'value'> {
  toaster: Toaster;
}

export const ToastContext = React.createContext<IToastContext>({
  toastSuccess: () => {},
  toastError: () => {},
  toastInformation: () => {},
});

export const ToastContextProvider = (props: ToastProviderProps) => {
  const { toaster, ...rest } = props;

  const toastSuccess = async (message: string) => {
    flushSync(() => {
      toaster.closeAll();
    });
    toaster.positive(message, { type: 'temporary' });
  };
  const toastError = (message: string) => {
    flushSync(() => {
      toaster.closeAll();
    });
    toaster.negative(message, { type: 'temporary' });
  };
  const toastInformation = (message: string) => {
    flushSync(() => {
      toaster.closeAll();
    });
    toaster.informational(message, { type: 'temporary' });
  };

  return <ToastContext.Provider value={{ toastSuccess, toastError, toastInformation }} {...rest} />;
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context == null) {
    throw new Error('useToaster must be used inside provider');
  }
  return context;
};
