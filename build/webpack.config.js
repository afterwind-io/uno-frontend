const path = require('path')
const path_dist = path.resolve(__dirname, '../dist')
const path_style = path.resolve(__dirname, '../src/style')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const configs = {
  entry: {
    app: [
      './src/index.ts'
    ],
  },
  output: {
    path: path_dist,
    filename: `[name].[hash].js`,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [
      'node_modules',
      './src',
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          'ts-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path_style]
            }
          }
        ]
      },
      {
        test: /\.feather$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: '10000',
          name: './assets/[name].[ext]'
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      // favicon: 'src/asset/favicon.ico'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // host: '192.168.1.4',
    port: 3000,
    hot: true,
    stats: { colors: true },
    contentBase: './dist'
  },
  devtool: 'source-map'
}

module.exports = configs
