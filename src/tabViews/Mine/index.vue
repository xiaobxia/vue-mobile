<template>
  <div class="tabView-mine has-bar">
    <mt-header title="我的" :fixed="true"/>
    <div class="main-body">
      <div class="info-wrap">
        <img class="b-g" src="../../assets/wallhaven-683638.jpg" alt="">
        <div class="mask"></div>
        <div class="user-img-wrap">
          <img src="../../assets/头像.png" alt="">
        </div>
        <h3 class="user-name">{{userName}}</h3>
      </div>
    </div>
    <div class="my-info-wrap simple large">
      <mt-cell-swipe :to="'/page/myFund'" is-link>
        <div slot="title">
          <h3><i class="fab fa-shirtsinbulk"></i>我的持仓</h3>
        </div>
      </mt-cell-swipe>
      <mt-cell-swipe :to="'/page/myStrategy'" is-link>
        <div slot="title">
          <h3><i class="fab fa-keycdn"></i>持仓分析</h3>
        </div>
      </mt-cell-swipe>
      <mt-cell-swipe :to="'/page/myProportion'" is-link>
        <div slot="title">
          <h3><i class="fas fa-chart-pie"></i>持仓占比</h3>
        </div>
      </mt-cell-swipe>
      <mt-cell-swipe :to="'/page/myNetValueLine'" is-link>
        <div slot="title">
          <h3><i class="fas fa-chart-area"></i>净值管理</h3>
        </div>
      </mt-cell-swipe>
      <mt-cell-swipe :to="'/page/incomeAll'" is-link>
        <div slot="title">
          <h3><i class="fas fa-hand-holding-usd"></i>总收益</h3>
        </div>
      </mt-cell-swipe>
    </div>
    <div class="btn-wrap">
      <mt-button type="primary" @click="okHandler" class="main-btn">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import Toast from '@/common/toast.js'
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
          localStorage.removeItem('token')
          storageUtil.initUserInfo({
            isLogin: false
          })
          this.$router.push('/page/login')
        } else {
          Toast.error('操作失败')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
