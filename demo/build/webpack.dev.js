const webpack = require('webpack');
const { merge } = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base');

const devPort = 8080;

module.exports = merge(baseConfig.default, {
  mode: 'development',

  output: {
    filename: '[name].js',
  },

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    host: '0.0.0.0',
    port: devPort,
    quiet: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: false,
    compress: true,
    publicPath: '/',
    overlay: {
      warnings: false,
      errors: true,
    },
    clientLogLevel: 'none',
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`App running at: http://localhost:${devPort}/`],
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
