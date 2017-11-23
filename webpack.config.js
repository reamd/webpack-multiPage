/**
 * Created by reamd on 2017/10/12.
 */
let path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'),
    WebpackMonitor = require('webpack-monitor'),
    WebpackBrowserPlugin = require('open-browser-webpack-plugin'),
    PostCSSAssetsPlugin = require('postcss-assets-webpack-plugin');

let development = process.env.NODE_ENV === 'development';
let production = process.env.NODE_ENV === 'production';
console.log('当前打包环境：\n *************author: reamd**************** \n development:', development, '\n production:', production, '\n ***************************************** \n');

let devtool = production? 'source-map' : 'cheap-module-eval-source-map';
let devPort = 8282;
/*定义js的map*/
let map = {
    'main':  path.resolve(__dirname, './src/scripts/main.js'),
    'page1': path.resolve(__dirname, './src/scripts/page1.js'),
    'page2': path.resolve(__dirname, './src/scripts/page2.js')
};

/*定义页面的相关资源*/
let htmlWebpackPluginArr = [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        //增加指定的chunks
        chunks: ['main'],
        chunksSortMode: 'manual'
    }),
    new HtmlWebpackPlugin({
        template: './src/pages/page1.html',
        filename: 'pages/page1.html',
        //增加指定的chunks
        chunks: ['main', 'page1'],
        chunksSortMode: 'manual'
    }),
    new HtmlWebpackPlugin({
        template: './src/pages/page2.html',
        filename: 'pages/page2.html',
        //增加指定的chunks
        chunks: ['main','page2'],
        chunksSortMode: 'manual'
    })
];

let plugins = production
    ? [
        new OptimizeCSSPlugin({
            sourceMap: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })/*,
        new WebpackMonitor({
            capture: true, // -> default 'true'
            // target: '../monitor/myStatsStore.json', // default -> '../monitor/stats.json'
            launch: true // -> default 'false'
            // port: 3030, // default -> 8081
        })*/
    ]
    : [
        new webpack.HotModuleReplacementPlugin(),
        new WebpackBrowserPlugin({
            // browser: 'Chrome', // Firefox
            url: 'http://localhost:' + devPort
        })
    ];

plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: development,
        PRODUCTION: production
    }),
    new ExtractTextPlugin({
        filename:  'css/[name].[contenthash:6].css'
    })
);

plugins.push(...htmlWebpackPluginArr);

module.exports = {
    devServer: {
        // inline: true,
        port: devPort
    },
    devtool : devtool,
    entry: map,
    /*externals: {
        jquery: 'jQuery' //可以用模块方式引入但不会打包到bundle.js中
    },*/
    output: {
        path: path.join(__dirname, './dist/'),
        filename: 'js/[name].[hash:6].js',
        publicPath: '/',
        // chunkFilename: 'js/[name].[chunkhash:6].js' // 设置require.ensure 文件名
    },
    module: {
        rules: [
            {
                test: /\.(htm|html)$/i,
                exclude: path.join(__dirname, 'node_modules'),
                loader: 'html-withimg-loader'
            },
            {
                test: /\.(sass|scss)$/,
                exclude: path.join(__dirname, 'node_modules'),
                include: path.join(__dirname, './src'),
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
                exclude: [path.join(__dirname, 'node_modules'), path.join(__dirname, './src/js')],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                exclude: [path.join(__dirname, 'node_modules')],
                include: path.join(__dirname, './src/img'),
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:6].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|ttc)(\?.*)?$/,
                exclude: path.join(__dirname, 'node_modules'),
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'font/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: plugins
};