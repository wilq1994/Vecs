var webpack = require('webpack');

module.exports = {
  entry: ['./src/app.js', 'webpack-hot-middleware/client?reload=true'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};