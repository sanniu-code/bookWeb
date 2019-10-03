module.exports = {
    // 基本路径
    baseUrl: './',
    // 输出文件目录
    outputDir: 'dist',
    //publicPath: process.env.NODE_ENV !== 'development' ? 'https://cdn.ourwill.cn/vcg/pay/static' : '',
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    //代理跨域 只是在开发时候
    devServer: {
        proxy: {
          '/db': {
            target: 'http://localhost:9999/',  // 目标地址
            changeOrigin: true,             // 是否改变源地址
            ws: true,
            pathRewrite: {
              '^/db': ''
            }
          }
        },
        overlay:{
            warning:false,
            errors:false
        },
      }
}