const path = require('path');
const webpack =  require('webpack');
const memoryfs = require('memory-fs');
const webpackConfig = require('./webpack.config.babel');

module.exports = (fixture, options = {}) => {
  webpackConfig.entry = fixture;
  const compiler = webpack(webpackConfig);

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (stats.hasErrors()) return reject(stats.toString())
      else if (err) return reject(err);
      else if (stats.hasWarnings()) console.warn(stats.toString())

      const result = compiler.outputFileSystem.data['bundle.js'].toString()
      resolve({ stats, result });
    });
  });
};