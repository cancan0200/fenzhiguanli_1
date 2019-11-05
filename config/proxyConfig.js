/**
 *
 */
module.exports = {
  proxy: {
    '/api': {
      target: 'https://www.jianshu.com/',  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/api': ''  //需要rewrite的,
      }
    }
  }
}
