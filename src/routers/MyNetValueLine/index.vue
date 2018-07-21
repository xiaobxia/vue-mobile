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
      <ve-line :yAxis="chartYAxis" :textStyle="chartTextStyle"
               :height="chartHeight" :legend="chartLegend"
               :data="chartData" :settings="chartSettings"
               :tooltip="tooltip" :grid="grid"
      ></ve-line>
      <div class="my-net-value-info">
        <span>本月：{{myNetValueInfo.nowMonth}}%</span>
        <span>总收益：{{myNetValueInfo.all}}%</span>
        <span>近一年：{{recentInfo.year}}%</span>
      </div>
      <table border="1" width="100%" cellspacing="1" cellpadding="4">
        <tr>
          <th>指数\时间</th>
          <th>本周</th>
          <th>一星期</th>
          <th>半月</th>
          <th>一月</th>
        </tr>
        <tr>
          <td>我的</td>
          <td>{{nowWeek.my}}%</td>
          <td>{{recentInfo.week}}%</td>
          <td>{{recentInfo.halfMonth}}%</td>
          <td>{{recentInfo.month}}%</td>
        </tr>
        <tr>
          <td>上证</td>
          <td>{{nowWeek.shangzheng}}%</td>
          <td>{{recentAll.shangzheng}}%</td>
          <td>{{halfMonthAll.shangzheng}}%</td>
          <td>{{monthAll.shangzheng}}%</td>
        </tr>
        <tr>
          <td>创业</td>
          <td>{{nowWeek.chuangye}}%</td>
          <td>{{recentAll.chuangye}}%</td>
          <td>{{halfMonthAll.chuangye}}%</td>
          <td>{{monthAll.chuangye}}%</td>
        </tr>
        <tr>
          <td>沪深300</td>
          <td>{{nowWeek.hushen}}%</td>
          <td>{{recentAll.hushen}}%</td>
          <td>{{halfMonthAll.hushen}}%</td>
          <td>{{monthAll.hushen}}%</td>
        </tr>
        <tr>
          <td>上证50</td>
          <td>{{nowWeek.wulin}}%</td>
          <td>{{recentAll.wulin}}%</td>
          <td>{{halfMonthAll.wulin}}%</td>
          <td>{{monthAll.wulin}}%</td>
        </tr>
      </table>
      <ve-histogram :data="monthRateChartData" :grid="monthRateGrid"
                    :yAxis="chartYAxis" :textStyle="chartTextStyle"
                    :height="chartHeight" :legend="chartLegend"
                    :settings="chartSettings" :tooltip="tooltip"
      ></ve-histogram>
    </div>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
import moment from 'moment'
import { Indicator } from 'mint-ui'

const zoom = window.adaptive.zoom
const baseFontSize = 22
export default {
  name: 'MyNetValueLine',
  data () {
    return {
      grid: {
        top: '18%'
      },
      monthRateGrid: {
        top: '10%'
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          fontSize: baseFontSize * zoom
        }
      },
      chartHeight: (700 / 20) + 'rem',
      chartTextStyle: {
        fontSize: baseFontSize * zoom
      },
      chartYAxis: {
        axisLabel: {
          fontSize: baseFontSize * zoom,
          formatter: '{value} %'
        },
        scale: [true, true]
      },
      //      chartXAxis: {
      //        nameTextStyle: {
      //          fontSize: baseFontSize * zoom
      //        }
      //      },
      chartLegend: {
        itemGap: 20 * zoom,
        itemWidth: 50 * zoom,
        itemHeight: 30 * zoom,
        selected: {
          '我的组合': true,
          '上证': false,
          '创业': false,
          '沪深300': true,
          '上证50': false
          // '中证500': false
        }
      },
      myList: [],
      shangzheng: [],
      chuangye: [],
      hushen: [],
      wulin: [],
      chartSettings: {
        lineStyle: {
          width: 3 * zoom
        },
        offsetY: 350 * zoom
      },
      recentInfo: {},
      recentAll: {},
      monthAll: {},
      nowWeek: {},
      halfMonthAll: {},
      myNetValueInfo: {
        nowMonth: 0,
        all: 0
      },
      netValueMonthRate: []
    }
  },

  computed: {
    chartData () {
      const listMonth = this.myList
      let listShangzheng = this.shangzheng
      let listChuangye = this.chuangye
      let listHushen = this.hushen
      let listWulin = this.wulin
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
      if (listShangzheng.length < 1 || listChuangye.length < 1 || listHushen.length < 1 || listWulin.length < 1) {
        return {}
      }
      const baseShangzheng = listShangzheng[0].kline.close
      const baseChuangye = listChuangye[0].kline.close
      const baseHushen = listHushen[0].kline.close
      const baseWulin = listWulin[0].kline.close
      let row = []
      listMonth.forEach(function (item, index) {
        let data = {}
        data['日期'] = item['net_value_date']
        data['我的组合'] = numberUtil.keepTwoDecimals((item['net_value'] - 1) * 100)
        data['上证'] = numberUtil.keepTwoDecimals(((listShangzheng[index].kline.close - baseShangzheng) / baseShangzheng) * 100)
        data['创业'] = numberUtil.keepTwoDecimals(((listChuangye[index].kline.close - baseChuangye) / baseChuangye) * 100)
        data['沪深300'] = numberUtil.keepTwoDecimals(((listHushen[index].kline.close - baseHushen) / baseHushen) * 100)
        data['上证50'] = numberUtil.keepTwoDecimals(((listWulin[index].kline.close - baseWulin) / baseWulin) * 100)
        row.push(data)
      })
      return {
        columns: ['日期', '我的组合', '上证', '创业', '沪深300', '上证50'],
        rows: row
      }
    },
    monthRateChartData () {
      if (!this.netValueMonthRate.length > 0) {
        return {}
      }
      const listMonth = this.netValueMonthRate
      let row = []
      listMonth.forEach(function (item) {
        let data = {}
        data['日期'] = item['yearMonth']
        data['收益率'] = item['rate']
        row.push(data)
      })
      return {
        columns: ['日期', '收益率'],
        rows: row
      }
    }
  },
  mounted () {
    this.initPage()
  },

  methods: {
    initPage () {
      const days = Math.ceil((moment().diff(moment('2018-03-12'), 'days') / 7) + 2) * 5
      Indicator.open({
        spinnerType: 'fading-circle'
      })
      Promise.all([
        Http.get('fund/getUserNetValuesAll').then((data) => {
          if (data.success) {
            let list = data.data.list
            this.myList = list
            this.myNetValueInfo = {
              nowMonth: this.countNowMonth(list),
              all: numberUtil.countDifferenceRate(list[list.length - 1]['net_value'], list[0]['net_value'])
            }
            this.nowWeek.my = this.countMyNowWeek(list)
          }
        }),
        Http.get('webData/getWebStockdaybarAll', {
          code: 'sh000001',
          days
        }).then((data) => {
          if (data.success) {
            this.shangzheng = data.data.list
            this.nowWeek.shangzheng = this.countNowWeek(data.data.list)
            this.recentAll.shangzheng = this.countWeek(data.data.list)
            this.monthAll.shangzheng = this.countMonth(data.data.list)
            this.halfMonthAll.shangzheng = this.countHalfMonth(data.data.list)
          }
        }),
        Http.get('webData/getWebStockdaybarAll', {
          code: 'sh000016',
          days
        }).then((data) => {
          if (data.success) {
            this.wulin = data.data.list
            this.nowWeek.wulin = this.countNowWeek(data.data.list)
            this.recentAll.wulin = this.countWeek(data.data.list)
            this.monthAll.wulin = this.countMonth(data.data.list)
            this.halfMonthAll.wulin = this.countHalfMonth(data.data.list)
          }
        }),
        Http.get('webData/getWebStockdaybarAll', {
          code: 'sz399006',
          days
        }).then((data) => {
          if (data.success) {
            this.chuangye = data.data.list
            this.nowWeek.chuangye = this.countNowWeek(data.data.list)
            this.recentAll.chuangye = this.countWeek(data.data.list)
            this.monthAll.chuangye = this.countMonth(data.data.list)
            this.halfMonthAll.chuangye = this.countHalfMonth(data.data.list)
          }
        }),
        Http.get('webData/getWebStockdaybarAll', {
          code: 'sz399300',
          days
        }).then((data) => {
          if (data.success) {
            this.hushen = data.data.list
            this.nowWeek.hushen = this.countNowWeek(data.data.list)
            this.recentAll.hushen = this.countWeek(data.data.list)
            this.monthAll.hushen = this.countMonth(data.data.list)
            this.halfMonthAll.hushen = this.countHalfMonth(data.data.list)
          }
        }),
        Http.get('fund/getUserNetValuesRecent').then((data) => {
          if (data.success) {
            this.recentInfo = data.data
          }
        })
      ]).then(() => {
        Indicator.close()
      })
      Http.get('fund/getUserNetValueMonthRate').then((data) => {
        if (data.success) {
          this.netValueMonthRate = data.data.list
        }
      })
    },
    toPath (path) {
      this.$router.push(path)
    },
    countMyNowWeek (list) {
      const start = list.length - 1
      const nowDay = list[start].net_value_date
      const nowValue = list[start].net_value
      let lastValue = list[start].net_value
      for (let i = start - 1; i > (start - 6); i--) {
        const day = list[i].net_value_date
        if (!(moment(day).isSame(nowDay, 'week'))) {
          lastValue = list[i].net_value
          break
        }
      }
      return numberUtil.countDifferenceRate(nowValue, lastValue)
    },
    countNowWeek (list) {
      const nowDate = list[0].date + ''
      const nowValue = list[0].kline.close
      let lastValue = list[0].kline.close
      const nowDay = nowDate.substr(0, 4) + '-' + nowDate.substr(4, 2) + '-' + nowDate.substr(6, 2)
      for (let i = 1; i < 6; i++) {
        const date = list[i].date + ''
        const day = date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2)
        if (!(moment(day).isSame(nowDay, 'week'))) {
          lastValue = list[i].kline.close
          break
        }
      }
      return numberUtil.countDifferenceRate(nowValue, lastValue)
    },
    countWeek (list) {
      const nowNetValue = list[0].kline.close
      const weekNetValue = list[5].kline.close
      return numberUtil.countDifferenceRate(nowNetValue, weekNetValue)
    },
    countHalfMonth (list) {
      const nowNetValue = list[0].kline.close
      const halfMonthNetValue = list[10].kline.close
      return numberUtil.countDifferenceRate(nowNetValue, halfMonthNetValue)
    },
    countMonth (list) {
      const nowNetValue = list[0].kline.close
      const monthNetValue = list[21].kline.close
      return numberUtil.countDifferenceRate(nowNetValue, monthNetValue)
    },
    countNowMonth (list) {
      const last = list[list.length - 1]
      const today = last['net_value_date']
      const todayNetValue = last['net_value']
      let lastMonthNetValue = 0
      for (let i = list.length - 2; i >= 0; i--) {
        if (!moment(today).isSame(list[i]['net_value_date'], 'month')) {
          lastMonthNetValue = list[i]['net_value']
          break
        }
      }
      return numberUtil.countDifferenceRate(todayNetValue, lastMonthNetValue)
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
