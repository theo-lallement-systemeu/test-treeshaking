/// <reference types="vitest" />

import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
// Use Options API in script setup (https://github.com/sxzz/unplugin-vue-define-options)
import DefineOptions from 'unplugin-vue-define-options/vite';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    dts({
      include: ['src/**/*'],
    }),
    svgLoader(),
  ],
  publicDir: false,
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystemU',
      fileName: (format) => `design-system-u.${format}.js`,
      formats: ['es'],
    },
    emptyOutDir: false, // to retain the types folder generated by tsc
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'vue3-pdf-app'],
      output: {
        // disable warning on src/index.ts using both default and named export
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tools/tests/setup.ts',
    coverage: {
      reporter: 'lcov',
    },
    server: {
      deps: {
        inline: ['element-plus'],
      },
    },
  },
  server: {
    port: 8080,
  },
});