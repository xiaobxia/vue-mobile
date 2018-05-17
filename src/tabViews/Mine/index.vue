<template>
  <div class="tabView-mine">
    <mt-header title="我的" :fixed="true"/>
    <div class="main-body">
      <h3 class="user-name">{{userName}}</h3>
    </div>
      <mt-button type="primary" @click="okHandler" class="main-btn">退出登录</mt-button>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import {Toast} from 'mint-ui'
import storageUtil from '@/util/storageUtil.js'

export default {
  name: 'Mine',
  data () {
    const userInfo = storageUtil.getUserInfo()
    return {
      userName: userInfo.name
    }
  },
  computed: {},
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
    },
    okHandler () {
      Http.get('auth/logout', {token: window._token, platform: 'mobile'}).then((data) => {
        if (data.success) {
          storageUtil.initUserInfo({
            isLogin: false
          })
          this.$router.push('/page/login')
        } else {
          Toast({
            message: '操作失败',
            iconClass: 'icon far fa-frown',
            className: 'error'
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
