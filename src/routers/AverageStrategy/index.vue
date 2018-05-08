<template>
  <div class="schedule">
    <mt-header title="均线策略" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">上行</mt-tab-item>
        <mt-tab-item id="2">反转</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-cell-swipe v-for="(item) in list1" :key="item.code" :to="'/page/fundDetail?code='+item.code" :class="item.has?'grey-back':''">
            <div slot="title">
              <h3>{{item.code}} {{formatName(item.name)}} <span style="float: right"
                                                                :class="item.valuationRate < 0 ? 'green-text' : 'red-text'">{{item.valuationRate}}%</span></h3>
              <p class="explain">
                <mt-badge v-if="item.toUp" color="rgb(255, 147, 22)">突破</mt-badge>
              </p>
            </div>
          </mt-cell-swipe>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-cell-swipe v-for="(item) in list2" :key="item.code" :to="'/page/fundDetail?code='+item.code" :class="item.has?'grey-back':''">
            <div slot="title">
              <h3>{{item.code}} {{formatName(item.name)}} <span style="float: right"
                                                                :class="item.valuationRate < 0 ? 'green-text' : 'red-text'">{{item.valuationRate}}%</span></h3>
            </div>
          </mt-cell-swipe>
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
  name: 'AverageStrategy',
  data () {
    const selected = storageUtil.getAppConfig('averageStrategySelected') || '1'
    return {
      list1: [],
      list2: [],
      selected: selected
    }
  },
  components: {StrategyList},
  computed: {},
  watch: {
    selected (val) {
      storageUtil.setAppConfig('averageStrategySelected', val)
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      Http.get('strategy/getAverageStrategy').then((data) => {
        const list = data.data.result
        let list1 = []
        let list2 = []
        list.forEach((item) => {
          if (item.isUp) {
            list1.push(item)
          }
          if (item.isReverse) {
            list2.push(item)
          }
        })
        this.list1 = list1
        this.list2 = list2
      })
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    formatName (name) {
      if (name.length > 12) {
        return name.substr(0, 11) + '...'
      } else {
        return name
      }
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
