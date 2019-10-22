/**
 * @file 设置缓存
 * @author songgaoke
 */

export default {
  // ==================sessionsTorage设置缓存================
  // 设置缓存
  sessionSet: function (name, data) {
    sessionStorage.removeItem(name)
    sessionStorage.setItem(name, JSON.stringify(data))
  },
  // 获取缓存
  sessionGet: function (name) {
    let returnName = '';
    try {
      returnName = JSON.parse(sessionStorage.getItem(name));//捕获JSON.parse异常
    } catch (e) {
      returnName = '';
    }
    return returnName;
  },
  // 清除缓存
  sessionRemove: function (name) {
    sessionStorage.removeItem(name)
  },
  // ==================localStorage设置缓存==================
  // 设置缓存
  localSet: function (name, data) {
    localStorage.removeItem(name)
    localStorage.setItem(name, JSON.stringify(data))
  },
  // 获取缓存
  localGet: function (name) {
    return JSON.parse(localStorage.getItem(name))
  },
  // 清除缓存
  localRemove: function (name) {
    localStorage.removeItem(name)
  }
}
