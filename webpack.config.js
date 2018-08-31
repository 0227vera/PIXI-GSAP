const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');


const entryObj = require('./catalog-list.json');

let entry = {};
entry.common = [
    './src/common/common.js'
];




// 生成插件的文件
let pluginsArr = [
    // 清除dist目录
    new cleanWebpackPlugin(['dist']),

    // 全局能用的js
    new webpack.ProvidePlugin({
        PIXI: "pixi.js",
        jQuery: "jquery",
        imagesloaded: 'imagesloaded',
        TweenMax: 'gsap',
        "window.jQuery": "jquery"
    }),

    // 压缩js代码
    // new uglifyjsWebpackPlugin(),

    new ExtractTextPlugin({ //提取css
        filename: 'css/[name]._[hash].css',
        disable: false,
        allChunks: true
    }),
    // 热加载
    new webpack.HotModuleReplacementPlugin(),

    //打包公共js

    new webpack.optimize.CommonsChunkPlugin({
        name: ['common'],
        chunks: ['./src/common'],
        minChunks: 1,
        minChunks: Infinity
    }),

    // new webpack.HashedModuleIdsPlugin(),

    //自动打开浏览器
    new OpenBrowserPlugin({
        url: 'http://localhost:3000/index5.html'
    })
];
entryObj.forEach((item, index) => {
    let obj = {
        filename: item + '.html',
        titile: 'PIXI-' + item,
        template: item + '.html',
        chunks: ['common', item], //html需要引入的js
        chunksSortMode: 'manual', // js按照手动排序
        // cache: true, //只有在内容变化时才会生成新的html
        minify: {
            removeComments: true, //是否压缩时 去除注释
            collapseWhitespace: false
        }
    };
    pluginsArr.push(new htmlWebpackPlugin(obj));

    entry[item] = './src/js/' + item + '.js';

});

console.log('----------->', entry)
const config = {
    entry: entry,
    // { //入口
    //     src: './src/js/app.js',
    //     index1: './src/js/index1.js',
    //     index2: './src/js/index2.js'
    // },
    output: { //出口
        path: path.resolve(__dirname, 'dist'),
        publicPath: '', //cdn
        filename: 'js/[name]._[hash].js'
    },
    devServer: { //服务
        contentBase: 'dist',
        host: 'localhost',
        hot: true,
        // open: true,
        inline: true,
        // progress: true,//显示打包速度
        port: 3000
        // proxy: {
        //     "/v2": {
        //         target: 'https://api.douban.com',
        //         changeOrigin: true,
        //         secure: false,// 接受 运行在 https 上的服务
        //         pathRewrite: { '^/v2': '' }
        //     }
        // }
    },
    module: {
        rules: [{
                test: /\.(htm|html)$/,
                use: [
                    'raw-loader'
                ]
            },
            { //css loader
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }]
                })
            },
            { // img 压缩，，生成hash值
                test: /\.(png|svg|jpg|gif)$/,
                use: "file-loader?name=[name][hash].[ext]&publicPath=../img/&outputPath=./img"
                /*name=[name].[ext]文件名，publicPath=../css中路径，outputPath=./img打包后的生成地址*/
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            // {
            //     test: /\.scss$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader'],
            // },

            // { //js loader
            //     test: /\.js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: {
            //         loader: 'babel-loader'
            //     }
            // },


            // ,
            // { //引用jquery
            //     test: require.resolve('jquery'),
            //     use: [{
            //         loader: 'expose-loader',
            //         options: 'jQuery'
            //     }, {
            //         loader: 'expose-loader',
            //         options: '$'
            //     }]
            // }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: pluginsArr
    // ,
    // externals: {
    //     PIXI: "pixi.js",
    //     jQuery: "jquery",
    //     imagesloaded: 'imagesloaded',
    //     "window.jQuery": "jquery"
    // }
};

module.exports = config;