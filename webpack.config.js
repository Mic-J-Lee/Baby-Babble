const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        test: /\.jsx?$/,
      }
    ],
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    // for minification of bundle.js
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          ascii_only: true
        }
      }
    }),
    new ExtractTextPlugin('style.css')
  ]
};

