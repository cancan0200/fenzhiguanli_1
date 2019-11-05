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


export function shuffle (arr) {
  // 洗牌函数 将数组的顺序打乱
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomIndex(0, i);
    let temp = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = temp;
  }
  return _arr;
}

// 获取一个随机的索引
export function getRandomIndex (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 节流函数 func 只会调用一次
export function debounce (func, delay) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}



