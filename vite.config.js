import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: { preprocessorOptions: { css: { charset: false }, scss: { charset: false } } },
  build: {
    target: 'es2018',
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.tsx'),
      name: '@itwin/itwin-synchronization-report-ui',
    },
    rollupOptions: {
      external: ['react', '@itwin/itwinui-react', '@itwin/itwinui-css'],
      output: {
        globals: { react: 'React' },
      },
    },
  },
});
