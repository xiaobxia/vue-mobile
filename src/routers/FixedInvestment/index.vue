<template>
  <div class="operating-info">
    <mt-header title="定投" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/indexDetailXiong?'+qsStringify(item)"
                     :class="[firstClass[item.key], hasInfo[item.name] ? 'has':'no-has']">
        <div slot="title">
          <h3>
            {{item.name}}
            <span v-if="hasInfo[item.name]" :class="['has-icon', firstInfo[item.key]]"><i class="fas fa-hand-holding-usd"></i></span>
            <span v-if="hasCount[item.name]" class="has-count">{{hasCount[item.name]}}</span>
            <span style="float: right" :class="numberClass(rateInfo[item.key])">{{rateInfo[item.key]}}%</span>
          </h3>
          <p class="explain">
            <span v-for="(subItem, index) in allInfo[item.key]" :key="subItem + index"
                  :class="subItem === '买'?'buy':subItem === '卖'?'sell':''">{{subItem}}</span>
          </p>
        </div>
      </mt-cell-swipe>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import fixedInvestment from '@/util/fixedInvestment.js'
import qs from 'qs'
import numberUtil from '@/util/numberUtil.js'
import storageUtil from '@/util/storageUtil.js'
import stockDataUtil from '@/util/stockDataUtil.js'

const codeMap = fixedInvestment.codeMap
const InfoUtil = fixedInvestment.Util
const fnMap = fixedInvestment.fnMap
const formatData = fixedInvestment.formatData
export default {
  name: 'FixedInvestment',
  data () {
    let allInfo = {}
    let list = []
    let firstInfo = {}
    let firstClass = {}
    let rateInfo = {}
    let hasInfo = {}
    let hasCount = {}
    for (let key in codeMap) {
      list.push({
        key: key,
        code: codeMap[key].code,
        name: codeMap[key].name,
        mix: codeMap[key].mix,
        threshold: codeMap[key].threshold,
        wave: codeMap[key].wave,
        rate: codeMap[key].rate,
        noLong: codeMap[key].noLong,
        incomeHighRate: codeMap[key].incomeHighRate,
        stable: codeMap[key].stable,
        goodBad: storageUtil.getGoodBad(codeMap[key].name) || '无'
      })
      allInfo[key] = []
      firstInfo[key] = ''
      firstClass[key] = ''
      rateInfo[key] = 0
      hasInfo[codeMap[key].name] = false
      hasCount[codeMap[key].name] = 0
    }
    return {
      list: list,
      allInfo: allInfo,
      firstInfo: firstInfo,
      firstClass,
      rateInfo: rateInfo,
      hasInfo,
      hasCount,
      myAsset: 10000
    }
  },
  computed: {
  },
  mounted () {
    this.initPage()
  },
  methods: {
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
              // 只计入定投
              if (item.strategy === '2') {
                this.hasInfo[item.theme] = true
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
          const infoUtil = new InfoUtil(item)
          const recentNetValue = info.list
          let infoList = []
          let classInfo = ''
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
          this.firstClass[item.key] = firstClass
          this.rateInfo[item.key] = numberUtil.keepTwoDecimals(recentNetValue[0].netChangeRatio)
        }
      })
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
