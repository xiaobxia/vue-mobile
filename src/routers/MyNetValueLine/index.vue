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
      <div class="time-wrap">
        <span class="name">{{filterTime}}</span>
        <mt-button type="primary" @click="timeChangeHandler">改变</mt-button>
      </div>
      <div class="">
        <ve-line :yAxis="chartYAxis" :textStyle="chartTextStyle"
                 :height="chartHeight" :legend="chartLegend"
                 :data="chartData" :settings="chartSettings"
                 :tooltip="tooltip" :grid="grid"
                 :theme="lineTheme"
        ></ve-line>
        <div class="my-net-value-info">
          <span>本月：{{myIncomeRateInfo.nowMonth}}%</span>
          <span>总收益：{{myIncomeRateInfo.all}}%</span>
          <span>本年：{{myIncomeRateInfo.nowYear}}%</span>
        </div>
        <table width="100%" cellspacing="1" cellpadding="20">
          <tr>
            <th>指数</th>
            <th>本周</th>
            <th>本月</th>
            <th>本年</th>
          </tr>
          <tr>
            <td>我的</td>
            <td>{{nowWeekRate.my}}%</td>
            <td>{{nowMonthRate.my}}%</td>
            <td>{{nowYearRate.my}}%</td>
          </tr>
          <tr>
            <td>上证</td>
            <td>{{nowWeekRate.shangzheng}}%</td>
            <td>{{nowMonthRate.shangzheng}}%</td>
            <td>{{nowYearRate.shangzheng}}%</td>
          </tr>
          <tr>
            <td>创业</td>
            <td>{{nowWeekRate.chuangye}}%</td>
            <td>{{nowMonthRate.chuangye}}%</td>
            <td>{{nowYearRate.chuangye}}%</td>
          </tr>
          <tr>
            <td>沪深300</td>
            <td>{{nowWeekRate.hushen}}%</td>
            <td>{{nowMonthRate.hushen}}%</td>
            <td>{{nowYearRate.hushen}}%</td>
          </tr>
          <tr>
            <td>上证50</td>
            <td>{{nowWeekRate.wulin}}%</td>
            <td>{{nowMonthRate.wulin}}%</td>
            <td>{{nowYearRate.wulin}}%</td>
          </tr>
        </table>
        <ve-histogram :grid="monthRateGrid"
                      :yAxis="chartYAxis" :textStyle="chartTextStyle"
                      :height="chartHeight" :legend="chartLegend"
                      :settings="chartSettings" :tooltip="tooltip"
                      :series="monthRateChartSeries" :xAxis="chartXAxis"
        ></ve-histogram>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <ul class="time-list">
        <li class="time-item" v-for="(item) in filterList" :key="item.name" @click="onTimeChangeHandler(item.name)">
          {{item.name}}
        </li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
import moment from 'moment'
import dateUtil from '@/util/dateUtil.js'
import arrayUtil from '@/util/arrayUtil.js'
import {Indicator} from 'mint-ui'
import storageUtil from '@/util/storageUtil.js'

const zoom = window.adaptive.zoom
const baseFontSize = 22

const dataWay = storageUtil.getAppConfig('dataWay') || '中金'
const dataRawList = {
  '中金': 'getWebStockdaybarAllZhongjin',
  '股市通': 'getWebStockdaybarAllGushitong',
  '东方': 'getWebStockdaybarDongfang'
}

let webDataMap = {
  shangzheng: {
    code: 'sh000001',
    name: '上证',
    selected: false
  },
  chuangye: {
    code: 'sz399006',
    name: '创业',
    selected: false
  },
  hushen: {
    code: 'sz399300',
    name: '沪深300',
    selected: true
  },
  wulin: {
    code: 'sh000016',
    name: '上证50',
    selected: false
  }
}

let rateChartSelected = {}
let webDataNames = []
let webDataKeyRateMap = {}
let webDataListMap = {}
for (let key in webDataMap) {
  rateChartSelected[webDataMap[key].name] = webDataMap[key].selected
  webDataNames.push(webDataMap[key].name)
  webDataKeyRateMap[key] = 0
  webDataListMap[key + 'DataList'] = []
}

export default {
  name: 'MyNetValueLine',
  data () {
    // 图表部分
    const chartPart = {
      grid: {
        top: '18%',
        left: '8%',
        right: '2%'
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
          fontSize: baseFontSize * zoom * 0.8,
          formatter: '{value} %'
        },
        scale: [true, true],
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dotted'
          }
        },
        axisLine: {
          show: false
        }
      },
      chartLegend: {
        itemGap: 20 * zoom,
        itemWidth: 50 * zoom,
        itemHeight: 30 * zoom,
        selected: {
          '我的组合': true,
          ...rateChartSelected
        }
      },
      chartSettings: {
        lineStyle: {
          width: 3.5 * zoom
        },
        offsetY: 350 * zoom
      },
      lineTheme: {
        line: {
          smooth: false
        }
      }
    }
    return {
      ...chartPart,
      popupVisible: false,
      myList: [],
      ...webDataListMap,
      nowWeekRate: {
        my: 0,
        ...webDataKeyRateMap
      },
      nowMonthRate: {
        my: 0,
        ...webDataKeyRateMap
      },
      nowYearRate: {
        my: 0,
        ...webDataKeyRateMap
      },
      myIncomeRateInfo: {
        nowMonth: 0,
        all: 0
      },
      netValueMonthRate: [],
      filterList: [
        {
          name: '本周'
        },
        {
          name: '本月'
        },
        {
          name: '本年'
        },
        {
          name: '近一月'
        },
        {
          name: '近三月'
        },
        {
          name: '近半年'
        },
        {
          name: '近一年'
        }
      ],
      filterTime: '本月'
    }
  },

  computed: {
    chartData () {
      if (!(this.myList.length > 0)) {
        return {}
      }
      let myList = this.copy(this.myList)
      // 近一年数据
      let startIndex = myList.length > 250 ? (myList.length) - 250 : 0
      if (this.filterTime === '本月') {
        startIndex = dateUtil.findSameRangeStartNetValueIndex(myList, 'month')
      } else if (this.filterTime === '本年') {
        startIndex = dateUtil.findSameRangeStartNetValueIndex(myList, 'year')
      } else if (this.filterTime === '本周') {
        startIndex = dateUtil.findSameRangeStartNetValueIndex(myList, 'week')
      } else if (this.filterTime === '近一月') {
        startIndex = myList.length > 21 ? (myList.length) - 21 : 0
      } else if (this.filterTime === '近三月') {
        startIndex = myList.length > 42 ? (myList.length) - 42 : 0
      } else if (this.filterTime === '近半年') {
        startIndex = myList.length > 126 ? (myList.length) - 126 : 0
      }
      myList = myList.slice(startIndex)
      const baseMy = myList[0]['net_value']
      const baseDate = myList[0]['net_value_date']
      let webDataList = {}
      let webDataDay = 0
      for (let key in webDataListMap) {
        if (!(this[key].length > 0)) {
          return {}
        }
        let temp = this.copy(this[key])
        webDataList[key] = temp.slice(arrayUtil.findIndex(temp, 'net_value_date', baseDate))
        webDataDay = webDataList[key].length
      }
      let row = []
      myList.forEach(function (item, index) {
        let data = {}
        data['日期'] = item['net_value_date']
        data['我的组合'] = numberUtil.keepTwoDecimals(((item['net_value'] - baseMy) / baseMy) * 100)
        for (let key in webDataMap) {
          const base = webDataList[key + 'DataList'][0].close
          data[webDataMap[key].name] = numberUtil.keepTwoDecimals(((webDataList[key + 'DataList'][index].close - base) / base) * 100)
        }
        row.push(data)
      })
      return {
        columns: ['日期', '我的组合', ...webDataNames],
        rows: row
      }
    },
    // 月收益率图表
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
    },
    monthRateChartSeries () {
      if (!this.netValueMonthRate.length > 0) {
        return [{
          name: '收益率',
          type: 'bar',
          data: []
        }]
      }
      const listMonth = this.netValueMonthRate
      let row = []
      listMonth.forEach(function (item) {
        row.push({
          value: item['rate'],
          itemStyle: {
            color: item['rate'] > 0 ? 'rgb(244, 51, 60)' : 'rgb(62, 179, 121)'
          }
        })
      })
      return [{
        name: '收益率',
        type: 'bar',
        data: row
      }]
    },
    chartXAxis () {
      if (!this.netValueMonthRate.length > 0) {
        return {}
      }
      const listMonth = this.netValueMonthRate
      let row = []
      listMonth.forEach(function (item) {
        row.push(item['yearMonth'])
      })
      return [
        {
          type: 'category',
          data: row
        }
      ]
    }
  },
  mounted () {
    this.initPage()
  },

  methods: {
    initPage () {
      // 近一年的最大
      const days = 270
      Indicator.open({
        spinnerType: 'fading-circle'
      })
      Http.get('fund/getUserNetValue').then((res) => {
        const data = res.data
        this.myIncomeRateInfo.all = numberUtil.countDifferenceRate((data.record && data.record.asset) || data.fundAssetInfo.fundAssetCost, data.fundAssetInfo.fundAssetCost)
      })
      // 获取我的净值数据
      Http.get('fund/getUserNetValues', {
        current: 1,
        pageSize: days
      }).then((data) => {
        if (data.success) {
          let list = data.data.list.reverse()
          this.myList = list
          console.log(this.myList)
          this.myIncomeRateInfo.nowMonth = this.countSameRangeRate(list, 'month')
          this.myIncomeRateInfo.nowYear = this.countSameRangeRate(list, 'year')
          // 当月收益率
          // 总收益率
          // all: numberUtil.countDifferenceRate(list[list.length - 1]['net_value'], list[0]['net_value'])
          this.nowWeekRate.my = this.countSameRangeRate(list, 'week')
          this.nowMonthRate.my = this.countSameRangeRate(list, 'month')
          this.nowYearRate.my = this.countSameRangeRate(list, 'year')
        }
      })
      let queryList = []
      for (let key in webDataMap) {
        queryList.push(Http.get(`webData/${dataRawList[dataWay]}`, {
          code: webDataMap[key].code,
          days
        }).then((data) => {
          if (data.success) {
            const list = this.formatWebDataList(data.data.list)
            this[key + 'DataList'] = list
            this.nowWeekRate[key] = this.countSameRangeRate(list, 'week')
            this.nowMonthRate[key] = this.countSameRangeRate(list, 'month')
            this.nowYearRate[key] = this.countSameRangeRate(list, 'year')
          }
        }))
      }
      Promise.all(queryList).then(() => {
        Indicator.close()
      })
      // 每月收益数据
      Http.get('fund/getUserNetValueMonthRate').then((data) => {
        if (data.success) {
          this.netValueMonthRate = data.data.list
        }
      })
    },
    toPath (path) {
      this.$router.push(path)
    },
    // 当前区间涨幅
    countSameRangeRate (list, type) {
      if (list.length === 0) {
        return 0
      }
      const last = list[list.length - 1]
      let startIndex = dateUtil.findSameRangeStartNetValueIndex(list, type)
      const todayNetValue = last['net_value']
      let lastNetValue = list[startIndex]['net_value']
      return numberUtil.countDifferenceRate(todayNetValue, lastNetValue)
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    addHandler () {
      this.$router.push({path: '/page/myNetValueRecord'})
    },
    timeChangeHandler () {
      this.popupVisible = true
    },
    onTimeChangeHandler (time) {
      this.filterTime = time
      this.popupVisible = false
      storageUtil.setAppConfig('netValueFilterTime', time)
    },
    formatWebDataList (list) {
      let newList = []
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        newList.push({
          net_value_date: moment(item.date).format('YYYY-MM-DD'),
          ...item.kline,
          net_value: item.kline.close
        })
      }
      return newList.reverse()
    },
    copy (list) {
      let temp = []
      for (let i = 0; i < list.length; i++) {
        temp[i] = list[i]
      }
      return temp
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
