import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import react from 'react';
import reactDom from 'react-dom';

export default {
    input: './src/index.js',
    output: [{
        file: './dist/app.js',
        format: 'es',
        sourcemap:true
    }],
    plugins: [
        resolve(),
        babel({
            presets: ['react-app'],
            runtimeHelpers: true,
            exclude: './node_modules/**'
        }),
        cjs({
            include: './node_modules/**',
            namedExports: {
                react: Object.keys(react),
                'react-dom': Object.keys(reactDom)
            }
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
