<template>
  <div class="index-info">
    <mt-header title="操作分析" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-cell-swipe v-for="(item) in list" :key="item.code">
        <div slot="title">
          <h3>{{item.name}}</h3>
          <p class="explain">
            <span  v-for="(subItem, index) in allInfo[item.key]" :key="subItem + index" :class="subItem === '买'?'buy':subItem === '卖'?'sell':''">{{subItem}}</span>
          </p>
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

const codeMap = indexInfoUtil.codeMap
const InfoUtil = indexInfoUtil.Util
const fnMap = indexInfoUtil.fnMap
const formatData = indexInfoUtil.formatData
export default {
  name: 'OperatingInfo',
  data () {
    let allInfo = {}
    let list = []
    for (let key in codeMap) {
      list.push({
        key: key,
        code: codeMap[key].code,
        name: codeMap[key].name
      })
      allInfo[key] = []
    }
    return {
      list: list,
      allInfo: allInfo
    }
  },
  computed: {},
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      let list = this.list
      for (let i = 0; i < list.length; i++) {
        this.queryData(list[i])
      }
      // this.queryData(list[0])
    },
    qsStringify (query) {
      return qs.stringify(query)
    },
    queryData (item) {
      Http.get('webData/getWebStockdaybarAll', {
        code: item.code
      }).then((data) => {
        if (data.success) {
          const list = data.data.list
          const info = formatData(list)
          const infoUtil = new InfoUtil(info.threshold)
          const recentNetValue = info.list
          let infoList = []
          // 近的在前
          for (let i = 0; i < 5; i++) {
            const nowRecord = recentNetValue[i]
            const oneDayRecord = recentNetValue[i + 1]
            const twoDayRecord = recentNetValue[i + 2]
            if (infoUtil[fnMap[item.key + 'Buy']](nowRecord, oneDayRecord, twoDayRecord)) {
              infoList[i] = '买'
            } else if (infoUtil[fnMap[item.key + 'Sell']](nowRecord, oneDayRecord, twoDayRecord)) {
              infoList[i] = '卖'
            } else {
              infoList[i] = ''
            }
          }
          this.allInfo[item.key] = infoList
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
