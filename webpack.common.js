const path = require('path');
const pkg = require('./package.json');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const autoprefixer = require('autoprefixer');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/app.js', './src/gstyles.scss'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 200000,
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: pkg.name,
      description: pkg.description,
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new CopyPlugin([
      { from: 'manifest.json' },
      { from: 'images', to: 'images' },
    ]),
    new VueLoaderPlugin(),
    new WorkboxPlugin.GenerateSW()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules']
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ]
  }
};
