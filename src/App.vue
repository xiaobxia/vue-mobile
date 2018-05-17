<template>
  <div id="app">
      <router-view v-if="subPath"/>
      <template v-else>
        <fund v-if="tabSelect === 'fund'"/>
        <schedule v-if="tabSelect === 'schedule'"/>
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
  </div>
</template>

<script>
import Schedule from './tabViews/Schedule/index.vue'
import Fund from './tabViews/Fund/index.vue'
import Http from '@/util/httpUtil.js'

export default {
  data () {
    return {
      tabSelect: 'fund',
      subPath: false
    }
  },
  components: {Schedule, Fund},
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
        window._token = data.data.token
        if (data.data.isLogin === false) {
          this.$router.push('/page/login')
        } else {
          // this.loginUser = data.data
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
