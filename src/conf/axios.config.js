/**
 * @file 服务调用对象配置
 * @author songgaoke
 * 配置项目说明:
 * commonConfig -- 默认服务调用对象配置
 * root -- 分域服务调用对象配置，其中的属性对应具体的一个域的服务调用配置
 */
//
// console.log(NODE_ENV, window.BWEUM);
// // 兼容多环境和域名二者配置
// (() => {
//   var defining = {
//     appBaseUrl: NODE_ENV === 'domain' ? window.APP_BASE_URL : APP_URL,
//     redirectBaseUrl: NODE_ENV === 'domain' ? window.REDIRECT_BASE_URL : REDIRECT_URL,
//     domainBaseUrl: NODE_ENV === 'domain' ? window.DOMAIN_BASE_URL : DOMAIN_URL
//   };
//   Object.keys(defining).forEach(key => {
//     window[key] = defining[key];
//   });
// })();
//
// // 静态配置对象，此对象在 /static/conf/app-conf.js 内配置
// const appConf = window.APP_CONF;

// 服务调用对象配置
const conf = {
  commonConfig: {
    timeout: 30000,
    baseURL: '/api'
  },
  root: {
    cloud: {
      // baseURL: 'http://www.example.com',
      baseUrl: '/api',
      timeout: 30000
    },
  }
}

// // 将优先的静态配置覆盖本配置
// function overrideConf() {
//   let urls = (appConf || appConf.baseURL)
//   let root = conf.root
//   if (Object.keys(urls).length > 0) {
//     for (let key in urls) {
//       if (key in root) {
//         root[key].baseURL = urls[key]
//       }
//     }
//   }
// }

// 调整配置优先级
// overrideConf()
export default conf
