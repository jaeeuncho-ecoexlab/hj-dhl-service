const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { join } = require('path');

module.exports = (env) => {
    const { NODE_ENV } = env;
    return {
        target: 'node',
        entry: { bundle: "src/app.ts" },
        output: { path: __dirname + "/dist", filename: "[name].js" },
        resolve: {
            extensions: ['.ts', '.js'],
            plugins: [ new TsconfigPathsPlugin({}) ]
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.jpe?g$|\.gif$|\.png$|\.PNG$|\.svg$|\.woff(2)?$|\.ttf$|\.eot$/i,
                    type: 'src/assets'
                }
            ]
        },
        externals: [ nodeExternals() ],
        devtool: "inline-source-map",
        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: '[name].js.map',
                exclude: /^(.*?(vendor)[^$]*)$/
            }),
            new Dotenv({
                path: join(__dirname, 'environment', `${NODE_ENV}.env`),
                exclude: /^(.*?(vendor)[^$]*)/
            })
        ]
    }
}
