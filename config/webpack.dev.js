var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var commonOptions = require('./webpack.common.js');

module.exports = webpackMerge(commonOptions, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].js')
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }

});
