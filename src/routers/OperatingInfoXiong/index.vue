<template>
  <div class="operating-info">
    <mt-header :title="'操作分析-熊-'+buyNumber" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <operating-warn
        :buyCount="buyCount"
        :sellCount="sellCount"
        :countUpNumber="countUpNumber"
        :countDownNumber="countDownNumber"
        :sellCountLastDay="sellCountLastDay"
        :buyCountLastDay="buyCountLastDay"
        :nowMonthRate="nowMonthRate"
      />
      <operating-info-item
        v-for="(item) in list"
        :key="item.code"
        :indexInfo="item"
        :toUrl="'/page/indexDetailXiong?'+qsStringify(item)"
        :hasCount="hasCount[item.name]"
        :rate="rateMap[item.key]"
        :buySellList="buySellMap[item.key]"
        :lock="lockMap[item.name]"
        :marketWarn="marketWarnMap[item.key]"
        :positionWarn="positionWarnMap[item.key]"
        :netChangeRatioList="netChangeRatioMap[item.key]"
        :lowSell="lowSellMap[item.key]"
      />
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import indexInfoUtilXiong from '@/util/indexInfoUtilXiong.js'
import qs from 'qs'
import numberUtil from '@/util/numberUtil.js'
import storageUtil from '@/util/storageUtil.js'
import stockDataUtil from '@/util/stockDataUtil.js'
import operatingTooltip from '@/util/operatingTooltip.js'
import OperatingInfoItem from '@/components/OperatingInfoItem.vue'
import OperatingWarn from '@/components/OperatingWarn.vue'

const codeMap = indexInfoUtilXiong.codeMap
const InfoUtil = indexInfoUtilXiong.Util
const fnMap = indexInfoUtilXiong.fnMap
const formatData = indexInfoUtilXiong.formatData

const marketStatus = storageUtil.getMarketStatus('question_1') || '强'

export default {
  name: 'OperatingInfoXiong',
  data () {
    let buySellMap = {}
    let netChangeRatioMap = {}
    let lowSellMap = {}
    let list = []
    let firstClass = {}
    let marketWarnMap = {}
    let positionWarnMap = {}
    let rateMap = {}
    let lockMap = {}
    let hasCount = {}
    for (let key in codeMap) {
      list.push({
        ...codeMap[key],
        key: key,
        goodBad: storageUtil.getGoodBad(codeMap[key].name) || '无'
      })
      buySellMap[key] = []
      netChangeRatioMap[key] = []
      firstClass[key] = ''
      marketWarnMap[key] = ''
      lowSellMap[key] = false
      positionWarnMap[key] = ''
      rateMap[key] = 0
      lockMap[codeMap[key].name] = false
      hasCount[codeMap[key].name] = 0
    }
    return {
      list: list,
      buySellMap,
      netChangeRatioMap,
      firstClass,
      rateMap,
      lockMap,
      hasCount,
      marketWarnMap,
      lowSellMap,
      positionWarnMap,
      myAsset: 10000,
      // 持有金额，不计入定投
      totalSum: 10000,
      marketStatus,
      nowMonthRate: 0
    }
  },
  components: {OperatingInfoItem, OperatingWarn},
  computed: {
    buyNumber () {
      return operatingTooltip.getBuyNumber(1.5, this.myAsset)
    },
    buyCount () {
      return this.countFlag(this.buySellMap, 0, 'buy')
    },
    sellCount () {
      return this.countFlag(this.buySellMap, 0, 'sell')
    },
    buyCountLastDay () {
      return this.countFlag(this.buySellMap, 1, 'buy')
    },
    sellCountLastDay () {
      return this.countFlag(this.buySellMap, 1, 'sell')
    },
    countUpNumber () {
      let count = 0
      for (let key in this.rateMap) {
        if (this.rateMap[key] > 0) {
          count++
        }
      }
      return count
    },
    countDownNumber () {
      let count = 0
      for (let key in this.rateMap) {
        if (this.rateMap[key] < 0) {
          count++
        }
      }
      return count
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      let list = this.list
      Http.get('fund/getUserNetValueNowMonthRate').then((res) => {
        this.nowMonthRate = res.data.rate
      })
      Http.get('fund/getUserLastNetValue').then((res) => {
        const nowNetValue = res.data.record
        if (nowNetValue) {
          this.myAsset = nowNetValue.asset
        }
      })
      Http.get('fund/getUserFundsNormal').then((data) => {
        if (data.success) {
          const list = data.data.list
          let totalSum = 0
          for (let i = 0; i < list.length; i++) {
            const item = list[i]
            if (item.theme) {
              // 定投不计入
              if (item.strategy === '1') {
                totalSum += item.sum
                if (this.ifLock(item)) {
                  if (this.lockMap[item.theme] !== '') {
                    this.lockMap[item.theme] = true
                  }
                } else {
                  this.lockMap[item.theme] = false
                }
                // 拥有应该是现在的价值之和而不是成本
                const sum = parseInt(item.sum)
                if (this.hasCount[item.theme]) {
                  this.hasCount[item.theme] += sum
                } else {
                  this.hasCount[item.theme] = sum
                }
              }
            }
          }
          this.totalSum = totalSum
        }
        for (let i = 0; i < list.length; i++) {
          this.queryData(list[i])
        }
      })
    },
    qsStringify (query) {
      return qs.stringify(query)
    },
    queryData (item) {
      Http.getWithCache(`webData/${stockDataUtil.getAllUrl()}`, {
        code: item.code,
        days: 10
      }, {interval: 60}).then((data) => {
        if (data.success) {
          const list = data.data.list
          const recentNetValue = formatData(list).list
          const infoUtil = new InfoUtil(item)
          /**
           * 生成近几日的买卖信号
           * 近的在前
           */
          let buySellList = []
          let netChangeRatioList = []
          let closeList = []
          for (let i = 0; i < 8; i++) {
            const nowRecord = recentNetValue[i]
            const oneDayRecord = recentNetValue[i + 1]
            const twoDayRecord = recentNetValue[i + 2]
            let buyFlag = infoUtil[fnMap[item.key + 'Buy']](nowRecord, oneDayRecord, twoDayRecord)
            let sellFlag = infoUtil[fnMap[item.key + 'Sell']](nowRecord, oneDayRecord, twoDayRecord)
            if (i < 5) {
              netChangeRatioList[i] = recentNetValue[i].netChangeRatio
              closeList[i] = recentNetValue[i].close
              if ((buyFlag === true) || (buyFlag !== false && buyFlag.flag === true)) {
                buySellList[i] = 'buy'
              } else if ((sellFlag === true) || (sellFlag !== false && sellFlag.flag === true)) {
                buySellList[i] = 'sell'
              } else {
                buySellList[i] = ''
              }
            }
          }
          /**
           * 生成市场风险提示
           */
          const netChangeRatio = recentNetValue[0].netChangeRatio
          this.marketWarnMap[item.key] = operatingTooltip.getMarketWarn(netChangeRatio, buySellList)
          this.positionWarnMap[item.key] = operatingTooltip.getPositionWarn(item, this.myAsset, this.totalSum, this.hasCount[item.name])
          this.buySellMap[item.key] = buySellList
          this.lowSellMap[item.key] = operatingTooltip.ifLowSell(buySellList, closeList)
          this.netChangeRatioMap[item.key] = netChangeRatioList
          this.firstClass[item.key] = buySellList[0]
          this.rateMap[item.key] = numberUtil.keepTwoDecimals(recentNetValue[0].netChangeRatio)
        }
      })
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    countFlag (buySellListMap, index, type) {
      let count = 0
      for (let key in buySellListMap) {
        if (buySellListMap[key][index] === type) {
          count++
        }
      }
      return count
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
