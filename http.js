/**
 * @file 服务调用插件
 * @author songgaoke
 */

import Vue from 'vue'
import axios from 'axios'
import 'babel-polyfill'
import { TMessage, TGlobalLoading } from 'aid-taurus-desktop-cmcc'
import config from './conf/axios.config'
import { authHttp } from 'seok-portal'
import authorization from './store/authorization'
import store from './store'
import { merge, isOwnEmpty, setInterceptor } from './utils/util'

const http = getInstances(config);
const HttpPlugin = { // 定义服务调用插件
  install: (Vue) => {
    // 添加实例方法
    if (!http) {
      Vue.prototype.$http = axios;
    } else {
      for (let domainName in http) {
        Vue.prototype[domainName] = http[domainName];
      }
    }
  }
}

/**
 * 封装服务调用对象实例
 * @param  {Object} conf `assets/axios.config.js`内定义的配置对象
 * @return {Object} 返回一个根据`assets/axios.config.js`配置文件生成的服务调用对象集合
 */
function getInstances(conf) {
  let result = {}
  let domains = conf.root || null
  let commonConfig = conf.commonConfig ? conf.commonConfig : {}
  let opts = merge(axios.defaults, commonConfig)
  for (let ky in opts) {
    axios.defaults[ky] = opts[ky]
  }
  result.$http = axios
  if (!isOwnEmpty(domains)) {
    for (let key in domains) {
      key = key.trim()
      if (key !== '' && key !== 'http') { // 忽略以"http"为属性名的节点
        let instance = axios.create(domains[key])
        let domainName = `\$${key}`
        // 为每一个实例添加上axios的静态方法
        instance.all = (promises) => {
          return axios.all(promises)
        }
        instance.spread = (cb) => {
          return axios.spread(cb)
        }
        instance.Cancel = () => {
          return axios.Cancel
        }
        instance.CancelToken = () => {
          return axios.CancelToken
        }
        instance.isCancel = () => {
          return axios.isCancel
        }
        result[domainName] = instance
      }
    }
  }
  return result
}

/**
 * 请求拦截器
 * @param {Object} config `axios`配置对象
 * @returns {Object|Promise} 返回配置对象本身或者返回一个Promise对象
 */
function requestInterceptor(config) {
  let authConfig = authHttp.requestInterceptor(config, authorization, store.state.authStore);
  let mergedConfig = merge(config, authConfig);
  mergedConfig.data = config.data;
  
  return mergedConfig
}

/**
 * 请求错误处理
 * @param error
 * @returns {Promise} 返回一个Promise对象
 */
function requestError(error) {
  TMessage.danger(error) // 提示错误
  TGlobalLoading.error()
  return Promise.reject(error)
}

/**
 * 响应拦截器
 * @param {Object} response `Axios`响应对象
 * @returns {Object|Promise} 返回`Axios`响应对象或Promise对象
 */
function responseInterceptor(response) {
  TGlobalLoading.finish()
  return response
}

/**
 * 响应错误处理
 * @param {Object} error `Axios`错误对象
 * @returns {Promise} 返回Promise对象
 */
function responseError(error) {
  TGlobalLoading.error();
  authHttp.responseErrorInterceptor(error, authorization, http.$http, store.state.authStore, (accessToken, refreshToken, authState, code) => {
    store.commit('setAuthState', { accessToken, refreshToken, authState, code })
  })
  
  return Promise.reject(error)
}

// 设置默认服务调用拦截器
setInterceptor(http, requestInterceptor, requestError, responseInterceptor, responseError);

// 注册插件
Vue.use(HttpPlugin)
export default http
