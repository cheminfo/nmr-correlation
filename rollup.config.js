import pluginTypescript from '@rollup/plugin-typescript';
import pluginCommonjs from '@rollup/plugin-commonjs';
import pluginNodeResolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import * as path from 'path';
import pkg from './package.json';

const moduleName = pkg.name.replace(/^@.*\//, '');
const inputFileName = 'src/index.ts';
const author = pkg.author;
const banner = `
  /**
   * @license
   * author: ${author}
   * ${moduleName}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`;

const config =
  // CommonJS
  {
    input: inputFileName,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: 'inline',
        banner,
        // exports: 'default',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      pluginTypescript(),
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      babel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, '.babelrc.js'),
      }),
      pluginNodeResolve({
        browser: false,
      }),
    ],
  };

export default config;
