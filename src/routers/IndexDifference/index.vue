<template>
  <div class="operating-info">
    <mt-header title="操作分析" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-cell-swipe v-for="(item) in list" :key="item.code"
                     :class="firstInfo[item.key]">
        <div slot="title">
          <h3>
            {{item.name}}
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
    let allInfo = {}
    let list = []
    let firstInfo = {}
    let rateInfo = {}
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
      rateInfo[key] = 0
    }
    return {
      list: list,
      allInfo: allInfo,
      firstInfo: firstInfo,
      rateInfo: rateInfo,
      wulin: [],
      chuangye: []
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
        Http.get(`webData/getWebStockdaybarAllZhongjin`, {
          code: 'sz399006',
          days: 200
        }).then((data) => {
          if (data.success) {
            const list = data.data.list
            this.chuangye = list
          }
        }),
        Http.get(`webData/getWebStockdaybarAllZhongjin`, {
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
