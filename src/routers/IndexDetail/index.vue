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
                 :height="chartHeight" :data="chartDataNetValue" :theme="lineTheme"
                 :settings="chartSettings" :tooltip="chartTooltip" :grid="grid" :dataZoom="dataZoom"></ve-line>
      </div>
      <div class="index-rate">
        <span :class="numberClass(indexRate)">{{indexRate}}%</span>
      </div>
      <!--<div class="tag-info">-->
        <!--<span class="lock-info"><i></i>锁仓</span>-->
      <!--</div>-->
      <div class="fund-list simple">
        <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/fundDetail?code='+item.code" :class="item.has?'has-back':''">
          <div slot="title">
            <h3 :class="{lowRate: item.lowRate}">
              {{item.code}} {{formatFundName(item.name)}}
              <i class="lock-tag" v-if="ifLock(item)"></i>
              <i class="position-tag" v-if="ifPosition(item)"></i>
              <i class="dingtou-tag" v-if="ifDingtou(item)"></i>
              <span style="float: right" :class="numberClass(item.rate)">{{item.rate}}%</span>
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
import indexInfoUtil from '@/util/indexInfoUtil.js'
import stockDataUtil from '@/util/stockDataUtil.js'

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
        top: '15%',
        left: '-8%',
        bottom: '0%'
      },
      dataZoom: [{
        type: 'inside',
        start: 80,
        end: 100
      }],
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
        scale: [true, true],
        splitLine: {
          lineStyle: {
            type: 'dotted'
          }
        }
      },
      chartSettings: {
        lineStyle: {
          width: 3 * zoom
        }
      },
      lineTheme: {
        line: {
          smooth: false
        }
      },
      queryData: {},
      netValue: [],
      buyList: [],
      sellList: [],
      sameList: [],
      list: [],
      indexRate: 0,
      pointType: ''
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
              color: 'rgb(244, 51, 60)'
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
              color: 'rgb(62, 179, 121)'
            }
          },
          label: {
            show: false
          }
        })
      })
      this.sameList.forEach((item) => {
        dataList.push({
          coord: [item['date'], item['close']],
          itemStyle: {
            normal: {
              color: this.pointType === 'buy' ? 'purple' : 'blue'
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
      Http.get(`webData/${stockDataUtil.getAllUrl()}`, {
        code: query.code,
        days: 200
      }).then((data) => {
        if (data.success) {
          const list = data.data.list
          const info = formatData(list)
          const infoUtil = new InfoUtil(parseFloat(query.threshold))
          const infoList = info.list
          this.indexRate = numberUtil.keepTwoDecimals(infoList[0].netChangeRatio) || 0
          const recentNetValue = infoList
          this.netValue = infoList
          // 近的在前
          let hasOne = false
          let sameType = ''
          let pointType = ''
          let buyList = []
          let sellList = []
          let sameList = []
          for (let i = 0; i < (recentNetValue.length - 3); i++) {
            const nowRecord = recentNetValue[i]
            const oneDayRecord = recentNetValue[i + 1]
            const twoDayRecord = recentNetValue[i + 2]
            let buyFlag = infoUtil[fnMap[query.key + 'Buy']](nowRecord, oneDayRecord, twoDayRecord)
            let sellFlag = infoUtil[fnMap[query.key + 'Sell']](nowRecord, oneDayRecord, twoDayRecord)
            if ((buyFlag === true) || (buyFlag !== false && buyFlag.flag === true)) {
              if (!hasOne) {
                hasOne = true
                pointType = 'buy'
                if (buyFlag !== true && buyFlag !== false) {
                  sameType = buyFlag.text
                  sameList.push(nowRecord)
                } else {
                  buyList.push(nowRecord)
                }
              } else {
                if (buyFlag !== true && buyFlag !== false && buyFlag.text === sameType) {
                  sameList.push(nowRecord)
                } else {
                  buyList.push(nowRecord)
                }
              }
            } else if ((sellFlag === true) || (sellFlag !== false && sellFlag.flag === true)) {
              if (!hasOne) {
                hasOne = true
                pointType = 'sell'
                if (sellFlag !== true && sellFlag !== false) {
                  sameType = sellFlag.text
                  sameList.push(nowRecord)
                } else {
                  sellList.push(nowRecord)
                }
              } else {
                if (sellFlag !== true && sellFlag !== false && sellFlag.text === sameType) {
                  sameList.push(nowRecord)
                } else {
                  sellList.push(nowRecord)
                }
              }
            }
          }
          this.pointType = pointType
          this.sellList = sellList
          this.buyList = buyList
          this.sameList = sameList
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
      // 不计入定投
      if (this.ifDingtou(item)) {
        return false
      }
      return !fundAccountUtil.ifUnLock(item)
    },
    ifPosition (item) {
      // 不计入定投
      if (this.ifDingtou(item)) {
        return false
      }
      if (item['position_record']) {
        if (JSON.parse(item['position_record']).length > 1) {
          return true
        }
      }
      return false
    },
    ifDingtou (item) {
      return item.strategy && item.strategy !== '1'
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
