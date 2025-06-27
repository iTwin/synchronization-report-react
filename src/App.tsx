/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { IconButton, Tooltip, ThemeProvider } from '@itwin/itwinui-react';
import { useMediaQuery } from 'beautiful-react-hooks';
import { SvgSun, SvgMoon } from '@itwin/itwinui-icons-react';
import { Report } from './components/Report';
import { testReport } from './test-report';
import '@itwin/itwinui-react/styles.css';
import './App.scss';

const Main = () => <Report data={testReport} />;

export const App = () => {
  const [isDark, setIsDark] = React.useState(useMediaQuery('(prefers-color-scheme: dark)'));

  return (
    <ThemeProvider theme={isDark ? 'dark' : 'light'}>
      <div className='App'>
        <Tooltip content={`Switch to ${isDark ? 'light' : 'dark'} theme`} placement='left'>
          <IconButton className='App-theme-icon' styleType='borderless' onClick={() => setIsDark((dark) => !dark)}>
            {isDark ? <SvgSun /> : <SvgMoon />}
          </IconButton>
        </Tooltip>
        <main className='App-content'>
          <Main />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
