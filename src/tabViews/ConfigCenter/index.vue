<template>
  <div>
    <mt-header title="配置中心" :fixed="true"/>
    <div class="main-body has-bar">
      <div class="img-card" @click="toPath('/page/schedule')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/定时.png" alt="">
            <!--<i class="far fa-calendar-alt"></i>-->
          </div>
          <div class="bottom">定时任务</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/analyzeConfig')">
        <div class="container">
          <div class="content">
            <img src="../../assets/配置.png" alt="">
            <!--<i class="fas fa-cogs"></i>-->
          </div>
          <div class="bottom">分析配置</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/dataConfig')">
        <div class="container">
          <div class="content">
            <img src="../../assets/数据.png" alt="">
            <!--<i class="fas fa-database"></i>-->
          </div>
          <div class="bottom">数据配置</div>
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
      <div class="img-card" @click="toPath('/page/myAsset')">
        <div class="container">
          <div class="content">
            <img src="../../assets/资产管理.png" alt="">
            <!--<i class="fas fa-book"></i>-->
          </div>
          <div class="bottom">资产管理</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/positionCount')">
        <div class="container">
          <div class="content">
            <img src="../../assets/仓位.png" alt="">
            <!--<i class="fas fa-book"></i>-->
          </div>
          <div class="bottom">仓位推算</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigCenter',
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
