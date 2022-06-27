const config = require('./webpack.config.js');
const path = require("path");

config.devServer = {
    static: path.join(__dirname, `dist`),
    port: 3000,
}

config.mode = "development";

module.exports = config