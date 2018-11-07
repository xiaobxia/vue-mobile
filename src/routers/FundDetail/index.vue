<template>
  <div class="fund-detail">
    <mt-header :title="currentFund.name" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
      <mt-button slot="right">
        <i class="far fa-edit" v-if="type==='edit'" @click="toEditHandler"></i>
        <i :class="{'fas': true, 'fa-plus': true, 'warn': !couldBuyMore}" v-else @click="toAddHandler"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="info-wrap">
        <span class="item">基金代码：{{currentFund.code}}</span>
        <span class="item">基金净值：{{currentFund.net_value}}</span>
        <span class="item">估算净值：{{currentFund.valuation}}</span>
        <span class="item">估算涨幅：<span
          :class="countRate(currentFund.valuation,currentFund.net_value) < 0 ? 'green-text' : 'red-text'">{{countRate(currentFund.valuation, currentFund.net_value)}}%</span></span>
        <span>估值时间：{{formatDate(currentFund.valuation_date)}}</span>
      </div>
      <div class="theme-wrap">
        <span class="name">{{filterTheme}}</span>
        <mt-button type="primary" @click="themeChangeHandler">改变</mt-button>
      </div>
      <mt-popup
        v-model="popupVisible"
        position="bottom">
        <ul class="theme-list">
          <li class="theme-item" v-for="(item) in filterList" :key="item.code" @click="onThemeChangeHandler(item.name)">{{item.name || '置空'}}</li>
        </ul>
      </mt-popup>
      <div class="content-body">
        <ve-line :mark-line="chartMakeLineNetValue" :yAxis="chartYAxis" :textStyle="chartTextStyle"
                 :height="chartHeight" :legend="chartLegendNetValue" :data="chartDataNetValueMonth"
                 :settings="chartSettings" :tooltip="chartTooltip" :grid="grid" :theme="lineTheme"></ve-line>
      </div>
      <div class="content-body">
        <ve-line :mark-line="chartMakeLineNetValue" :yAxis="chartYAxis" :textStyle="chartTextStyle"
                 :height="chartHeight" :legend="chartLegendNetValue" :data="chartDataNetValue"
                 :settings="chartSettings" :tooltip="chartTooltip" :grid="grid" :theme="lineTheme"></ve-line>
      </div>
      <div class="content-body">
        <ve-line :yAxis="chartYAxisPercent" :textStyle="chartTextStyle" :height="chartHeight" :legend="chartLegend"
                 :data="chartDataRecent" :settings="chartSettingsPercent"  :tooltip="chartTooltip" :grid="grid" :theme="lineTheme"></ve-line>
      </div>
      <mt-button type="primary" @click="focusChangeHandler" class="main-btn">{{ifFocus==='true'?'取消关注':'关注'}}</mt-button>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
import fundAccountUtil from '@/util/fundAccountUtil.js'
import moment from 'moment'
import Toast from '@/common/toast.js'
import indexInfoUtil from '@/util/indexInfoUtilXiong.js'

const codeMap = indexInfoUtil.codeMap

const zoom = window.adaptive.zoom
const baseFontSize = 22
export default {
  name: 'MyNetValueLine',
  data () {
    let filterList = []
    for (let key in codeMap) {
      filterList.push({
        key: key,
        code: codeMap[key].code,
        name: codeMap[key].name
      })
    }
    filterList.push({
      key: 'kong',
      code: 'kong',
      name: ''
    })
    return {
      grid: {
        top: '15%'
      },
      lineTheme: {
        line: {
          smooth: false
        }
      },
      chartTooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            width: 2 * zoom
          },
          label: {
            fontSize: baseFontSize * zoom
          }
        },
        textStyle: {
          fontSize: baseFontSize * zoom
        }
      },
      chartHeight: (650 / 20) + 'rem',
      chartTextStyle: {
        fontSize: baseFontSize * zoom
      },
      chartYAxis: {
        axisLabel: {
          fontSize: baseFontSize * zoom
        },
        scale: [true, true]
      },
      chartYAxisPercent: {
        axisLabel: {
          fontSize: baseFontSize * zoom,
          formatter: '{value} %'
        },
        scale: [true, true]
      },
      chartLegendNetValue: {
        itemWidth: 50 * zoom,
        itemHeight: 30 * zoom,
        selected: {
          '净值': true,
          '月均': false,
          '半月均': false,
          '星期均': false
        }
      },
      chartLegend: {
        itemWidth: 50 * zoom,
        itemHeight: 30 * zoom
      },
      currentFund: {
        code: '',
        net_value: 1,
        valuation: 1,
        valuation_date: ''
      },
      currentFundAnalyzeRecent: {},
      chartSettings: {
        lineStyle: {
          width: 3 * zoom
        }
      },
      chartSettingsPercent: {
        lineStyle: {
          width: 3 * zoom
        },
        yAxisType: 'percent'
      },
      queryData: {},
      type: 'add',
      netValue: [],
      ifFocus: 'false',
      couldBuyMore: true,
      filterTheme: '',
      filterList,
      popupVisible: false
    }
  },

  computed: {
    chartMakeLineNetValue () {
      const result = this.currentFundAnalyzeRecent.result
      if (!result) {
        return {
        }
      }
      let dataList = [
        {
          label: {
            normal: {
              position: 'end',
              formatter: '{c}'
            }
          },
          name: '当前',
          lineStyle: {
            color: '#1890ff',
            width: 2 * zoom
          },
          yAxis: this.currentFund.valuation
        }
      ]
      if (this.type === 'edit') {
        dataList.push({
          label: {
            normal: {
              position: 'end',
              formatter: '{c}'
            }
          },
          name: '成本',
          lineStyle: {
            color: '#faad14',
            width: 2 * zoom

          },
          yAxis: this.queryData.cost
        })
        dataList.push({
          label: {
            normal: {
              position: 'end',
              formatter: '{c}'
            }
          },
          type: 'max',
          name: '止盈点',
          lineStyle: {
            color: 'red',
            width: 2 * zoom
          },
          yAxis: this.queryData.target_net_value || this.queryData.cost
        })
        dataList.push({
          label: {
            normal: {
              position: 'end',
              formatter: '{c}'
            }
          },
          type: 'max',
          name: '止损点',
          lineStyle: {
            color: 'green',
            width: 2 * zoom
          },
          yAxis: this.queryData.stop_net_value || this.queryData.cost
        })
      }
      return {
        data: dataList
      }
    },
    chartDataNetValueMonth () {
      if (!(this.netValue.length > 1)) {
        return {}
      }
      let netValue = this.netValue.slice(-60)
      let row = []
      const averageMonth = this.getAverageList(netValue, 20)
      const averageHalfMonth = this.getAverageList(netValue, 10)
      const averageWeek = this.getAverageList(netValue, 5)
      netValue.forEach(function (item, index) {
        let data = {}
        data['日期'] = item['net_value_date']
        data['净值'] = item['net_value']
        data['月均'] = averageMonth[index]
        data['半月均'] = averageHalfMonth[index]
        data['星期均'] = averageWeek[index]
        row.push(data)
      })
      return {
        columns: ['日期', '净值', '月均', '半月均', '星期均'],
        rows: row
      }
    },
    chartDataNetValue () {
      if (!(this.netValue.length > 1)) {
        return {}
      }
      let netValue = this.netValue
      let row = []
      const averageMonth = this.getAverageList(netValue, 20)
      const averageHalfMonth = this.getAverageList(netValue, 10)
      const averageWeek = this.getAverageList(netValue, 5)
      netValue.forEach(function (item, index) {
        let data = {}
        data['日期'] = item['net_value_date']
        data['净值'] = item['net_value']
        data['月均'] = averageMonth[index]
        data['半月均'] = averageHalfMonth[index]
        data['星期均'] = averageWeek[index]
        row.push(data)
      })
      return {
        columns: ['日期', '净值', '月均', '半月均', '星期均'],
        rows: row
      }
    },
    chartDataRecent () {
      if (!this.currentFundAnalyzeRecent.listMonth) {
        return {}
      }
      const listMonth = this.currentFundAnalyzeRecent.listMonth
      let row = [{
        '天数': 0,
        '涨幅': 0
      }]
      listMonth.forEach(function (item, index) {
        let data = {}
        data['天数'] = index + 1
        data['涨幅'] = item
        row.push(data)
      })
      return {
        columns: ['天数', '涨幅'],
        rows: row
      }
    }
  },
  mounted () {
    this.initPage()
  },

  methods: {
    initPage () {
      const query = this.$router.history.current.query
      this.type = query.type
      this.queryData = Object.assign({}, query)
      const code = this.$router.history.current.query.code
      Http.get('fund/checkFocusFund', {code}).then((data) => {
        if (data.success) {
          this.ifFocus = data.data.focus ? 'true' : 'false'
        }
      })
      Promise.all([
        Http.get('fund/getFundBase', {code}).then((data) => {
          if (data.success) {
            this.currentFund = data.data
            this.filterTheme = data.data.theme || '未设置'
          }
        }),
        Http.get('fund/getFundAnalyzeRecent', {code}).then((data) => {
          if (data.success) {
            this.currentFundAnalyzeRecent = data.data
          }
        })
      ]).then(() => {
        const netValue = this.currentFundAnalyzeRecent.recentNetValue
        netValue.unshift({
          net_value_date: moment(this.currentFund.valuation_date).format('YYYY-MM-DD'),
          net_value: this.currentFund.valuation
        })
        netValue.reverse()
        this.netValue = netValue
      })
      // 判断是否有持仓
      Http.get('fund/getUserFunds').then((data) => {
        const list = data.data.list
        let buyIn7DaysCount = 0
        list.forEach((item) => {
          if (item.has_days <= 7) {
            buyIn7DaysCount += item.costSum
          }
          if (item.code === code) {
            delete item.listMonth
            delete item.result
            this.type = 'edit'
            this.queryData = {
              type: 'edit',
              ...item
            }
          }
        })
        // 大于49000就说明大于了5000，因为每个标准仓5000
        if (buyIn7DaysCount > fundAccountUtil.buyIn7DaysLimit) {
          this.couldBuyMore = false
        }
      })
    },
    countRate (a, b) {
      return numberUtil.countDifferenceRate(a || 1, b || 1)
    },
    toPath (path) {
      this.$router.push(path)
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:SS')
    },
    toEditHandler () {
      this.$router.push({path: '/page/myFundAdd', query: {...this.queryData, newNetValue: this.currentFund.net_value}})
    },
    toAddHandler () {
      this.$router.push({
        path: '/page/myFundAdd',
        query: {
          code: this.currentFund.code,
          cost: this.currentFund.net_value,
          newNetValue: this.currentFund.net_value
        }
      })
    },
    getAverageList (netValue, day) {
      let list = []
      netValue.forEach((item, index) => {
        const average = this.getAverage(netValue, day, index)
        list.push(average)
      })
      return list
    },
    getAverage (netValue, day, index) {
      let start = index - day + 1
      start = start < 0 ? 0 : start
      let count = 0
      for (let i = index; i >= start; i--) {
        count += netValue[i]['net_value']
      }
      return numberUtil.keepFourDecimals(count / (index + 1 - start))
    },
    successMessage () {
      Toast.success('操作成功')
    },
    errorMessage () {
      Toast.error('操作失败')
    },
    focusChangeHandler () {
      const code = this.$router.history.current.query.code
      if (this.ifFocus === 'true') {
        Http.get('fund/deleteFocusFund', {code}).then((data) => {
          if (data.success) {
            this.successMessage()
            this.ifFocus = 'false'
          } else {
            this.errorMessage()
          }
        })
      } else {
        Http.post('fund/addFocusFund', {code}).then((data) => {
          if (data.success) {
            this.successMessage()
            this.ifFocus = 'true'
          } else {
            this.errorMessage()
          }
        })
      }
    },
    updateFundTheme (theme) {
      const code = this.$router.history.current.query.code
      Http.post('fund/updateFundTheme', {theme, code}).then((data) => {
        this.list = data.data.funds
      })
    },
    themeChangeHandler () {
      this.popupVisible = true
    },
    onThemeChangeHandler (theme) {
      this.filterTheme = theme
      this.popupVisible = false
      this.updateFundTheme(theme)
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
