const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // 设置为 './' (相对路径)，确保打包部署到 GitHub Pages 后，JS/CSS 资源路径正确
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
})