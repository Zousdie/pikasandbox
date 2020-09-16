const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const dotEnvConfig = require('./env');

const htmlPluginOptions = {
  template: path.join(__dirname, '../public/index.html'),
  filename: 'index.html',
  templateParameters(compilation, assets, pluginOptions) {
    let stats;
    return Object.assign(
      {
        get webpack() {
          // eslint-disable-next-line no-return-assign
          return stats || (stats = compilation.getStats().toJson());
        },
        compilation,
        webpackConfig: compilation.options,
        htmlWebpackPlugin: {
          files: assets,
          options: pluginOptions,
        },
      },
      dotEnvConfig,
    );
  },
};

exports.default = {
  context: process.cwd(),

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.join(__dirname, '../src'),
    },
  },

  performance: false,

  stats: {
    modules: false,
    children: false,
    version: false,
  },

  entry: {
    app: './src/index.ts',
    sw: './src/service-worker.ts',
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              extensions: ['.js', '.jsx', '.ts', '.tsx'],
              cache: true,
              emitWarning: true,
              emitError: false,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/babel-loader'),
            },
          },
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/ts-loader'),
            },
          },
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
            },
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        resolve: {
          extensions: ['.scss', '.sass'],
        },
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer'), require('cssnano')],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin(dotEnvConfig),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin(htmlPluginOptions),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../public/'),
          to: path.join(__dirname, '../dist/'),
          globOptions: {
            ignore: ['*.html', '*.htm'],
          },
        },
      ],
    }),
  ],
};

exports.htmlPluginOptions = htmlPluginOptions;
