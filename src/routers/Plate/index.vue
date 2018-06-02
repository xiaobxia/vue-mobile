<template>
  <div class="my-net-value-line">
    <mt-header title="板块走势" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
    <div class="content-body">
      <ve-line :yAxis="chartYAxis" :textStyle="chartTextStyle" :height="chartHeight"
               :legend="chartLegend" :data="chartData" :settings="chartSettings"
               :tooltip="tooltip" :grid="grid"
      ></ve-line>
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
const startDate = parseInt(moment().subtract(3, 'months').format('YYYYMMDD'))
console.log(startDate)
const baseFontSize = 22
export default {
  name: 'Plate',
  data () {
    return {
      grid: {
        top: '20%'
      },
      chartHeight: (900 / 20) + 'rem',
      chartTextStyle: {
        fontSize: baseFontSize * zoom
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          fontSize: baseFontSize * zoom
        }
      },
      chartYAxis: {
        axisLabel: {
          fontSize: baseFontSize * zoom,
          formatter: '{value} %'
        },
        scale: [true, true]
      },
      chartLegend: {
        itemGap: 20 * zoom,
        itemWidth: 50 * zoom,
        itemHeight: 30 * zoom,
        selected: {
        }
      },
      chartSettings: {
        lineStyle: {
          width: 3 * zoom
        }
      },
      jungong: [],
      baijiu: [],
      yiyao: [],
      jisuanji: [],
      yinhang: [],
      dichan: [],
      xiaofei: [],
      gangtie: [],
      meitan: [],
      huanbao: [],
      youse: []
    }
  },

  computed: {
    chartData () {
      let jungong = this.jungong
      let baijiu = this.baijiu
      let yiyao = this.yiyao
      let jisuanji = this.jisuanji
      let yinhang = this.yinhang
      let dichan = this.dichan
      let xiaofei = this.xiaofei
      let gangtie = this.gangtie
      let meitan = this.meitan
      let huanbao = this.huanbao
      let youse = this.youse
      if (jungong.length < 1 || baijiu.length < 1 || yiyao.length < 1 || jisuanji.length < 1 ||
        yinhang.length < 1 || dichan.length < 1 || xiaofei.length < 1 ||
        gangtie.length < 1 || meitan.length < 1 || huanbao.length < 1 || youse.length < 1) {
        return {}
      }
      let startIndex = 0
      for (let i = 0; i < jungong.length; i++) {
        if (jungong[i].date === startDate) {
          startIndex = i
          break
        }
      }
      jungong = jungong.slice(0, startIndex + 1)
      jungong.reverse()
      const baseJungong = jungong[0].kline.close
      baijiu = baijiu.slice(0, startIndex + 1)
      baijiu.reverse()
      const baseBaijiu = baijiu[0].kline.close
      yiyao = yiyao.slice(0, startIndex + 1)
      yiyao.reverse()
      const baseYiyao = yiyao[0].kline.close
      jisuanji = jisuanji.slice(0, startIndex + 1)
      jisuanji.reverse()
      const baseJisuanji = jisuanji[0].kline.close
      yinhang = yinhang.slice(0, startIndex + 1)
      yinhang.reverse()
      const baseYinhang = yinhang[0].kline.close
      dichan = dichan.slice(0, startIndex + 1)
      dichan.reverse()
      const baseDichan = dichan[0].kline.close
      xiaofei = xiaofei.slice(0, startIndex + 1)
      xiaofei.reverse()
      const baseXiaofei = xiaofei[0].kline.close
      gangtie = gangtie.slice(0, startIndex + 1)
      gangtie.reverse()
      const baseGangtie = gangtie[0].kline.close
      meitan = meitan.slice(0, startIndex + 1)
      meitan.reverse()
      const baseMeitan = meitan[0].kline.close
      huanbao = huanbao.slice(0, startIndex + 1)
      huanbao.reverse()
      const baseHuanbao = huanbao[0].kline.close
      youse = youse.slice(0, startIndex + 1)
      youse.reverse()
      const baseYouse = youse[0].kline.close
      let row = []
      jungong.forEach(function (item, index) {
        let data = {}
        data['日期'] = item['date']
        data['军工'] = numberUtil.keepTwoDecimals(((jungong[index].kline.close - baseJungong) / baseJungong) * 100)
        data['白酒'] = numberUtil.keepTwoDecimals(((baijiu[index].kline.close - baseBaijiu) / baseBaijiu) * 100)
        data['医药'] = numberUtil.keepTwoDecimals(((yiyao[index].kline.close - baseYiyao) / baseBaijiu) * 100)
        data['计算机'] = numberUtil.keepTwoDecimals(((jisuanji[index].kline.close - baseJisuanji) / baseJisuanji) * 100)
        data['银行'] = numberUtil.keepTwoDecimals(((yinhang[index].kline.close - baseYinhang) / baseYinhang) * 100)
        data['地产'] = numberUtil.keepTwoDecimals(((dichan[index].kline.close - baseDichan) / baseDichan) * 100)
        data['消费'] = numberUtil.keepTwoDecimals(((xiaofei[index].kline.close - baseXiaofei) / baseXiaofei) * 100)
        data['钢铁'] = numberUtil.keepTwoDecimals(((gangtie[index].kline.close - baseGangtie) / baseGangtie) * 100)
        data['煤炭'] = numberUtil.keepTwoDecimals(((meitan[index].kline.close - baseMeitan) / baseMeitan) * 100)
        data['环保'] = numberUtil.keepTwoDecimals(((huanbao[index].kline.close - baseHuanbao) / baseHuanbao) * 100)
        data['有色'] = numberUtil.keepTwoDecimals(((youse[index].kline.close - baseYouse) / baseYouse) * 100)
        row.push(data)
      })
      return {
        columns: ['日期', '军工', '白酒', '医药', '计算机', '银行', '地产', '消费', '钢铁', '煤炭', '环保', '有色'],
        rows: row
      }
    }
  },
  mounted () {
    this.initPage()
  },

  methods: {
    initPage () {
      Indicator.open({
        spinnerType: 'fading-circle'
      })
      Promise.all([
        Http.get('webData/getWebStockdaybar', {
          code: 'sz399959'
        }).then((data) => {
          if (data.success) {
            this.jungong = data.data.list
          }
        }),
        Http.get('webData/getWebStockdaybar', {
          code: 'sz399997'
        }).then((data) => {
          if (data.success) {
            this.baijiu = data.data.list
          }
        }),
        Http.get('webData/getWebStockdaybar', {
          code: 'sh000037'
        }).then((data) => {
          if (data.success) {
            this.yiyao = data.data.list
          }
        }),
        Http.get('webData/getWebStockdaybar', {
          code: 'sz399363'
        }).then((data) => {
          if (data.success) {
            this.jisuanji = data.data.list
          }
        }),
        Http.get('webData/getWebStockdaybar', {
          code: 'sz399986'
        }).then((data) => {
          if (data.success) {
            this.yinhang = data.data.list
          }
        }),
        Http.get('webData/getWebStockdaybar', {
          code: 'sz399393'
        }).then((data) => {
          if (data.success) {
            this.dichan = data.data.list
          }
        }),
        Http.get('webData/getWebStockdaybar', {
          code: 'sz399932'
        }).then((data) => {
          if (data.success) {
            this.xiaofei = data.data.list
          }
        }),
        Http.get('webData/getWebStockdaybar', {
          code: 'sz399440'
        }).then((data) => {
          if (data.success) {
            this.gangtie = data.data.list
          }
        }),
        Http.get('webData/getWebStockdaybar', {
          code: 'sz399998'
        }).then((data) => {
          if (data.success) {
            this.meitan = data.data.list
          }
        }),
        Http.get('webData/getWebStockdaybar', {
          code: 'sh000827'
        }).then((data) => {
          if (data.success) {
            this.huanbao = data.data.list
          }
        }),
        Http.get('webData/getWebStockdaybar', {
          code: 'sh000823'
        }).then((data) => {
          if (data.success) {
            this.youse = data.data.list
          }
        })
      ]).then(() => {
        Indicator.close()
      })
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
