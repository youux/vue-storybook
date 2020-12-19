// 安装组件至全局，重要文件，不可删
// 全局组件命名规则，必须是以中划线-分割例demo-box
const files = require.context('components/', true, /\.vue$/)
const filesList = []

files.keys().forEach(key => {
  const pathName = key.replace(/(\.\/)|(\.vue)|(\/.*)/g, '')
  return filesList.push(pathName)
})

const newfilesList = Array.from(new Set(filesList))
const modules = {}

for (const [, val] of Object.entries(newfilesList)) {
  const arr = val.split('-')
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i]
      if (i !== 0) {
        arr[i] = element.slice(0, 1).toUpperCase() + element.slice(1)
      }
    }
  }
  modules[arr.join('')] = val
}

export default {
  install (Vue) {
    for (const [key, val] of Object.entries(modules)) {
      Vue.component(key, () => import('components/' + val))
    }
  }
}
