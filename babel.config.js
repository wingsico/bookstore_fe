module.exports = {
  presets: [
    '@vue/app', // 通过@babel/preset-env和browerslist判断使用的polyfill，传递 useBuildIns: 'usage' 给 Babel(默认情况)
    // 指定特定的polyfill
    // ['@vue/app', {
    //   polyfills: [
    //     'es6.promises', // Promise默认包含
    //     'es6.symbol',
    //   ],
    // }],
  ],
  // useBuildIns: 'usage|entry|false', 默认值 usage. 当传入entry，需要在main.js中引入 @babel/polyfill (这会增大包体积)
  plugins: [
    [
      'import',
      { libraryName: 'vant', libraryDirectory: 'es', style: true },
      'vant',
    ],
  ],
};
