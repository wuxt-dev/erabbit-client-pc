const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  // 将低于10kb的图片转为base64格式
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .set('parser', {
        dataUrlCondition: {
          maxSize: 10 * 1024 // 10KiB
        }
      })
  }
})
