<template>
  <div class="operating-info">
    <mt-header title="操作分析" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="count-wrap">
        <span class="red-text">{{buyCount}}</span>
        :
        <span class="green-text">{{sellCount}}</span>
        <span class="warn">建议{{position}}%持仓</span>
      </div>
      <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/indexDetail?'+qsStringify(item)"
                     :class="firstInfo[item.key]">
        <div slot="title">
          <h3>
            {{item.name}}
            <span v-if="hasInfo[item.name]" :class="['has-tag', firstInfo[item.key]]">持有</span>
            <span style="float: right" :class="rateInfo[item.key] < 0 ? 'green-text' : 'red-text'">{{rateInfo[item.key]}}%</span>
          </h3>
          <p class="explain">
            <span v-for="(subItem, index) in allInfo[item.key]" :key="subItem + index"
                  :class="subItem === '买'?'buy':subItem === '卖'?'sell':''">{{subItem}}</span>
          </p>
          <div :class="['info-tag', firstInfo[item.key], hasInfo[item.name]?'has':'no-has']"></div>
        </div>
      </mt-cell-swipe>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import Toast from '@/common/toast.js'
import indexInfoUtil from '@/util/indexInfoUtil.js'
import qs from 'qs'
import numberUtil from '@/util/numberUtil.js'
import storageUtil from '@/util/storageUtil.js'

const dataWay = storageUtil.getAppConfig('dataWay') || '中金'
const dataRawList = {
  '中金': 'getWebStockdaybarAll',
  '股市通': 'getWebStockdaybarAllOld',
  '东方': 'getWebStockdaybarDongfang'
}

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
    let rateInfo = {}
    let hasInfo = {}
    for (let key in codeMap) {
      list.push({
        key: key,
        code: codeMap[key].code,
        name: codeMap[key].name,
        threshold: codeMap[key].threshold
      })
      allInfo[key] = []
      firstInfo[key] = ''
      rateInfo[key] = 0
      hasInfo[codeMap[key].name] = false
    }
    return {
      list: list,
      allInfo: allInfo,
      firstInfo: firstInfo,
      rateInfo: rateInfo,
      hasInfo
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
    initPage () {
      let list = this.list
      for (let i = 0; i < list.length; i++) {
        this.queryData(list[i])
      }
      Http.get('fund/getUserFundsNormal').then((data) => {
        if (data.success) {
          const list = data.data.list
          for (let i = 0; i < list.length; i++) {
            if (list[i].theme) {
              this.hasInfo[list[i].theme] = true
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
      Http.getWithCache(`webData/${dataRawList[dataWay]}`, {
        code: item.code,
        days: 20
      }, {interval: 60}).then((data) => {
        if (data.success) {
          const list = data.data.list
          const info = formatData(list)
          const infoUtil = new InfoUtil(item.threshold)
          const recentNetValue = info.list
          let infoList = []
          let classInfo = ''
          // 近的在前
          for (let i = 0; i < 18; i++) {
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
