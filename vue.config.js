const { resolve } = require('path');
const MockServer = require('./mock');

module.exports = {
  assetsDir: 'assets',
  devServer: {
    before: MockServer,
  },
  pages: {
    index: {
      title: '木迹',
      entry: 'src/main.js',
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'));
  },
};
