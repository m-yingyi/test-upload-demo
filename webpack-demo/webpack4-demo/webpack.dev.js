'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader', // loader是链式调用，从右到左，实际执行是先执行css-loader，再把结果传给style-loader
          'less-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg|JPG)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240 // 图片小于10k，打包会自动做base64
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true, // 开启热更新
  }
}