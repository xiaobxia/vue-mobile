<template>
  <div class="operating-info">
    <mt-header title="差价策略" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-cell-swipe>
        <div slot="title">
          <h3>
            创业
            <span style="float: right" :class="chuangyeRate < 0 ? 'green-text' : 'red-text'">{{chuangyeRate}}%</span>
          </h3>
          <p class="explain">
            <span v-for="(subItem, index) in chuangyeBuySell" :key="subItem + index"
                  :class="subItem === '买'?'buy':subItem === '卖'?'sell':''">{{subItem}}</span>
          </p>
        </div>
      </mt-cell-swipe>
      <mt-cell-swipe>
        <div slot="title">
          <h3>
            50
            <span style="float: right" :class="wulinRate < 0 ? 'green-text' : 'red-text'">{{wulinRate}}%</span>
          </h3>
          <p class="explain">
            <span v-for="(subItem, index) in wulinBuySell" :key="subItem + index"
                  :class="subItem === '买'?'buy':subItem === '卖'?'sell':''">{{subItem}}</span>
          </p>
        </div>
      </mt-cell-swipe>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import Toast from '@/common/toast.js'
import qs from 'qs'
import numberUtil from '@/util/numberUtil.js'
import storageUtil from '@/util/storageUtil.js'

const dataWay = storageUtil.getAppConfig('dataWay') || '中金'
const dataRawList = {
  '中金': 'getWebStockdaybarAllZhongjin',
  '股市通': 'getWebStockdaybarAllGushitong',
  '东方': 'getWebStockdaybarDongfang'
}

export default {
  name: 'IndexDifference',
  data () {
    return {
      wulin: [],
      wulinRate: 0,
      wulinBuySell: [],
      chuangye: [],
      chuangyeRate: 0,
      chuangyeBuySell: []
    }
  },
  computed: {
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      Promise.all([
        Http.get(`webData/${dataRawList[dataWay]}`, {
          code: 'sz399006',
          days: 200
        }).then((data) => {
          if (data.success) {
            const list = data.data.list
            this.chuangye = list
          }
        }),
        Http.get(`webData/${dataRawList[dataWay]}`, {
          code: 'sh000016',
          days: 200
        }).then((data) => {
          if (data.success) {
            const list = data.data.list
            this.wulin = list
          }
        })
      ]).then(() => {
        this.renderBuySell()
      })
    },
    qsStringify (query) {
      return qs.stringify(query)
    },
    renderBuySell () {
      const wulin = this.wulin
      const chuangye = this.chuangye
      const rateChuangye = 0.94
      const rateWulin = 0.73
      let chuangyeBuySell = []
      let wulinBuySell = []
      // 近的在前
      for (let i = 0; i < 18; i++) {
        const chuangyeRate = chuangye[i].kline['netChangeRatio']
        const wulinRate = wulin[i].kline['netChangeRatio']
        let bigRateChuangye = Math.abs(chuangyeRate - wulinRate) > rateChuangye * 2
        let bigRateWulin = Math.abs(chuangyeRate - wulinRate) > rateWulin * 2
        let tempFlag = Math.abs(chuangyeRate - wulinRate) > rateChuangye
        let chuangyeFlag = ''
        let wulinFlag = ''
        if (i < 5) {
          if (tempFlag && chuangyeRate > 0 && chuangyeRate > wulinRate && chuangyeRate > rateChuangye) {
            chuangyeFlag = '卖'
          } else if (bigRateChuangye && chuangyeRate < 0 && chuangyeRate < wulinRate && chuangyeRate < -rateChuangye) {
            chuangyeFlag = '买'
          } else if (bigRateWulin && wulinRate > 0 && wulinRate > chuangyeRate && wulinRate > rateWulin) {
            wulinFlag = '卖'
          } else if (bigRateWulin && wulinRate < 0 && wulinRate < chuangyeRate && wulinRate < -rateWulin) {
            wulinFlag = '买'
          }
          chuangyeBuySell[i] = chuangyeFlag
          wulinBuySell[i] = wulinFlag
        }
      }
      this.chuangyeBuySell = chuangyeBuySell
      this.wulinBuySell = wulinBuySell
      this.wulinRate = wulin[0].kline['netChangeRatio']
      this.chuangyeRate = chuangye[0].kline['netChangeRatio']
    },
    backHandler () {
      this.$router.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
