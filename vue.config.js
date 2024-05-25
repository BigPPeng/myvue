const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: { 
    proxy: {
      "/api":{ // /proxy_url 这个用来和根路径baseURL 进行匹配 
        pathRewrite :{
          ["^/api"]:""
        },
        target: 'http://127.0.0.1:8082/', // 这个是填写跨域的请求域名+端口号，也就是要请求的URL(不包含 changeOrigin: true， // 是否允许跨域请求，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时 pathRewrite:{// 路径重写
      }
    }
  }
})

