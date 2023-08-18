/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import copy from 'copy-text-to-clipboard';
import { useToast } from '../context/toastContext';
import { IconButton, Tooltip } from '@itwin/itwinui-react';
import { SvgCopy } from '@itwin/itwinui-icons-react/cjs';

export const CopyToClipboardButton = (props: {
  value: string;
  options?: {
    errorMessage?: string;
    successMessage?: string;
    tooltipText?: string;
  };
}) => {
  const { value, options } = props;
  const { toastError, toastSuccess } = useToast();

  const errorMessage = options?.errorMessage ?? 'Failed to copy text to clipboard.';

  const successMessage = options?.successMessage ?? 'ID copied to clipboard.';

  const tooltipText = options?.tooltipText ?? 'Copy to clipboard';

  const copyToClipboard = () => {
    const copyToClipboardSuccessful = copy(value);
    if (!copyToClipboardSuccessful) {
      toastError(errorMessage);
      return;
    }
    toastSuccess(successMessage);
  };

  return (
    <Tooltip content={tooltipText}>
      <IconButton
        onClick={() => {
          copyToClipboard();
        }}
        data-testid='copy-to-clipboard-button'
      >
        <SvgCopy />
      </IconButton>
    </Tooltip>
  );
};
