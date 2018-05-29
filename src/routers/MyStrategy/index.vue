<template>
  <div class="schedule">
    <mt-header title="持仓分析" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <strategy-list :listData="myStrategyList"/>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
import StrategyList from '@/components/StrategyList.vue'
import { Indicator } from 'mint-ui'

export default {
  name: 'Strategy',
  data () {
    return {
      myStrategyList: []
    }
  },
  components: {StrategyList},
  computed: {},
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      Indicator.open({
        spinnerType: 'fading-circle'
      })
      Http.get('strategy/getMyStrategy').then((data) => {
        Indicator.close()
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
