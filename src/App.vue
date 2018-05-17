<template>
  <div id="app">
    <div class="loading-wrap" v-if="!ifChecked">
      <i class="fas fa-life-ring fa-spin"></i>
      <p>加载中...</p>
    </div>
    <template v-else>
      <router-view v-if="subPath"/>
      <template v-else>
        <fund v-if="tabSelect === 'fund'"/>
        <schedule v-if="tabSelect === 'schedule'"/>
        <mine v-if="tabSelect === 'mine'"/>
        <mt-tabbar v-model="tabSelect" :fixed="true">
          <mt-tab-item id="fund">
            <i class="fas fa-donate" slot="icon"></i>
            <p>基金</p>
          </mt-tab-item>
          <mt-tab-item id="schedule">
            <i class="far fa-calendar-alt" slot="icon"></i>
            <p>任务</p>
          </mt-tab-item>
          <mt-tab-item id="square">
            <i class="far fa-compass" slot="icon"></i>
            <p>广场</p>
          </mt-tab-item>
          <mt-tab-item id="mine">
            <i class="far fa-user" slot="icon"></i>
            <p>我的</p>
          </mt-tab-item>
        </mt-tabbar>
      </template>
    </template>
  </div>
</template>

<script>
import Schedule from './tabViews/Schedule/index.vue'
import Fund from './tabViews/Fund/index.vue'
import Mine from './tabViews/Mine/index.vue'
import Http from '@/util/httpUtil.js'
import storageUtil from '@/util/storageUtil.js'

export default {
  data () {
    const tabSelect = storageUtil.getAppConfig('homeTabSelect') || 'fund'
    return {
      tabSelect: tabSelect,
      subPath: false,
      ifChecked: false
    }
  },
  components: {Schedule, Fund, Mine},
  watch: {
    tabSelect (val) {
      storageUtil.setAppConfig('homeTabSelect', val)
    }
  },
  name: 'App',
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.checkLogin()
      this.checkPath(this.$router.history.current.path)
      this.$router.afterEach((transition) => {
        console.log(transition)
        this.checkPath(transition.path)
      })
    },
    checkLogin () {
      const token = localStorage.getItem('token') || ''
      Http.get('auth/checkLogin', {token}).then((data) => {
        this.ifChecked = true
        window._token = data.data.token
        if (data.data.isLogin === false) {
          storageUtil.initUserInfo({
            isLogin: false
          })
          this.$router.push('/page/login')
        } else {
          storageUtil.initUserInfo({
            ...data.data,
            isLogin: true
          })
        }
      })
    },
    checkPath (path) {
      console.log(path)
      this.subPath = path.startsWith('/page')
    }
  }
}
</script>

<style>

</style>
