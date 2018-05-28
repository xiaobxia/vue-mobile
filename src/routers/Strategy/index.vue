<template>
  <div class="schedule">
    <mt-header title="幅度策略" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">超跌</mt-tab-item>
        <mt-tab-item id="2">追涨</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <strategy-list :listData="strategyListSlump"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <strategy-list :listData="strategyListBoom"/>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
import StrategyList from '@/components/StrategyList.vue'
import storageUtil from '@/util/storageUtil.js'
export default {
  name: 'Strategy',
  data () {
    const selected = storageUtil.getAppConfig('strategySelected') || '1'
    return {
      strategyListSlump: [],
      strategyListBoom: [],
      selected: selected
    }
  },
  components: {StrategyList},
  computed: {},
  watch: {
    selected (val) {
      storageUtil.setAppConfig('strategySelected', val)
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      Http.get('strategy/getStrategy').then((data) => {
        this.strategyListSlump = data.data.slump
        this.strategyListBoom = data.data.boom
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
