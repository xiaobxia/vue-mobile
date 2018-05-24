<template>
  <div>
    <mt-header title="基金" :fixed="true">
      <mt-button slot="right" @click="toPath('/page/search')">
        <i class="fas fa-search"></i>
      </mt-button>
    </mt-header>
    <div class="main-body has-bar">
      <div class="img-card" @click="toPath('/page/myNetValueLine')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <i class="fas fa-chart-area"></i>
          </div>
          <div class="bottom">净值曲线</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/myFund')">
        <!--<img src="../../assets/Desert-miniplanet.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <i class="fab fa-shirtsinbulk"></i>
          </div>
          <div class="bottom">基金持仓</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/strategy')">
        <!--<img src="../../assets/800_600_dribbble_icons.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <i class="fab fa-sellsy"></i>
          </div>
          <div class="bottom">幅度策略</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/averageStrategy')">
        <!--<img src="../../assets/800_600_dribbble_icons.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <i class="fas fa-balance-scale"></i>
          </div>
          <div class="bottom">均线策略</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/myStrategy')">
        <div class="container">
          <div class="content">
            <i class="fab fa-keycdn"></i>
          </div>
          <div class="bottom">持仓分析</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/market')">
        <div class="container">
          <div class="content">
            <i class="fab fa-cloudversify"></i>
          </div>
          <div class="bottom">市场行情</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/analyzeConfig')">
        <div class="container">
          <div class="content">
            <i class="fas fa-cogs"></i>
          </div>
          <div class="bottom">分析配置</div>
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
