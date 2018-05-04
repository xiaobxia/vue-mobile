<template>
  <div class="fund-detail">
    <mt-header :title="currentFund.name" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
      <mt-button slot="right">
        <i class="far fa-edit" v-if="type==='edit'" @click="toEditHandler"></i>
        <i class="fas fa-plus" v-else @click="toAddHandler"></i>
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
      <div class="content-body">
        <ve-line :mark-line="chartMakeLineNetValue" :yAxis="chartYAxis" :textStyle="chartTextStyle"
                 :height="chartHeight" :legend="chartLegendNetValue" :data="chartDataNetValue"
                 :settings="chartSettings"></ve-line>
      </div>
      <div class="content-body">
        <ve-line :yAxis="chartYAxis" :textStyle="chartTextStyle" :height="chartHeight" :legend="chartLegend"
                 :data="chartDataRecent" :settings="chartSettings"></ve-line>
      </div>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
import moment from 'moment'

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
      currentFund: {},
      currentFundAnalyzeRecent: {},
      chartSettings: {
        lineStyle: {
          width: 3 * zoom
        }
      },
      queryData: {},
      type: 'add'
    }
  },

  computed: {
    chartMakeLineNetValue () {
      const result = this.currentFundAnalyzeRecent.result
      if (!result) {
        return {}
      }
      let dataList = [
        {
          label: {
            normal: {
              position: 'end',
              formatter: '{c}'
            }
          },
          type: 'average',
          name: '平均值',
          lineStyle: {
            color: '#000',
            width: 2 * zoom
          }
        },
        {
          label: {
            normal: {
              position: 'end',
              formatter: '{c}'
            }
          },
          type: 'max',
          name: '最高点',
          lineStyle: {
            color: 'red',
            width: 2 * zoom
          }
        },
        {
          label: {
            normal: {
              position: 'end',
              formatter: '{c}'
            }
          },
          type: 'min',
          name: '最小值',
          lineStyle: {
            color: 'green',
            width: 2 * zoom
          }
        },
        {
          label: {
            normal: {
              position: 'end',
              formatter: '{c}'
            }
          },
          name: '半年均线',
          lineStyle: {
            color: '#f50',
            width: 2 * zoom
          },
          yAxis: result.costLineHalf
        },
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
      }
      return {
        data: dataList
      }
    },
    chartDataNetValue () {
      if (!this.currentFundAnalyzeRecent.recentNetValue) {
        return {}
      }
      const netValue = this.currentFundAnalyzeRecent.recentNetValue
      netValue.reverse()
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
      let row = []
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
      Http.get('fund/getFundBase', {code}).then((data) => {
        if (data.success) {
          this.currentFund = data.data
        }
      })
      Http.get('fund/getFundAnalyzeRecent', {code}).then((data) => {
        if (data.success) {
          this.currentFundAnalyzeRecent = data.data
        }
      })
    },
    countRate (a, b) {
      return numberUtil.countDifferenceRate(a, b)
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
      this.$router.push({path: '/page/myFundAdd', query: this.queryData})
    },
    toAddHandler () {
      this.$router.push({
        path: '/page/myFundAdd',
        query: {
          code: this.currentFund.code,
          target_rate: 7
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
