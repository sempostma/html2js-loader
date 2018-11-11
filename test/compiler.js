import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';
import webpackConfig from './webpack.config.babel';

export default (fixture, options = {}) => {
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