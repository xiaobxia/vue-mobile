<template>
  <div>
    <mt-header title="基金" :fixed="true"/>
    <div class="main-body has-bar">
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
      <div class="img-card" @click="toPath('/page/market')">
        <div class="container">
          <div class="content">
            <i class="fab fa-cloudversify"></i>
          </div>
          <div class="bottom">市场行情</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/rank')">
        <div class="container">
          <div class="content">
            <i class="fas fa-sort-amount-up"></i>
          </div>
          <div class="bottom">近期排行</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/plate')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <i class="fas fa-th"></i>
          </div>
          <div class="bottom">板块走势</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/indexInfo')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="bottom">指数分析</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/operatingInfo')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <i class="fas fa-allergies"></i>
          </div>
          <div class="bottom">操作分析</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/principle')">
        <div class="container">
          <div class="content">
            <i class="fas fa-book"></i>
          </div>
          <div class="bottom">买卖原则</div>
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
