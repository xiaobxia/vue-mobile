<template>
  <div class="operating-info">
    <mt-header title="变盘策略" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/changeMarketDetail?'+qsStringify(item)"
                     >
        <div slot="title">
          <h3>
            {{item.name}}
            <span style="float: right" :class="numberClass(rateInfo[item.key])">{{rateInfo[item.key]}}%</span>
          </h3>
          <p class="explain">
            <span v-for="(subItem, index) in allInfo[item.key]" :key="index"
                  :class="subItem === true? 'active': ''">{{subItem}}</span>
          </p>
        </div>
      </mt-cell-swipe>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import changeMarket from '@/util/changeMarket.js'
import qs from 'qs'
import numberUtil from '@/util/numberUtil.js'
import stockDataUtil from '@/util/stockDataUtil.js'
import storageUtil from '@/util/storageUtil.js'

const codeMap = changeMarket.codeMap
const InfoUtil = changeMarket.Util
const fnMap = changeMarket.fnMap
const formatData = changeMarket.formatData
export default {
  name: 'ChangeMarket',
  data () {
    let allInfo = {}
    let list = []
    let rateInfo = {}
    for (let key in codeMap) {
      list.push({
        key: key,
        code: codeMap[key].code,
        name: codeMap[key].name,
        threshold: codeMap[key].threshold,
        wave: codeMap[key].wave,
        rate: codeMap[key].rate,
        sortRate: 0
      })
      allInfo[key] = []
      rateInfo[key] = 0
    }
    return {
      list: list,
      allInfo: allInfo,
      rateInfo: rateInfo
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
    },
    qsStringify (query) {
      return qs.stringify(query)
    },
    queryData (item) {
      Http.getWithCache(`webData/${stockDataUtil.getAllUrl()}`, {
        code: item.code,
        days: 20
      }, {interval: 60}).then((data) => {
        if (data.success) {
          const list = data.data.list
          const info = formatData(list)
          const infoUtil = new InfoUtil(item)
          const recentNetValue = info.list
          let infoList = []
          // 近的在前
          for (let i = 0; i < 5; i++) {
            const nowRecord = recentNetValue[i]
            const oneDayRecord = recentNetValue[i + 1]
            const twoDayRecord = recentNetValue[i + 2]
            let flag = infoUtil[fnMap[item.key]](nowRecord, oneDayRecord, twoDayRecord)
            if ((flag === true) || (flag !== false && flag.flag === true)) {
              infoList[i] = true
            } else {
              infoList[i] = false
            }
          }
          storageUtil.setChangeMarket(item.key, infoList[0])
          this.allInfo[item.key] = infoList
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
