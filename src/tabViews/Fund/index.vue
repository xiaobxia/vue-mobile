<template>
  <div>
    <mt-header title="基金" :fixed="true"/>
    <div class="main-body has-bar">
      <div class="img-card" @click="toPath('/page/indexDifference')">
        <!--<img src="../../assets/800_600_dribbble_icons.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/相对标准偏差.png" alt="">
            <!--<i class="fab fa-sellsy"></i>-->
          </div>
          <div class="bottom">差价策略</div>
        </div>
      </div>
      <!--<div class="img-card" @click="toPath('/page/filterFund')">-->
        <!--&lt;!&ndash;<img src="../../assets/800_600_dribbble_icons.jpg" alt="">&ndash;&gt;-->
        <!--<div class="container">-->
          <!--<div class="content">-->
            <!--<i class="fas fa-filter"></i>-->
          <!--</div>-->
          <!--<div class="bottom">筛选基金</div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="img-card" @click="toPath('/page/market')">
        <div class="container">
          <div class="content">
            <img src="../../assets/行情.png" alt="">
            <!--<i class="fab fa-cloudversify"></i>-->
          </div>
          <div class="bottom">市场行情</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/operatingInfoJian')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/卖出记录.png" alt="">
            <!--<i class="fas fa-allergies"></i>-->
          </div>
          <div class="bottom">操作分析-简</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/operatingInfoXiong')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/熊市.png" alt="">
            <!--<i class="fas fa-allergies"></i>-->
          </div>
          <div class="bottom">操作分析-熊</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/changeMarket')">
        <!--<img src="../../assets/800_600_dribbble_icons.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/变脸.png" alt="">
            <!--<i class="fab fa-sellsy"></i>-->
          </div>
          <div class="bottom">变盘策略</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/todayIndex')">
        <div class="container">
          <div class="content">
            <img src="../../assets/今日.png" alt="">
            <!--<i class="fab fa-cloudversify"></i>-->
          </div>
          <div class="bottom">今日指数</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/strategy')">
        <!--<img src="../../assets/800_600_dribbble_icons.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/策略-选中.png" alt="">
            <!--<i class="fab fa-sellsy"></i>-->
          </div>
          <div class="bottom">幅度策略</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/averageStrategy')">
        <!--<img src="../../assets/800_600_dribbble_icons.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/均线买卖.png" alt="">
            <!--<i class="fas fa-balance-scale"></i>-->
          </div>
          <div class="bottom">均线策略</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/rank')">
        <div class="container">
          <div class="content">
            <img src="../../assets/排行榜.png" alt="">
            <!--<i class="fas fa-sort-amount-up"></i>-->
          </div>
          <div class="bottom">近期排行</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/principle')">
        <div class="container">
          <div class="content">
            <img src="../../assets/保险条款.png" alt="">
            <!--<i class="fas fa-book"></i>-->
          </div>
          <div class="bottom">买卖原则</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/operatingInfo')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/我的-策略.png" alt="">
            <!--<i class="fas fa-allergies"></i>-->
          </div>
          <div class="bottom">操作分析</div>
        </div>
      </div>
      <!--<div class="img-card" @click="toPath('/page/plate')">-->
        <!--&lt;!&ndash;<img src="../../assets/timg.jpg" alt="">&ndash;&gt;-->
        <!--<div class="container">-->
          <!--<div class="content">-->
            <!--<i class="fas fa-th"></i>-->
          <!--</div>-->
          <!--<div class="bottom">板块走势</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="img-card" @click="toPath('/page/indexInfo')">-->
        <!--&lt;!&ndash;<img src="../../assets/timg.jpg" alt="">&ndash;&gt;-->
        <!--<div class="container">-->
          <!--<div class="content">-->
            <!--<i class="fas fa-chart-line"></i>-->
          <!--</div>-->
          <!--<div class="bottom">指数分析</div>-->
        <!--</div>-->
      <!--</div>-->
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
