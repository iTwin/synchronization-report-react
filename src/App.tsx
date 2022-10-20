/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { IconButton, Tooltip, useTheme } from '@itwin/itwinui-react';
import { useMediaQuery } from 'beautiful-react-hooks';
import { SvgSun, SvgMoon } from '@itwin/itwinui-icons-react';
import { Report } from './components/Report';
import reportData from './sampleReport.json';
import './App.scss';
import { testSchema } from './components/Types';

const Main = () => {
  return (
    <>
      <Report data={reportData} workflowMapping={testSchema} />
    </>
  );
};

export const App = () => {
  const [isDark, setIsDark] = React.useState(useMediaQuery('(prefers-color-scheme: dark)'));
  useTheme(isDark ? 'dark' : 'light');

  return (
    <div className='App'>
      <Tooltip content={`Switch to ${isDark ? 'light' : 'dark'} theme`} placement='left'>
        <IconButton className='App-theme-icon' styleType='borderless' onClick={() => setIsDark((dark) => !dark)}>
          {isDark ? <SvgSun /> : <SvgMoon />}
        </IconButton>
      </Tooltip>
      <main className='App-content'>
        <Main></Main>
      </main>
    </div>
  );
};

export default App;
