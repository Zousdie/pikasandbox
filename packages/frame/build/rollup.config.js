import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import ts from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const isProduction = process.env.NODE_ENV === 'production';

const commonPlugins = [
  eslint({
    fix: true,
    throwOnError: true,
    throwOnWarning: false,
    include: ['src/**'],
  }),
  ts({
    tsconfigOverride: {
      sourceMap: !isProduction,
    },
  }),
  babel({
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
    babelHelpers: 'bundled',
    presets: ['@babel/preset-env'],
  }),
  isProduction && terser(),
];

export default [
  {
    input: {
      main: 'src/index.ts',
    },
    output: {
      dir: 'dist',
      format: 'iife',
      sourcemap: !isProduction,
      entryFileNames: isProduction ? '[name]-[hash].js' : '[name].js',
    },
    plugins: [
      ...commonPlugins,
      htmlTemplate({
        template: 'src/index.html',
      }),
      !isProduction &&
        serve({
          contentBase: 'dist',
          host: '0.0.0.0',
          port: 8080,
        }),
      !isProduction && livereload(),
    ],
  },
  {
    input: 'src/service-worker.ts',
    output: {
      file: 'dist/sw.js',
      format: 'iife',
      name: undefined,
      sourcemap: !isProduction,
    },
    plugins: commonPlugins,
  },
];
