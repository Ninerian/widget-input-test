import { babel } from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const core = {
    input: 'src/index.tsx',
    output: {
        file: 'dist/groda-test.widget.js',
        format: 'iife',
    },
    plugins: [
        resolve({extensions}),
        commonjs(),
        json(),
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
        uglify()]}
;


export default [core];
