// webpack.config.dev.js
// ...
module.exports = {
  devtool: 'eval',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './src/index',
	'app': ['event-source-polyfill', 'aurelia-bootstrapper']
  ],
// ...