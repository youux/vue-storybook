let Time = null

export default {
  baseURL: process.env.VUE_APP_BASE_API,

  beginTime: (code, time = 1000) => (Time = setInterval(code, time)),

  overTime: () => clearInterval(Time),

  httpUtil: (data) => {
    let ret = ''
    for (const key in data) {
      ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
    }
    return ret.slice(0, -1)
  },

  // 分组
  groupArr (arr, parentId, childId) {
    const temp = {}
    const tree = {}

    arr.forEach(item => {
      temp[item[parentId]] = item
    })

    const tempKeys = Object.keys(temp)
    tempKeys.forEach(key => {
      const item = temp[key]
      const _itemPId = item[childId]
      const parentItemByPid = temp[_itemPId]
      if (parentItemByPid) {
        if (!parentItemByPid.children) {
          parentItemByPid.children = []
        }
        parentItemByPid.children.push(item)
      } else {
        tree[item[parentId]] = item
      }
    })
    return Object.keys(tree).map(key => tree[key])
  }
}
