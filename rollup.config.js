import { babel } from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { uglify } from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';

const core = {
    input: 'src/index.tsx',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
    },
    plugins: [
        babel({
            babelHelpers: 'bundled', extensions: [
                ...DEFAULT_EXTENSIONS,
                '.ts',
                '.tsx'
            ], plugins: [
                [
                    '@babel/plugin-transform-runtime',
                    {
                        helpers: false,
                        runtimeHelpers: true,
                        regenerator: true
                    }
                ]
            ],
            exclude: ['node_modules/**']
        }),
        serve({contentBase: 'dist',
               open: true}),
        uglify()]}
;


export default [core];
