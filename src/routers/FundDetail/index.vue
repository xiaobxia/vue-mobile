<template>
  <div class="fund-detail">
    <mt-header :title="currentFund.name">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
      <mt-button slot="right">
        <i class="fas fa-plus"></i>
      </mt-button>
    </mt-header>
    <div class="info-wrap">
      <span class="item">基金代码：{{currentFund.code}}</span>
      <span class="item">基金净值：{{currentFund.net_value}}</span>
      <span class="item">估算净值：{{currentFund.valuation}}</span>
      <span class="item">估算涨幅：<span :class="countRate(currentFund.valuation,currentFund.net_value) < 0 ? 'green-text' : 'red-text'">{{countRate(currentFund.valuation,currentFund.net_value)}}%</span></span>
      <span>估值时间：{{new Date(currentFund.valuation_date).toLocaleString()}}</span>
    </div>
    <div class="content-body">
      <ve-line :yAxis="chartYAxis" :textStyle="chartTextStyle" :height="chartHeight" :legend="chartLegend" :data="chartDataNetValue" :settings="chartSettings"></ve-line>
    </div>
    <div class="content-body">
      <ve-line :yAxis="chartYAxis" :textStyle="chartTextStyle" :height="chartHeight" :legend="chartLegend" :data="chartDataRecent" :settings="chartSettings"></ve-line>
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
        itemWidth: 50 * zoom,
        itemHeight: 30 * zoom
      },
      currentFund: {},
      currentFundAnalyzeRecent: {},
      chartSettings: {
        lineStyle: {
          width: 4 * zoom
        }
      }
    }
  },

  computed: {
    chartDataNetValue () {
      if (!this.currentFundAnalyzeRecent.recentNetValue) {
        return {}
      }
      const netValue = this.currentFundAnalyzeRecent.recentNetValue
      let row = []
      netValue.forEach(function (item, index) {
        let data = {}
        data['日期'] = item['net_value_date']
        data['净值'] = item['net_value']
        row.push(data)
      })
      console.log(row)
      return {
        columns: ['日期', '净值'],
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
      console.log(row)
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