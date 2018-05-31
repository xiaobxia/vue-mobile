<template>
  <div class="login-wrap">
    <h3>my mobile console</h3>
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

<script>
import Http from '@/util/httpUtil.js'
import md5 from 'md5'
import storageUtil from '@/util/storageUtil.js'
import Toast from '@/common/toast.js'

export default {
  name: 'Login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  computed: {},
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
    },
    loginHandler () {
      Http.post('auth/login', {account: this.account, password: md5(this.password), platform: 'pc'}).then((data) => {
        if (data.success) {
          window._token = data.data.token
          localStorage.setItem('token', data.data.token)
          this.$router.push('/')
          storageUtil.initUserInfo({
            ...data.data,
            isLogin: true
          })
          Toast.success('登录成功')
        } else {
          Toast.error(data.message)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body{
    background-color: #fff;
  }
</style>
