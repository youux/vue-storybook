export default {
  namespaced: true,

  state: {
    isCollapse: false, // 左侧菜单是否打开
    menuActiveItem: null, // 左侧菜单选中
    menuOpenItem: null, // 左侧菜单打开项
    asideMenu: [
      {
        name: '组件',
        icon: 'el-icon-star-off',
        link: '',
        child: [
          {
            name: 'page1',
            link: 'page1'
          },
          {
            name: 'page2',
            link: 'page2'
          },
          {
            name: 'page3',
            link: 'page3'
          }
        ]
      }
    ],
    setList: [
      {
        name: '退出',
        key: 'exit'
      }
    ]
  },

  getters: {
    isCollapse: state => state.isCollapse,
    menuActiveItem: state => state.menuActiveItem,
    menuOpenItem: state => state.menuOpenItem,
    asideMenu: state => state.asideMenu,
    setList: state => state.setList
  },

  actions: {
    // 左导航收起/展开
    setIsCollapse ({ commit }, key) {
      commit('setIsCollapse', key)
    },
    // 左导航选中
    setMenuActiveItem ({ commit }, key) {
      commit('setMenuActiveItem', key)
    },
    // 左导航开启项
    setMenuOpenItem ({ commit }, key) {
      commit('setMenuOpenItem', key)
    }
  },

  mutations: {
    // 展开收起左导航
    setIsCollapse (state, data) {
      state.isCollapse = data
    },
    // 左导航选中
    setMenuActiveItem (state, data) {
      state.menuActiveItem = data
    },
    // 左导航开启项
    setMenuOpenItem (state, data) {
      state.menuOpenItem = data
    }
  }
}
