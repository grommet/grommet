import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    viteStaticCopy({
      targets: [
        { src: 'README.md', dest: '.' },
        { src: 'package.json', dest: '.' },
        { src: 'tools/**/*', dest: 'tools' },
      ],
    }),
  ],
  build: {
    sourcemap: 'hidden',
    emptyOutDir: true,
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/js/index.js'),
      name: 'Grommet',
      formats: ['umd'],
      fileName: () => 'grommet.min.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
    },
  },
});
