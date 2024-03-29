import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from '@svgr/rollup';
import viteImagemin from 'vite-plugin-imagemin';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@page', replacement: path.resolve(__dirname, 'src/routes') },
      {
        find: '@compo',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@atom', replacement: path.resolve(__dirname, 'src/atoms') },
      { find: '@type', replacement: path.resolve(__dirname, 'src/types') },
      { find: '@const', replacement: path.resolve(__dirname, 'src/constants') },
      { find: '@hook', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@util', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@style', replacement: path.resolve(__dirname, 'src/styles') },
      {
        find: '@img',
        replacement: path.resolve(__dirname, 'src/assets/images'),
      },
    ],
  },
});
