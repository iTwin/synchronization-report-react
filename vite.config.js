/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // svgr options
      },
    }),
  ],
  css: { preprocessorOptions: { css: { charset: false }, scss: { charset: false } } },
  build: {
    target: 'es2020',
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.tsx'),
      name: '@itwin/synchronization-report-react',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@itwin/itwinui-react', 'react-table', 'classnames'],
      output: {
        globals: { react: 'React' },
      },
    },
  },
});
