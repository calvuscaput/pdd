const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/pdd/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/scss/vars.scss";',
      },
    },
    sourceMap: process.env.NODE_ENV === 'development',
  },
});
