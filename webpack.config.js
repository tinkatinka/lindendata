const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  resolve: {
    root: [
      path.resolve(__dirname, './src'),
    ],
    fallback: path.join(__dirname, 'node_modules'),
  },
  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules'),
  },

  devtool: 'cheap-module-source-map',

  entry: [
    'babel-polyfill',
    './src/index.js',
  ],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '',
  },

  module: {
    preloaders: [
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',

        include: [
          path.resolve(__dirname, 'config'),
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/dashjs'),
        ],

        query: {
          plugins: ['transform-runtime', 'transform-class-properties'],
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
    ],
  },

  // add this handful of plugins that optimize the build
  // when we're in production
  plugins: isProd ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ] : [
    new DashboardPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __DEVELOPMENT__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
