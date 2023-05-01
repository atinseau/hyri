const path = require('path');
const webpack = require('webpack');

const ReactServerDOMWebpackPlugin = require('react-server-dom-webpack/plugin');

module.exports = {
  mode: 'development',
  entry: '/Users/arthur/Desktop/Dev/NODE/hyri/packages/my-app/base.tsx',
  output: {
    filename: 'bootstrap.js',
    path: '/Users/arthur/Desktop/Dev/NODE/hyri/packages/my-app/.hyri/chunks'
  },
  externals: {
    // react: 'react',
    // 'react-dom': 'react-dom',
    hyri: 'hyri',
  },
  // Ignore entry point
  plugins: [
    new ReactServerDOMWebpackPlugin({
      isServer: false,
    }),
    new webpack.WatchIgnorePlugin({
      paths: ['index.ts']
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};