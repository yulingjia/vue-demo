<template>
  <el-tabs class="tabs-nopadding" type="card" v-model="activeTabs2" :name="activeTabs2" closable @tab-click="tabsClick" @tab-remove="tabsRemove">
    <el-tab-pane v-for="item in tabs" :key="item.id" :label="item.name" :name="item.route"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeTabs: this.$store.state.activeTabs
    }
  },
  computed: {
    tabs () {
      return this.$store.state.tabs.tabs
    },
    activeTabs2: {
      get () {
        return this.activeTabs
      },
      set (val) {
        this.activeTabs = val
      }
    }
  },
  methods: {
    // tab切换
    tabsClick (tab, event) {
      this.$router.push({path: tab.name})
    },
    tabsRemove (tab, event) {
      // 首页不可删除
      if (tab === '/home') {
        this.$message({
          message: '警告哦,首页不可移除',
          type: 'warning'
        })
        return
      }
      this.$store.commit('delet_tabs', tab)
      // 移除tab标签为当前激活页 则激活前一个tab页
      if (this.activeTabs2 === tab) {
        var prePath = this.tabs[this.tabs.length - 1].route
        this.activeTabs2 = prePath
        this.$router.push({path: prePath})
      }
    }
  },
  watch: {
    '$route' (to) {
      let flag = false
      for (let tab of this.tabs) { // 已经打开过的标签页
        if (tab.name === to.name) {
          flag = true
          this.activeTabs2 = to.path
          break
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', { route: to.path, name: to.name })
        this.activeTabs2 = to.path
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
