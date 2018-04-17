<template>
  <div>
    <mt-header title="基金" :fixed="true"/>
    <div class="main-body has-bar">
      <div class="img-card" @click="toPath('/page/myNetValueLine')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="bottom">净值曲线</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/myFund')">
        <!--<img src="../../assets/Desert-miniplanet.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <i class="fas fa-shopping-bag"></i>
          </div>
          <div class="bottom">基金持仓</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/strategy')">
        <!--<img src="../../assets/800_600_dribbble_icons.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <i class="fas fa-crosshairs"></i>
          </div>
          <div class="bottom">买入策略</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/utilAdd')">
        <div class="container">
          <div class="content">
            <i class="fas fa-calculator"></i>
          </div>
          <div class="bottom">加仓工具</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fund',
  data () {
    return {}
  },
  mounted () {
    this.initPage()
  },

  methods: {
    initPage () {

    },
    toPath (path) {
      this.$router.push(path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-body {
    padding: 30px;
  }
</style>
