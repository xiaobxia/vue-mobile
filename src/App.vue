<template>
  <div id="app">
    <img src="./assets/logo.png">
    <mt-tabbar v-model="tabSelect">
      <mt-tab-item id="fund">
        <i class="fas fa-camera-retro" slot="icon"></i>
        净值
      </mt-tab-item>
      <mt-tab-item id="订单">
        订单
      </mt-tab-item>
      <mt-tab-item id="发现">
        发现
      </mt-tab-item>
      <mt-tab-item id="我的">
        我的
      </mt-tab-item>
    </mt-tabbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabSelect: 'fund'
    }
  },
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
