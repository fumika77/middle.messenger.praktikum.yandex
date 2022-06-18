const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
    entry: './src/index.ts',
    mode: "development",
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js'
        },
        fallback: { "timers": require.resolve('timers-browserify') }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [{from: 'static/img', to: 'img'}]
        }),
        new DotenvWebpackPlugin(),
    ],
    devServer: {
        static: path.join(__dirname, `dist`),
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                use: [{
                    loader: "handlebars-loader",
                }]
            },
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                            transpileOnly: true,
                        },
                    },
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single',
    },
    watchOptions: {
        ignored: /node_modules/,
    },
}