import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const config = {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    // exports: 'named',
  },
  plugins: [
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
  ],
  external: [],
};

export default config;
