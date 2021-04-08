const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: IS_PROD ? '././' : '/', // 打包相对路径
  productionSourceMap: false,
  lintOnSave: true,
  runtimeCompiler: true
};
