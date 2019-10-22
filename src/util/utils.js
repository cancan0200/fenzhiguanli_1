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
