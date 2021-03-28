const IS_PROD = process.env.NODE_ENV === 'production';

console.log(process.env.BASE_URL);

module.exports = {
  publicPath: IS_PROD ? '././' : '/', // 打包相对路径
  productionSourceMap: false,
  lintOnSave: true,
  runtimeCompiler: true
};
