<template>
  <div class="schedule">
    <mt-header title="策略" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">超跌</mt-tab-item>
      <mt-tab-item id="2">追涨</mt-tab-item>
      <mt-tab-item id="3">我的</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <strategy-list :listData="strategyListSlump"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <strategy-list :listData="strategyListBoom"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <strategy-list :listData="myStrategyList"/>
      </mt-tab-container-item>
    </mt-tab-container>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
import StrategyList from '@/components/StrategyList.vue'
export default {
  name: 'Strategy',
  data () {
    return {
      strategyListSlump: [],
      strategyListBoom: [],
      myStrategyList: [],
      selected: '1'
    }
  },
  components: {StrategyList},
  computed: {
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      Http.get('strategy/getStrategy').then((data) => {
        console.log(data)
        this.strategyListSlump = data.data.slump
        this.strategyListBoom = data.data.boom
      })
      Http.get('strategy/getMyStrategy').then((data) => {
        console.log(data)
        this.myStrategyList = data.data.strategy
      })
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    countValue (a, b) {
      return numberUtil.keepTwoDecimals(a - b)
    },
    countRate (a, b) {
      return numberUtil.countDifferenceRate(a, b)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
