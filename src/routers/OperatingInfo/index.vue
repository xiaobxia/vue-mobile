<template>
  <div class="operating-info">
    <mt-header title="操作分析" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/indexDetail?'+qsStringify(item)"
                     :class="[firstClass[item.key], hasInfo[item.name] ? 'has':'no-has', warnClass[item.key]?'warn':'', lockInfo[item.name] === true ?'':'no-lock']">
        <div slot="title">
          <h3>
            {{item.name}}
            <span v-if="hasInfo[item.name]" :class="['has-tag', firstInfo[item.key]]">持有</span>
            <span v-if="hasCount[item.name]" class="has-count">{{hasCount[item.name]}}</span>
            <span v-if="hasCount[item.name] >= (myAsset/15)" class="danger-tag"></span>
            <span v-if="!(hasCount[item.name] >= (myAsset/15)) && (hasCount[item.name] >= (myAsset/25))" class="warn-tag"></span>
            <span style="float: right" :class="numberClass(rateInfo[item.key])">{{rateInfo[item.key]}}%</span>
          </h3>
          <p class="explain">
            <span v-for="(subItem, index) in allInfo[item.key]" :key="subItem + index"
                  :class="subItem === '买'?'buy':subItem === '卖'?'sell':''">{{subItem}}</span>
          </p>
          <div :class="['info-tag', 'buy', lockInfo[item.name] === true?'no-has':'has']"></div>
        </div>
      </mt-cell-swipe>
    </div>
    <div class="btn-list-wrap">
      <mt-button type="primary" @click="sortChangeHandler" class="main-btn">排序包括今日</mt-button>
      <mt-button type="primary" @click="sortTowChangeHandler" class="main-btn">排序不包括今日</mt-button>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import indexInfoUtil from '@/util/indexInfoUtil.js'
import qs from 'qs'
import numberUtil from '@/util/numberUtil.js'
import storageUtil from '@/util/storageUtil.js'
import fundAccountUtil from '@/util/fundAccountUtil.js'
import stockDataUtil from '@/util/stockDataUtil.js'

const codeMap = indexInfoUtil.codeMap
const InfoUtil = indexInfoUtil.Util
const fnMap = indexInfoUtil.fnMap
const formatData = indexInfoUtil.formatData
export default {
  name: 'OperatingInfo',
  data () {
    let allInfo = {}
    let list = []
    let firstInfo = {}
    let firstClass = {}
    let warnClass = {}
    let rateInfo = {}
    let lockInfo = {}
    let hasInfo = {}
    let hasCount = {}
    let sortRate = {}
    let sortRateTwo = {}
    for (let key in codeMap) {
      list.push({
        key: key,
        code: codeMap[key].code,
        name: codeMap[key].name,
        threshold: codeMap[key].threshold,
        sortRate: 0
      })
      allInfo[key] = []
      firstInfo[key] = ''
      firstClass[key] = ''
      rateInfo[key] = 0
      hasInfo[codeMap[key].name] = false
      warnClass[key] = false
      lockInfo[codeMap[key].name] = false
      hasCount[codeMap[key].name] = 0
      sortRate[codeMap[key].name] = 0
      sortRateTwo[codeMap[key].name] = 0
    }
    return {
      list: list,
      allInfo: allInfo,
      firstInfo: firstInfo,
      firstClass,
      rateInfo: rateInfo,
      hasInfo,
      lockInfo,
      hasCount,
      warnClass,
      sortRate,
      sortRateTwo,
      myAsset: 10000
    }
  },
  computed: {
    buyCount () {
      let count = 0
      for (let key in this.firstInfo) {
        if (this.firstInfo[key] === 'buy') {
          count++
        }
      }
      return count
    },
    sellCount () {
      let count = 0
      for (let key in this.firstInfo) {
        if (this.firstInfo[key] === 'sell') {
          count++
        }
      }
      return count
    },
    position () {
      let buy = 0
      for (let key in this.firstInfo) {
        if (this.firstInfo[key] === 'buy') {
          buy++
        }
      }
      let sell = 0
      for (let key in this.firstInfo) {
        if (this.firstInfo[key] === 'sell') {
          sell++
        }
      }
      let all = sell + buy
      return numberUtil.countRate(buy, (all / 1.5))
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    ifLock (item) {
      // 不计入定投
      if (this.ifDingtou(item)) {
        return false
      }
      return !fundAccountUtil.ifUnLock(item)
    },
    ifDingtou (item) {
      return item.strategy && item.strategy !== '1'
    },
    initPage () {
      let list = this.list
      for (let i = 0; i < list.length; i++) {
        this.queryData(list[i])
      }
      Http.get('fund/getUserLastNetValue').then((res) => {
        const nowNetValue = res.data.record
        if (nowNetValue) {
          this.myAsset = nowNetValue.asset
        }
      })
      Http.get('fund/getUserFundsNormal').then((data) => {
        if (data.success) {
          const list = data.data.list
          for (let i = 0; i < list.length; i++) {
            const item = list[i]
            if (item.theme) {
              // 定投不计入
              if (item.strategy === '1') {
                this.hasInfo[item.theme] = true
                if (this.ifLock(item)) {
                  if (this.lockInfo[item.theme] !== '') {
                    this.lockInfo[item.theme] = true
                  }
                } else {
                  this.lockInfo[item.theme] = ''
                }
                if (this.hasCount[item.theme]) {
                  this.hasCount[item.theme] += parseInt(item.costSum)
                } else {
                  this.hasCount[item.theme] = parseInt(item.costSum)
                }
              }
            }
          }
        }
      })
      // this.queryData(list[0])
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
          const info = formatData(list)
          const infoUtil = new InfoUtil(item.threshold)
          const recentNetValue = info.list
          let infoList = []
          let classInfo = ''
          const stepDay = 4
          let nowClose = recentNetValue[0].close
          let LastClose = recentNetValue[stepDay].close
          this.sortRate[item.key] = numberUtil.countDifferenceRate(nowClose, LastClose)
          this.sortRateTwo[item.key] = numberUtil.countDifferenceRate(recentNetValue[1].close, recentNetValue[1 + stepDay].close)
          // 近的在前
          for (let i = 0; i < 8; i++) {
            const nowRecord = recentNetValue[i]
            const oneDayRecord = recentNetValue[i + 1]
            const twoDayRecord = recentNetValue[i + 2]
            let buyFlag = infoUtil[fnMap[item.key + 'Buy']](nowRecord, oneDayRecord, twoDayRecord)
            let sellFlag = infoUtil[fnMap[item.key + 'Sell']](nowRecord, oneDayRecord, twoDayRecord)
            if (i < 5) {
              if ((buyFlag === true) || (buyFlag !== false && buyFlag.flag === true)) {
                infoList[i] = '买'
                if (classInfo === '') {
                  classInfo = 'buy'
                }
              } else if ((sellFlag === true) || (sellFlag !== false && sellFlag.flag === true)) {
                infoList[i] = '卖'
                if (classInfo === '') {
                  classInfo = 'sell'
                }
              } else {
                infoList[i] = ''
              }
            } else {
              if ((buyFlag === true) || (buyFlag !== false && buyFlag.flag === true)) {
                if (classInfo === '') {
                  classInfo = 'buy'
                }
              } else if ((sellFlag === true) || (sellFlag !== false && sellFlag.flag === true)) {
                if (classInfo === '') {
                  classInfo = 'sell'
                }
              }
            }
          }
          this.allInfo[item.key] = infoList
          this.firstInfo[item.key] = classInfo
          let firstClass = ''
          if (infoList[0] === '买') {
            firstClass = 'buy'
          }
          if (infoList[0] === '卖') {
            firstClass = 'sell'
          }
          if (infoList[0] === '') {
            let marketStatus = storageUtil.getMarketStatus('question_1') || '强'
            for (let i = 1; i < infoList.length; i++) {
              if (infoList[i] === '买') {
                if (marketStatus === '略强' && recentNetValue[0].netChangeRatio < 0) {
                  this.warnClass[item.key] = true
                }
                if (marketStatus === '强') {
                  this.warnClass[item.key] = true
                }
                break
              }
              if (infoList[i] === '卖') {
                if (['略弱', '弱'].indexOf(marketStatus) !== -1 && recentNetValue[0].netChangeRatio < 0) {
                  this.warnClass[item.key] = true
                }
                break
              }
            }
          }
          this.firstClass[item.key] = firstClass
          this.rateInfo[item.key] = numberUtil.keepTwoDecimals(recentNetValue[0].netChangeRatio)
        }
      })
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    sortChangeHandler () {
      for (let key in this.sortRate) {
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].key === key) {
            this.list[i].sortRate = this.sortRate[key]
          }
        }
      }
      this.list.sort((a, b) => {
        return b.sortRate - a.sortRate
      })
    },
    sortTowChangeHandler () {
      for (let key in this.sortRateTwo) {
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].key === key) {
            this.list[i].sortRate = this.sortRateTwo[key]
          }
        }
      }
      this.list.sort((a, b) => {
        return b.sortRate - a.sortRate
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
