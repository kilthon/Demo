import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';
import {
  themePreprocessorPlugin,
  themePreprocessorHmrPlugin,
} from '@zougt/vite-plugin-theme-preprocessor';

export default defineConfig({
  plugins: [
    vue(),
    themePreprocessorPlugin({
      less: {
        // 各个主题文件的位置
        multipleScopeVars: [
          {
            scopeName: 'theme-light',
            path: path.resolve('src/assets/css/theme/light.less'),
          },
          {
            scopeName: 'theme-dark',
            path: path.resolve('src/assets/css/theme/dark.less'),
          },
        ],
      },
    }),
    themePreprocessorHmrPlugin(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 9090,
    https: false,
    proxy: {
      '/api': {
        target: `http://localhost:9099/api`,
        changeOrigin: true,
        rewrite: (route) => route.replace(/^\/api/, ''),
      },
    },
  },
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
