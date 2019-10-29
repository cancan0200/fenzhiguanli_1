/**
 * 公共方法
 */
// Recursively query the tree for a certain node
export default function getCertainNode(value, list, key, child) {
  function recurision(value, list, key, child){
    for (let i = 0; i < list.length; i++) {
      if (list[i][key] === value) {
        return list[i]
      }
      if (child && list[i][child]) {
        let targetItem = recurision(value, list[i][child], key, child)
        if(targetItem){
          return targetItem
        }
      }
    }
    return null;
  }

  let ret = recurision(value, list, key, child)
  return ret
}

/**
 * 深度合并多个对象，返回合并后的新对象
 * @private
 * @param  {...Object} objs 多个对象
 * @return {Object}    返回合并后的新对象，原对象内容不变
 */
export function merge(...objs) {
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

/**
 * 判断给定参数是否`null`或空对象`{}`
 * @private
 * @param  {Object}  obj 待检测对象
 * @return {Boolean}  如果参数`obj`是`null`或空对象`{}`，那么返回`true`，否则返回`false`
 */
export function isOwnEmpty(obj) {
  for (let name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false // 返回false，不为空对象
    }
  }
  return true // 返回true，为空对象
}
