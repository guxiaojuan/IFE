const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.resolve(__dirname, '../src')

module.exports = {
    entry: {
        app: path.join(srcPath, 'main.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test:/\.jsx?$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot',
                    'babel'
                ]
            }
        ]
    },
    plugins: []
}