import axios from 'axios'
import config from './conf/axios.config'

export const http = getInstances(config)
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
 * 深度合并多个对象，返回合并后的新对象
 * @private
 * @param  {...Object} objs 多个对象
 * @return {Object}    返回合并后的新对象，原对象内容不变
 */
function merge(...objs) {
  let result = {}
  for (let obj of objs) {
    for (let key in obj) {
      if (typeof result[key] === 'object' && typeof obj[key] === 'object') {
        result[key] = merge(result[key], obj[key])
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

export default http

