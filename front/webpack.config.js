const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        main: path.resolve(__dirname, './public/index.js'),
    },
    output: {
        filename: '[name].bandle.js',
        path: path.resolve(__dirname, './public/dist'),
        clean: true,
        assetModuleFilename: 'static/[name][ext][query]',
    },
    optimization: {
        minimize: true,
    },

    plugins: [
        new webpack.DefinePlugin({
            __API__: defineUrl(),
        })
    ],

    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg|ico|webp)$/i,
                type: 'asset',
                generator: {
                    filename: 'img/[name][ext][query]',
                },
            },
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
                options: {
                    exclude: [
                        // \\ for Windows, \/ for Mac OS and Linux
                        /node_modules/,
                    ],
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
        fallback: {
            'fs': false,
        },
        alias: {
            Static: path.resolve(__dirname, 'public/static/'),
        },
    },
};

function defineUrl() {
    switch (process.env.NODE_ENV) {
        case 'prod':
            return JSON.stringify('95.163.213.142');
        case 'local':
            return JSON.stringify('127.0.0.1');
        default:
            return JSON.stringify('127.0.0.1');
    }
}
