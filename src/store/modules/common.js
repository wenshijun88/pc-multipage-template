export default {
  namespaced: true,
  state: {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 导航条, 布局风格, defalut(默认) / inverse(反向)
    navbarLayoutType: 'default',
    // 侧边栏, 布局皮肤, light(浅色) / dark(黑色)
    sidebarLayoutSkin: 'dark',
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 侧边栏, 菜单
    menuList: [],
    dynamicMenuRoutes: [],
    menuActiveName: '',
    rootActiveName: 0,
    // 主入口标签页
    mainTabs: [
      { name: 'home', title: '首页' }
    ],
    mainTabsActiveName: '',
    paginationConfig: {
      pageSizes: [10, 15, 20, 50],
      layout: 'total, sizes, prev, pager, next, jumper'
    },
    styleSize: 'small',
    closeOnclickModal: false,
    keepAliveRoutes: [],
    isFromOuterClient: false,
    zhiXiaShi: ['北京', '重庆', ' 天津', '上海']
  },
  mutations: {
    updateDocumentClientHeight (state, height) {
      state.documentClientHeight = height
    },
    updateNavbarLayoutType (state, type) {
      state.navbarLayoutType = type
    },
    updateSidebarLayoutSkin (state, skin) {
      state.sidebarLayoutSkin = skin
    },
    updateSidebarFold (state, fold) {
      state.sidebarFold = fold
    },
    updateMenuList (state, list) {
      state.menuList = list
    },
    updateDynamicMenuRoutes (state, list) {
      state.dynamicMenuRoutes = list
    },
    updateMenuActiveName (state, name) {
      state.menuActiveName = name
    },
    updateRootActiveName (state, name) {
      state.rootActiveName = name
    },
    updateMainTabs (state, tabs) {
      state.mainTabs = tabs
    },
    updateMainTabsActiveName (state, name) {
      state.mainTabsActiveName = name
    },
    setKeepAliveRoutes (state, keepAliveRoutes) {
      state.keepAliveRoutes = keepAliveRoutes
      console.log(state.keepAliveRoutes)
    },
    delKeepAlive (state, name) {
      state.keepAliveRoutes.splice(state.keepAliveRoutes.indexOf(name), 1)
    },
    addKeepAlive (state, name) {
      if (state.keepAliveRoutes.indexOf(name) < 0) {
        state.keepAliveRoutes.push(name)
      }
    },
    setIsFromOuterClient (state, val) {
      state.isFromOuterClient = val
    }
  }
}
