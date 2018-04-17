const state = {
  tabs: [],
  activeTabs: '/home'
}

const mutations = {
  // 添加tabs
  add_tabs (state, data) {
    this.state.tabs.tabs.push(data)
  },
  // 设置当前激活tabs
  set_tabs_active (state, data) {
    this.state.activeTabs = data
  },
  // 移除 tab页
  delet_tabs (state, data) {
    let index = 0
    for (let tab of state.tabs) {
      if (tab.route === data) {
        break
      }
      index++
    }
    this.state.tabs.tabs.splice(index, 1)
  }
}

export default {
  state,
  mutations
}
