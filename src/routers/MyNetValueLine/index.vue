<template>
  <div class="my-net-value-line">
    <mt-header title="净值曲线" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
      <mt-button slot="right">
        <i class="fas fa-bars" @click="addHandler"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
    <div class="content-body">
      <div class="info">
        <span>近一星期：{{recentInfo.week}}%</span>
        <span>近一月：{{recentInfo.month}}%</span>
        <span>近一年：{{recentInfo.year}}%</span>
      </div>
      <div class="info-big">
        <span>上证一星期：{{recentAll.shangzheng}}%</span>
        <span>创业一星期：{{recentAll.chuangye}}%</span>
        <span>沪深300一星期：{{recentAll.hushen}}%</span>
        <span>上证50一星期：{{recentAll.wulin}}%</span>
        <span>中证500一星期：{{recentAll.wubai}}%</span>
      </div>
      <div class="info-big">
        <span>上证一月：{{monthAll.shangzheng}}%</span>
        <span>创业一月：{{monthAll.chuangye}}%</span>
        <span>沪深300一月：{{monthAll.hushen}}%</span>
        <span>上证50一月：{{monthAll.wulin}}%</span>
        <span>中证500一月：{{monthAll.wubai}}%</span>
      </div>
      <ve-line :yAxis="chartYAxis" :textStyle="chartTextStyle" :height="chartHeight" :legend="chartLegend" :data="chartData" :settings="chartSettings"></ve-line>
    </div>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'

const zoom = window.adaptive.zoom
export default {
  name: 'MyNetValueLine',
  data () {
    return {
      chartHeight: (500 / 20) + 'rem',
      chartTextStyle: {
        fontSize: 20 * zoom
      },
      chartYAxis: {
        axisLabel: {
          fontSize: 20 * zoom
        },
        scale: [true, true]
      },
      chartLegend: {
        itemGap: 20 * zoom,
        itemWidth: 50 * zoom,
        itemHeight: 30 * zoom
      },
      myList: [],
      shangzheng: [],
      chuangye: [],
      hushen: [],
      wulin: [],
      wubai: [],
      chartSettings: {
        lineStyle: {
          width: 3 * zoom
        }
      },
      recentInfo: {},
      recentAll: {},
      monthAll: {}
    }
  },

  computed: {
    chartData () {
      const listMonth = this.myList
      let listShangzheng = this.shangzheng
      let listChuangye = this.chuangye
      let listHushen = this.hushen
      let listWulin = this.wulin
      let listWubai = this.wubai
      let startIndex = 0
      for (let i = 0; i < listShangzheng.length; i++) {
        if (listShangzheng[i].date === 20180312) {
          startIndex = i
          break
        }
      }
      listShangzheng = listShangzheng.slice(0, startIndex + 1)
      listShangzheng.reverse()
      listChuangye = listChuangye.slice(0, startIndex + 1)
      listChuangye.reverse()
      listHushen = listHushen.slice(0, startIndex + 1)
      listHushen.reverse()
      listWulin = listWulin.slice(0, startIndex + 1)
      listWulin.reverse()
      listWubai = listWubai.slice(0, startIndex + 1)
      listWubai.reverse()
      if (listShangzheng.length < 1 || listChuangye.length < 1 || listHushen.length < 1 || listWulin.length < 1 || listWubai.length < 1) {
        return {}
      }
      const baseShangzheng = listShangzheng[0].kline.close
      const baseChuangye = listChuangye[0].kline.close
      const baseHushen = listHushen[0].kline.close
      const baseWulin = listWulin[0].kline.close
      const baseWubai = listWubai[0].kline.close
      let row = []
      listMonth.forEach(function (item, index) {
        let data = {}
        data['日期'] = item['net_value_date']
        data['我的组合'] = numberUtil.keepTwoDecimals((item['net_value'] - 1) * 100)
        data['上证'] = numberUtil.keepTwoDecimals(((listShangzheng[index].kline.close - baseShangzheng) / baseShangzheng) * 100)
        data['创业'] = numberUtil.keepTwoDecimals(((listChuangye[index].kline.close - baseChuangye) / baseChuangye) * 100)
        data['沪深300'] = numberUtil.keepTwoDecimals(((listHushen[index].kline.close - baseHushen) / baseHushen) * 100)
        data['上证50'] = numberUtil.keepTwoDecimals(((listWulin[index].kline.close - baseWulin) / baseWulin) * 100)
        data['中证500'] = numberUtil.keepTwoDecimals(((listWubai[index].kline.close - baseWubai) / baseWubai) * 100)
        row.push(data)
      })
      console.log(row)
      return {
        columns: ['日期', '我的组合', '上证', '创业', '沪深300', '上证50', '中证500'],
        rows: row
      }
    }
  },
  mounted () {
    this.initPage()
  },

  methods: {
    initPage () {
      Http.get('fund/getUserNetValuesAll').then((data) => {
        if (data.success) {
          this.myList = data.data.list
        }
      })
      Http.get('webData/getWebStockdaybar', {
        code: 'sh000001'
      }).then((data) => {
        if (data.success) {
          this.shangzheng = data.data.list
          this.recentAll.shangzheng = this.countWeek(data.data.list)
          this.monthAll.shangzheng = this.countMonth(data.data.list)
        }
      })
      Http.get('webData/getWebStockdaybar', {
        code: 'sh000016'
      }).then((data) => {
        if (data.success) {
          this.wulin = data.data.list
          this.recentAll.wulin = this.countWeek(data.data.list)
          this.monthAll.wulin = this.countMonth(data.data.list)
        }
      })
      Http.get('webData/getWebStockdaybar', {
        code: 'sh000906'
      }).then((data) => {
        if (data.success) {
          this.wubai = data.data.list
          this.recentAll.wubai = this.countWeek(data.data.list)
          this.monthAll.wubai = this.countMonth(data.data.list)
        }
      })
      Http.get('webData/getWebStockdaybar', {
        code: 'sz399006'
      }).then((data) => {
        if (data.success) {
          this.chuangye = data.data.list
          this.recentAll.chuangye = this.countWeek(data.data.list)
          this.monthAll.chuangye = this.countMonth(data.data.list)
        }
      })
      Http.get('webData/getWebStockdaybar', {
        code: 'sz399300'
      }).then((data) => {
        if (data.success) {
          this.hushen = data.data.list
          this.recentAll.hushen = this.countWeek(data.data.list)
          this.monthAll.hushen = this.countMonth(data.data.list)
        }
      })
      Http.get('fund/getUserNetValuesRecent').then((data) => {
        if (data.success) {
          this.recentInfo = data.data
        }
      })
    },
    toPath (path) {
      this.$router.push(path)
    },
    countWeek (list) {
      const nowNetValue = list[0].kline.close
      const weekNetValue = list[5].kline.close
      return numberUtil.countDifferenceRate(nowNetValue, weekNetValue)
    },
    countMonth (list) {
      const nowNetValue = list[0].kline.close
      const monthNetValue = list[21].kline.close
      return numberUtil.countDifferenceRate(nowNetValue, monthNetValue)
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    addHandler () {
      this.$router.push({path: '/page/myNetValueRecord'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-body {
    padding: 30px;
  }
</style>
