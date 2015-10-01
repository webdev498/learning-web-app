var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:4000',
    './lib/index'
  ],
  output: {
    filename: 'app.js',
    chunkFilename: "[id].js",
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css"),
    new HtmlWebpackPlugin({
      title: 'Fresh Food Connect',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
    })
  ],
  module: {
    loaders: [
      {
         test: /\.less$/,
         loader: ExtractTextPlugin.extract(
           // activate source maps via loader query
           'css?sourceMap!' +
           'less?sourceMap'
         )
      }
    ]
  },
  resolve: {
    alias: {
      /*
      'actions': __dirname + '/lib/actions',
      'assets': __dirname + '/assets',
      'components': __dirname + '/lib/components/',
      'decorators': __dirname + '/lib/decorators/',
      'middleware': __dirname + '/lib/middleware/',
      'persistence': __dirname + '/lib/persistence/',
      */
    }
  }
};
