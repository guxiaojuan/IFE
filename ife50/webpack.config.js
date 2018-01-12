const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.resolve(__dirname, '../ife50/src')

module.exports = {
    entry: {
        app: path.join(srcPath, 'main.jsx')
    },
    output: {
        path: path.resolve(__dirname, '../ife50/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test:/\.jsx?$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader'
                ]
            },
            {
                test:/\.less$/,
                exclude: /node_modules\/antd/,   //不要让node_modules里antd的样式配置css-module
                // loaders:[
                //     'style-loader',
                //     'css-loader',
                //     'less-loader'
                // ]
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: {modules: true} },   
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        }),
        new ExtractTextPlugin({
            filename: 'style.[chunkhash].css'
        })
    ],
    devServer: {
        contentBase: srcPath,
        hot: true
    }
}