const IS_PROD = process.env.NODE_ENV === 'production';

const cdn = {
  externals: {
    vue: 'Vue',
    'element-plus': 'ElementPlus',
    AMap: 'AMap'
  },
  css: ['https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'],
  js: ['https://unpkg.com/vue@next', 'https://unpkg.com/element-plus/lib/index.full.js']
};

module.exports = {
  publicPath: IS_PROD ? '././' : '/', // 打包相对路径
  productionSourceMap: false,
  lintOnSave: true,
  runtimeCompiler: true,
  chainWebpack: config => {
    // ============注入cdn start============
    config.plugin('html').tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (IS_PROD) args[0].cdn = cdn;
      return args;
    });
    // ============注入cdn start============
  },
  configureWebpack: config => {
    // 生产环境相关配置
    if (IS_PROD) {
      // cdn
      config.externals = cdn.externals;
    }
  }
};
