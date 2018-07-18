<template>
  <div class="index-detail">
    <mt-header :title="queryData.name" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="content-body">
        <ve-line :mark-point="chartPoint" :yAxis="chartYAxis" :textStyle="chartTextStyle"
                 :height="chartHeight" :data="chartDataNetValue"
                 :settings="chartSettings" :tooltip="chartTooltip" :grid="grid"></ve-line>
      </div>
      <div class="index-rate">
        <span :class="indexRate < 0 ? 'green-text' : 'red-text'">{{indexRate}}%</span>
      </div>
      <div class="tag-info">
        <span class="lock-info"><i></i>锁仓</span>
      </div>
      <div class="fund-list simple">
        <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/fundDetail?code='+item.code" :class="item.has?'grey-back':''">
          <div slot="title">
            <h3 :class="{lowRate: item.lowRate}">
              {{item.code}} {{formatName(item.name)}}
              <i class="lock-tag" v-if="ifLock(item)"></i>
              <span style="float: right" :class="item.rate < 0 ? 'green-text' : 'red-text'">{{item.rate}}%</span>
            </h3>
          </div>
        </mt-cell-swipe>
      </div>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
import fundAccountUtil from '@/util/fundAccountUtil.js'
import moment from 'moment'
import Toast from '@/common/toast.js'
import indexInfoUtil from '@/util/indexInfoUtil.js'

const codeMap = indexInfoUtil.codeMap
const InfoUtil = indexInfoUtil.Util
const fnMap = indexInfoUtil.fnMap
const formatData = indexInfoUtil.formatData

const zoom = window.adaptive.zoom
const baseFontSize = 22
export default {
  name: 'IndexDetail',
  data () {
    return {
      grid: {
        top: '15%'
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
      chartSettings: {
        lineStyle: {
          width: 3 * zoom
        }
      },
      queryData: {},
      netValue: [],
      buyList: [],
      sellList: [],
      list: [],
      indexRate: 0
    }
  },

  computed: {
    chartPoint () {
      let dataList = []
      this.buyList.forEach((item) => {
        dataList.push({
          coord: [item['date'], item['close']],
          itemStyle: {
            normal: {
              color: 'red'
            }
          },
          label: {
            show: false
          }
        })
      })
      this.sellList.forEach((item) => {
        dataList.push({
          coord: [item['date'], item['close']],
          itemStyle: {
            normal: {
              color: 'green'
            }
          },
          label: {
            show: false
          }
        })
      })
      return {
        data: dataList,
        symbol: 'circle',
        symbolSize: 10 * zoom
      }
    },
    chartDataNetValue () {
      if (!(this.netValue.length > 1)) {
        return {}
      }
      let netValue = this.netValue
      let row = []
      netValue.forEach(function (item, index) {
        let data = {}
        data['日期'] = item['date']
        data['净值'] = item['close']
        row.unshift(data)
      })
      return {
        columns: ['日期', '净值'],
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
      this.queryData = Object.assign({}, query)
      const code = this.$router.history.current.query.code
      Http.get('webData/getWebStockdaybarAll', {
        code: query.code,
        days: 200
      }).then((data) => {
        if (data.success) {
          const list = data.data.list
          const info = formatData(list)
          const infoUtil = new InfoUtil(info.threshold)
          const infoList = info.list.slice(0, 80)
          this.indexRate = numberUtil.keepTwoDecimals(infoList[0].netChangeRatio) || 0
          const recentNetValue = infoList
          this.netValue = infoList
          // 近的在前
          let buyList = []
          let sellList = []
          for (let i = 0; i < (recentNetValue.length - 3); i++) {
            const nowRecord = recentNetValue[i]
            const oneDayRecord = recentNetValue[i + 1]
            const twoDayRecord = recentNetValue[i + 2]
            if (infoUtil[fnMap[query.key + 'Buy']](nowRecord, oneDayRecord, twoDayRecord)) {
              buyList.push(nowRecord)
            } else if (infoUtil[fnMap[query.key + 'Sell']](nowRecord, oneDayRecord, twoDayRecord)) {
              sellList.push(nowRecord)
            }
          }
          this.sellList = sellList
          this.buyList = buyList
        }
      })
      this.queryRecord()
    },
    queryRecord () {
      const query = this.$router.history.current.query
      Http.get('fund/getFundsByTheme', {theme: query.name}).then((data) => {
        let funds = data.data.funds
        funds.sort((a, b) => {
          return b.rate - a.rate
        })
        this.list = funds
      })
    },
    ifLock (item) {
      return !fundAccountUtil.ifRelieve(item)
    },
    formatName (name) {
      if (name.length > 12) {
        return name.substr(0, 11) + '...'
      } else {
        return name
      }
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
