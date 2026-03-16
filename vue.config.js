const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // 如果你打算部署到 https://<用户名>.github.io/<仓库名>/
  // 请将 publicPath 设置为 './' (相对路径) 兼容性最强
  publicPath: process.env.NODE_ENV === 'production'
    ? './' 
    : '/'
})