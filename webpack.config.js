const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
  hash: true,
});

const extractProjectStyle = new MiniCssExtractPlugin({
  filename: '[name].[contenthash].css',
});

const { ENVIRONMENT } = process.env;

function getPlugins() {
  const plugins = [];
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = `${currentPath}/.env.${ENVIRONMENT.trim()}`;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: envPath }).parsed;

  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  plugins.push(
    HtmlWebpackPluginConfig,
    new MiniCssExtractPlugin('styles.css'),
    new webpack.ProvidePlugin({ jQuery: 'jquery' }),
    new webpack.DefinePlugin({
      'process.env.ENVIRONMENT': JSON.stringify(ENVIRONMENT),
      'process.env.NODE_ENV': JSON.stringify(ENVIRONMENT),
      ...envKeys,
    }),
  );

  plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es/));
  // if production
  if ('production' === ENVIRONMENT) {
    plugins.push(
      new webpack.SourceMapDevToolPlugin({
        module: false,
      }),
    );
    plugins.push(new webpack.optimize.AggressiveMergingPlugin());
    plugins.push(new CleanWebpackPlugin({ verbose: true }));
    plugins.push(extractProjectStyle);
  } else {
    plugins.push(new webpack.SourceMapDevToolPlugin({}));
  }
  return plugins;
}

module.exports = smp.wrap({
  entry: [ 'babel-polyfill', './src/index.jsx' ],
  output: {
    path: path.resolve('build'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  optimization: {
    nodeEnv: ENVIRONMENT,
    splitChunks: {
      chunks: 'all',
    },
    minimizer:
      'production' === ENVIRONMENT ?
        [
            new TerserPlugin({
              terserOptions: {
                compress: true,
                paralel: true,
                ecma: 6,
                output: {
                  comments: false,
                },
              },
              sourceMap: false,
              parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
          ] :
        [],
  },
  mode: ENVIRONMENT,
  resolve: {
    modules: [ path.join(__dirname, './src'), 'node_modules' ],
    extensions: [ '.js', '.jsx', '.css', '.scss' ],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(gif|svg|jpg|png|woff|woff2|ttf|otf|eot)$/,
        loader: 'file-loader',
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss|sass)$/,
        include: [ path.resolve(__dirname, 'src/') ],
        exclude: [ path.resolve(__dirname, 'node_modules/') ],
        use: [
          {
            loader: 'development' === ENVIRONMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        include: [ path.resolve(__dirname, 'node_modules/') ],
        exclude: [ path.resolve(__dirname, 'src/') ],
        use: [
          {
            loader: 'development' === ENVIRONMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
  },
  plugins: getPlugins(),
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
});
