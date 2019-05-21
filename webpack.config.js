const path = require('path');
//启动热更新第二步
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

const {VueLoaderPlugin} = require('vue-loader');
//这个配置文件其实就是js配置文件 通过node 中的模块操作  像外暴露了一个配置对象
module.exports = {
    entry: path.join(__dirname, './src/main.js'), // 入口文件 示要使用webpack打包哪个文件
    output: {
        path: path.join(__dirname, './dist'),//输出到什么目录中去
        filename: 'bundle.js'// 指定输出的文件的名称
    },
    devServer: {
        //--open --port 3000 --contentBase src
        open: true,//自动打开浏览器
        port: 3000,//设置启动时候运行的端口
        // contentBase:'src',//指定托管的跟目录
        hot: true,//启动热更新 第一步,
        host:'0.0.0.0'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // new 一个热更新的 模块对象， 这是 启用热更新的第 3 步
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), // 指定 模板页面，将来会根据指定的页面路径，去生成内存中的 页面
            filename: 'index.html' // 指定生成的页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module: { // 这个节点，用于配置 所有 第三方模块 加载器
        rules: [ // 所有第三方模块的 匹配规则
            {test: /\.css$/, use: ['style-loader', 'css-loader']}, //  配置处理 .css 文件的第三方loader 规则
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}, //配置处理 .less 文件的第三方 loader 规则
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}, // 配置处理 .scss 文件的 第三方 loader 规则
            {test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]'},
            {test: /\.(ttf|woff2|eot|woff|svg)$/, use: 'url-loader'},
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.vue$/, use: 'vue-loader'},
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        alias: {
            // "vue$":'vue/dist/vue.js'
        }
    }
}