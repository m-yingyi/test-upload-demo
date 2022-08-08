'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 与stlye-loader互斥，需要改为MiniCssExtractPlugin的loader
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, // 与stlye-loader互斥，需要改为MiniCssExtractPlugin的loader
          'css-loader', // loader是链式调用，从右到左，实际执行是先执行css-loader，再把结果传给style-loader
          'less-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOption: {
          //       plugins: [
          //         'autoprefixer', {
          //           browsers: ['last 3 version', '>1%', 'ios 7']
          //         }
          //       ]
          //     }
          //   }
          // }
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                require('autoprefixer')({
                  browsers: ['last 2 version', '>1%', 'ios 7'] // 设置浏览器兼容版本，last 2 version兼容最新两个版本, >1%版本使用人数
                })
              }
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8 // px转换rem保留的小数点位数
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg|JPG)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]'
          }
        }]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',

    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    // 一个页面写一个HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/search.html'), // 模板
      filename: 'search.html', // 指定打包出来的名称
      chunks: ['search'], // 指定生成的HTML使用哪些chunks
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'), // 模板
      filename: 'index.html', // 指定打包出来的名称
      chunks: ['index'], // 指定生成的HTML使用哪些chunks
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      }
    }),
    new CleanWebpackPlugin(),
  ]
}