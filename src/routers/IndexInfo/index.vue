<template>
  <div class="index-info">
    <mt-header title="指数分析" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="info-block-wrap buy">
        <h3>买</h3>
        <div>
          <span v-for="(item) in buyList" :key="item.name + item.day" >{{item.name}}({{item.day}})</span>
        </div>
      </div>
      <div class="info-block-wrap sell">
        <h3>卖</h3>
        <div>
          <span v-for="(item) in sellList" :key="item.name + item.day" >{{item.name}}({{item.day}})</span>
        </div>
      </div>
      <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/indexDetail?'+qsStringify(item)">
        <div slot="title">
          <h3>{{item.name}}</h3>
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
const InfoUtil = indexInfoUtil.util
const fnMap = indexInfoUtil.fnMap
const formatData = indexInfoUtil.formatData
export default {
  name: 'IndexInfo',
  data () {
    let list = []
    for (let key in codeMap) {
      list.push({
        key: key,
        code: codeMap[key].code,
        name: codeMap[key].name
      })
    }
    return {
      list: list,
      buyList: [],
      sellList: []
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
          // 近的在前
          for (let i = 0; i < 5; i++) {
            const nowRecord = recentNetValue[i]
            const oneDayRecord = recentNetValue[i + 1]
            const twoDayRecord = recentNetValue[i + 2]
            if (infoUtil[fnMap[item.key + 'Buy']](nowRecord, oneDayRecord, twoDayRecord)) {
              this.buyList.push({
                name: item.name,
                day: i
              })
            }
            if (infoUtil[fnMap[item.key + 'Sell']](nowRecord, oneDayRecord, twoDayRecord)) {
              this.sell.push({
                name: item.name,
                day: i
              })
            }
          }
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
