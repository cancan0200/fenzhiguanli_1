/**
 * 一些公共方法
 */

import Vue from 'vue'

// 接口响应成功
Vue.prototype.resSuccess = function (res, err) {
  if (res && res.hasOwnProperty('data') && res.data && res.data.hasOwnProperty('code') && res.data.code && res.data.code + '' === '2000' || res.data.code + '' === '200' || res.data.success) {
    return true
  }

  return false
}
