const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
    entry:{
        index: [
            './src/index.ts',
            "./src/common/styles/common.css",
            "./src/common/components/avatar/avatar.css",
            "./src/common/components/backArrow/backArrow.css",
            "./src/common/components/inputLabel/inputLabel.css",
            "./src/common/components/button/button.css",
            "./src/common/components/input/input.css",
            "./src/common/components/inputFile/inputFile.css",
            "./src/common/components/messageItem/messageItem.css",
            "./src/common/components/imageButton/imageButton.css",
            "./src/views/login/login.css",
            "./src/views/profileSettings/profileSettings.css",
            "./src/views/profileDescription/profileDescription.css",
            "./src/views/signUp/signUp.css",
            "./src/views/error/error.css",
            "./src/views/dialogs/dialogs.css",
            "./src/views/profileImage/profileImage.css",
            "./src/views/profilePassword/profilePassword.css",
            "./src/views/createChat/createChat.css",
            "./src/views/addUserChat/addUserChat.css"
        ]
    },
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
        filename: "bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
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
                test: /\.ts?$/,
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
            {
                test: /\.css$/i,
                use: ["style-loader","css-loader"
                    , "postcss-loader"],
            },
        ],
    },
    watchOptions: {
        ignored: /node_modules/,
    },
}