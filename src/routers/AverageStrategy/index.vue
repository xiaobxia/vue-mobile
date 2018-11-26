<template>
  <div class="average-strategy">
    <mt-header title="均线策略" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="info">
        平均幅度: <span style="float: right"
                    :class="numberClass(average)">{{average}}%</span>
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">上行</mt-tab-item>
        <mt-tab-item id="2">反转</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1" class="simple">
          <mt-cell-swipe v-for="(item) in upList" :key="item.code" :to="'/page/fundDetail?code='+item.code" :class="item.has?'has-back':''">
            <div slot="title">
              <h3 :class="{lowRate: item.lowRate}">{{item.code}} {{formatName(item.name)}} <span style="float: right"
                                                                :class="numberClass(item.valuationRate)">{{item.valuationRate}}%</span></h3>
              <p class="explain">
                <mt-badge v-if="item.toUp" color="rgb(255, 147, 22)">突破</mt-badge>
              </p>
            </div>
          </mt-cell-swipe>
        </mt-tab-container-item>
        <mt-tab-container-item id="2" class="simple">
          <mt-cell-swipe v-for="(item) in reverseList" :key="item.code" :to="'/page/fundDetail?code='+item.code" :class="item.has?'has-back':''">
            <div slot="title">
              <h3 :class="{lowRate: item.lowRate}">{{item.code}} {{formatName(item.name)}} <span style="float: right"
                                                                :class="numberClass(item.valuationRate)">{{item.valuationRate}}%</span></h3>
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
import { Indicator } from 'mint-ui'

export default {
  name: 'AverageStrategy',
  data () {
    const selected = storageUtil.getAppConfig('averageStrategySelected') || '1'
    return {
      upList: [],
      reverseList: [],
      selected: selected,
      average: 0
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
      Indicator.open({
        spinnerType: 'fading-circle'
      })
      Http.get('strategy/getAverageStrategy').then((data) => {
        Indicator.close()
        const list = data.data.result
        let upList = []
        let reverseList = []
        let toUpList = []
        let average = 0
        list.forEach((item) => {
          if (item.toUp) {
            toUpList.push(item)
            average += item.valuationRate
          } else if (item.isUp) {
            upList.push(item)
            average += item.valuationRate
          }
          if (item.isReverse) {
            reverseList.push(item)
          }
        })
        this.upList = toUpList.concat(upList)
        this.reverseList = reverseList
        this.average = numberUtil.keepTwoDecimals(average / this.upList.length)
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
