const path = require('path');
const NODE_ENV = process.env.NODE_ENV; //获取环境变量
const isDev = NODE_ENV === 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ClearWebpackPlugin } = require('clean-webpack-plugin');       
const nodeExternals = require('webpack-node-externals');

const plugins = isDev ? [
    new HtmlWebpackPlugin({
        filenames: 'index.html',
        template: './demo.html'
    }) 
] : [new ClearWebpackPlugin()];

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: isDev ? './demo/index/js' : './index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: isDev ? undefined : 'umd', // umd 通用 node 和浏览器环境
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        contentBase: './dist',
    },
    externals: isDev ? [] : [nodeExternals], // nodeExternals 使得打包的组件中不包括任何 node_modules 里面的第三方组件， 起到减小体积的作用，
    plugins,
}
