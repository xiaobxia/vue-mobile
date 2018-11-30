<template>
  <div class="my-fund">
    <mt-header :title="'我的持仓 - ' + fundNumber" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="info-wrap">
        <span class="item">持仓金额：{{parseInt(info.totalSum)}}</span>
        <span class="item">持仓成本：{{parseInt(info.costTotalSum)}}</span>
        <span class="item">仓位信息：{{myPosition}}%</span>
        <span class="item">估算金额：{{parseInt(info.valuationTotalSum)}}</span>
        <span class="item">新仓金额：{{parseInt(newCost)}}</span>
        <span class="item">新仓收益：<span :class="numberClass(newRate)">{{newRate}}%</span></span>
        <span class="item">估算收益：<span :class="numberClass(valuationInfo)">{{parseInt(valuationInfo)}}</span></span>
        <span class="item">估算比率：<span :class="numberClass(myRate)">{{myRate}}%</span></span>
        <span class="item">相对波动：<span :class="numberClass(relativeRate)">{{relativeRate}}%</span></span>
        <span class="item">市场平均：<span :class="numberClass(marketRate)">{{marketRate}}%</span></span>
        <span class="item">沪深300：<span :class="numberClass(hushenRate)">{{hushenRate}}%</span></span>
        <span class="item">创业板：<span :class="numberClass(chuangyeRate)">{{chuangyeRate}}%</span></span>
        <span class="item">上证50：<span :class="numberClass(wulinRate)">{{wulinRate}}%</span></span>
      </div>
      <div class="lastUpdateValuationTime">更新于：{{lastUpdateValuationTime}}</div>
      <my-fund-card  v-for="(item) in cardInfo" :key="item.name"  :listData="item.list" :title="item.name"/>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
import MyFundCard from '@/components/MyFundCard.vue'
import fundAccountUtil from '@/util/fundAccountUtil.js'
import indexInfoUtil from '@/util/indexInfoUtilXiong.js'
import storageUtil from '@/util/storageUtil.js'

const dataWay = storageUtil.getAppConfig('dataWay') || '中金'
const dataRawList = {
  '中金': 'getWebStockdaybarTodayZhongjin',
  '股市通': 'getWebStockdaybarTodayZhongjin',
  '东方': 'getWebStockdaybarTodayDongfang'
}

const codeMap = indexInfoUtil.codeMap
export default {
  name: 'MyFund',
  data () {
    let cardInfo = []
    for (let key in codeMap) {
      cardInfo.push({
        name: codeMap[key].name,
        list: []
      })
    }
    cardInfo.push({
      name: '其他',
      list: []
    })
    cardInfo.push({
      name: '定投',
      list: []
    })
    return {
      info: {
        valuationTotalSum: 0,
        totalSum: 0,
        costTotalSum: 0
      },
      list: [],
      timer: null,
      marketRate: 0,
      myRate: 0,
      newRate: 0,
      myAsset: 10000,
      cardInfo,
      hushenRate: 0,
      wulinRate: 0,
      chuangyeRate: 0,
      lastUpdateValuationTime: '',
      fundNumber: 0,
      newCost: 0
    }
  },
  components: {MyFundCard},
  computed: {
    // 持仓当日收益率
    valuationInfo () {
      if (this.info.valuationTotalSum && this.info.totalSum) {
        return numberUtil.keepTwoDecimals(this.info.valuationTotalSum - this.info.totalSum)
      } else {
        return 0
      }
    },
    // 仓位信息
    myPosition () {
      if (this.info.totalSum) {
        return numberUtil.countRate(this.info.totalSum, this.myAsset)
      } else {
        return 0
      }
    },
    // 相对收益
    relativeRate () {
      if (this.info.valuationTotalSum && this.info.totalSum) {
        const income = numberUtil.keepTwoDecimals(this.info.valuationTotalSum - this.info.totalSum)
        return numberUtil.countRate(income, this.myAsset)
      } else {
        return 0
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.timer = setInterval(() => {
      this.initPage()
    }, 1000 * 60)
    this.initPage()
    this.queryMyNetValue()
  },
  methods: {
    initPage () {
      let dataMap = {}
      for (let key in codeMap) {
        dataMap[codeMap[key].name] = []
      }
      dataMap['其他'] = []
      dataMap['定投'] = []
      Http.get('fund/getUserFunds').then((data) => {
        const info = data.data.info
        this.info = info
        const list = data.data.list
        let newCost = 0
        let newValuation = 0
        this.fundNumber = list.length
        list.forEach((item) => {
          // 处于锁仓
          const unLockInfo = fundAccountUtil.getUnLockInfo(item)
          newCost += unLockInfo.totalCost
          newValuation += unLockInfo.shares * item.valuation
          // 防止基金有主题，但是主题已经被删除的情况
          if (item.strategy !== '1') {
            dataMap['定投'].push(item)
          } else {
            if (item.theme && dataMap[item.theme]) {
              dataMap[item.theme].push(item)
            } else {
              dataMap['其他'].push(item)
            }
          }
        })
        for (let i = 0; i < this.cardInfo.length; i++) {
          this.cardInfo[i].list = dataMap[this.cardInfo[i].name]
        }
        this.newCost = newCost
        this.newRate = numberUtil.countDifferenceRate(newValuation, newCost)
        this.myRate = numberUtil.countDifferenceRate(info.valuationTotalSum, info.totalSum)
      })
      // 获取市场平均涨幅
      Http.get('fund/getMarketInfo').then((data) => {
        this.marketRate = data.data.info.rate
      })
      // 沪深300
      Http.getWithCache(`webData/${dataRawList[dataWay]}`, {
        code: 'sz399300'
      }, {interval: 60}).then((data) => {
        if (data.success) {
          this.hushenRate = data.data.netChangeRatio
        }
      })
      // 创业板
      Http.getWithCache(`webData/${dataRawList[dataWay]}`, {
        code: 'sz399006'
      }, {interval: 60}).then((data) => {
        if (data.success) {
          this.chuangyeRate = data.data.netChangeRatio
        }
      })
      // 上证50
      Http.getWithCache(`webData/${dataRawList[dataWay]}`, {
        code: 'sh000016'
      }, {interval: 60}).then((data) => {
        if (data.success) {
          this.wulinRate = data.data.netChangeRatio
        }
      })
      // 获取更新估值的最新时间
      Http.get('schedule/getScheduleValue', {
        key: 'lastUpdateValuationTime'
      }).then((data) => {
        if (data.success) {
          this.lastUpdateValuationTime = data.data.value
        }
      })
    },
    queryMyNetValue () {
      Http.get('fund/getUserLastNetValue').then((res) => {
        const nowNetValue = res.data.record
        if (nowNetValue) {
          this.myAsset = nowNetValue.asset
        }
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
    },
    addHandler () {
      this.$router.push({path: '/page/myFundAdd', query: {type: 'add'}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
