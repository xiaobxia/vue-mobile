<template>
  <div class="today-index">
    <mt-header title="今日指数" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-cell-swipe v-for="(item) in list" :key="item.code">
        <div slot="title">
          <h3>
            {{item.name}}
            <span style="float: right" :class="rateInfo[item.key] < 0 ? 'green-text' : 'red-text'">{{rateInfo[item.key]}}%</span>
          </h3>
        </div>
      </mt-cell-swipe>
    </div>
    <div class="btn-list-wrap">
      <mt-button type="primary" @click="sortChangeHandler" class="main-btn">排序</mt-button>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import qs from 'qs'
import numberUtil from '@/util/numberUtil.js'
import storageUtil from '@/util/storageUtil.js'

const dataWay = storageUtil.getAppConfig('dataWay') || '中金'
const dataRawList = {
  '中金': 'getWebStockdaybarTodayZhongjin',
  '股市通': 'getWebStockdaybarTodayDongfang',
  '东方': 'getWebStockdaybarTodayDongfang'
}

const codeMap = {
  'chuangye': {
    code: 'sz399006',
    name: '创业'
  },
  'gangtie': {
    code: 'sz399440',
    name: '钢铁'
  },
  'jungong': {
    code: 'sz399959',
    name: '军工'
  },
  'yiyao': {
    code: 'sh000037',
    name: '医药'
  },
  'meitan': {
    code: 'sz399998',
    name: '煤炭'
  },
  'youse': {
    code: 'sh000823',
    name: '有色'
  },
  'jisuanji': {
    code: 'sz399363',
    name: '计算机'
  },
  'baijiu': {
    code: 'sz399997',
    name: '白酒'
  },
  'xinxi': {
    code: 'sh000993',
    name: '信息'
  },
  'xiaofei': {
    code: 'sh000990',
    name: '消费'
  },
  'baoxian': {
    code: 'sz399809',
    name: '保险'
  },
  'wulin': {
    code: 'sh000016',
    name: '50'
  },
  'chuanmei': {
    code: 'sz399971',
    name: '传媒'
  },
  'dianzi': {
    code: 'sz399811',
    name: '电子'
  },
  'yiliao': {
    code: 'sz399989',
    name: '医疗'
  },
  'shengwu': {
    code: 'sz399441',
    name: '生物'
  },
  'sanbai': {
    code: 'sh000300',
    name: '300'
  },
  'wubai': {
    code: 'sh000905',
    name: '500'
  },
  'yinhang': {
    code: 'sz399986',
    name: '银行'
  },
  'dichan': {
    code: 'sz399393',
    name: '地产'
  },
  'huanbao': {
    code: 'sh000827',
    name: '环保'
  },
  'shangzheng': {
    code: 'sh000001',
    name: '上证'
  },
  'zhengquan': {
    code: 'sz399437',
    name: '证券'
  }
}
export default {
  name: 'OperatingInfo',
  data () {
    let list = []
    let rateInfo = {}
    let sortRate = {}
    for (let key in codeMap) {
      list.push({
        key: key,
        code: codeMap[key].code,
        name: codeMap[key].name,
        sortRate: 0
      })
      rateInfo[key] = 0
      sortRate[codeMap[key].name] = 0
    }
    return {
      list: list,
      rateInfo: rateInfo,
      sortRate,
      myAsset: 200000
    }
  },
  computed: {
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      let queryList = []
      let list = this.list
      for (let i = 0; i < list.length; i++) {
        queryList.push(this.queryData(list[i]))
      }
      Promise.all(queryList).then(() => {
        this.sortChangeHandler()
      })
    },
    qsStringify (query) {
      return qs.stringify(query)
    },
    queryData (item) {
      return Http.getWithCache(`webData/${dataRawList[dataWay]}`, {
        code: item.code
      }, {interval: 30}).then((data) => {
        if (data.success) {
          const netChangeRatio = data.data.netChangeRatio
          this.sortRate[item.key] = parseFloat(netChangeRatio)
          this.rateInfo[item.key] = numberUtil.keepTwoDecimals(netChangeRatio)
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
      console.log(this.list)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
