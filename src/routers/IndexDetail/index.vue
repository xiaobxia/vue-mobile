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
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
import constUtil from '@/util/constUtil.js'
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
      sellList: []
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
        code: query.code
      }).then((data) => {
        if (data.success) {
          const list = data.data.list
          const info = formatData(list)
          console.log(info.threshold)
          const infoUtil = new InfoUtil(info.threshold)
          const infoList = info.list.slice(0, 60)
          const recentNetValue = infoList
          this.netValue = infoList
          // 近的在前
          let buyList = []
          let sellList = []
          console.log(fnMap[query.key + 'Buy'])
          console.log(fnMap[query.key + 'Sell'])
          console.log(infoUtil[fnMap[query.key + 'Buy']])
          console.log(infoUtil[fnMap[query.key + 'Sell']])
          for (let i = 0; i < (recentNetValue.length - 3); i++) {
            const nowRecord = recentNetValue[i]
            const oneDayRecord = recentNetValue[i + 1]
            const twoDayRecord = recentNetValue[i + 2]
            if (infoUtil[fnMap[query.key + 'Buy']](nowRecord, oneDayRecord, twoDayRecord)) {
              buyList.push(nowRecord)
              console.log('in buy')
            }
            if (infoUtil[fnMap[query.key + 'Sell']](nowRecord, oneDayRecord, twoDayRecord)) {
              sellList.push(nowRecord)
              console.log('in sell')
            }
          }
          console.log(sellList)
          console.log(buyList)
          this.sellList = sellList
          this.buyList = buyList
        }
      })
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
