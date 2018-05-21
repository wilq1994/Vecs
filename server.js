const express = require('express')
const app = express()

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);


if(webpackConfig.mode === 'development'){
  app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}

app.use(express.static('public'))


app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))

