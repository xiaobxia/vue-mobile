<template>
  <div id="app">
    <template v-if="loginUser.isLogin === false">
      <div class="login-wrap">
        <div class="input-item">
          <input type="text" v-model="account">
        </div>
        <div class="input-item">
          <input type="text" v-model="password">
        </div>
        <div class="input-item">
          <mt-button type="primary" @click="loginHandler">登录</mt-button>
        </div>
      </div>
    </template>
    <template v-else>
      <router-view v-if="subPath"/>
      <template v-else>
        <fund v-if="tabSelect === 'fund'"/>
        <schedule v-if="tabSelect === 'schedule'"/>
        <mt-tabbar v-model="tabSelect" :fixed="true">
          <mt-tab-item id="fund">
            <i class="fab fa-bitcoin" slot="icon"></i>
            <p>基金</p>
          </mt-tab-item>
          <mt-tab-item id="schedule">
            <i class="fas fa-calendar-alt" slot="icon"></i>
            <p>定时任务</p>
          </mt-tab-item>
          <mt-tab-item id="square">
            <i class="fab fa-safari" slot="icon"></i>
            <p>广场</p>
          </mt-tab-item>
          <mt-tab-item id="mine">
            <i class="fas fa-user" slot="icon"></i>
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
import Http from '@/util/httpUtil.js'
import md5 from 'md5'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      tabSelect: 'fund',
      subPath: false,
      loginUser: {
        isLogin: true
      },
      account: '',
      password: ''
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
          this.loginUser = {
            isLogin: false
          }
        } else {
          this.loginUser = data.data
        }
      })
    },
    checkPath (path) {
      console.log(path)
      this.subPath = path.startsWith('/page')
    },
    loginHandler () {
      Http.post('auth/login', {account: this.account, password: md5(this.password), platform: 'pc'}).then((data) => {
        if (data.success) {
          window._token = data.data.token
          localStorage.setItem('token', data.data.token)
          this.loginUser = {
            name: data.data.name,
            isLogin: true
          }
          Toast({
            message: '登录成功',
            iconClass: 'icon icon-success'
          })
        } else {
          Toast({
            message: data.message,
            iconClass: 'icon icon-success'
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
