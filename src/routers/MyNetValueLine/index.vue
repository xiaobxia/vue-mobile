<template>
  <div>
    <mt-header title="净值曲线">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="content-body">
      <ve-line :textStyle="chartTextStyle" :height="chartHeight" :data="chartData" :settings="chartSettings"></ve-line>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
export default {
  name: 'MyNetValueLine',
  data () {
    return {
      chartHeight: (500 / 20) + 'rem',
      chartTextStyle: {
        fontSize: 28 * window.adaptive.zoom
      },
      myList: [],
      shangzheng: [],
      chuangye: [],
      hushen: [],
      chartSettings: {}
    }
  },

  computed: {
    chartData () {
      const listMonth = this.myList
      let listShangzheng = this.shangzheng
      let listChuangye = this.chuangye
      let listHushen = this.hushen
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
      if (listShangzheng.length < 1 || listChuangye.length < 1 || listHushen.length < 1) {
        return {}
      }
      const baseShangzheng = listShangzheng[0].kline.close
      const baseChuangye = listChuangye[0].kline.close
      const baseHushen = listHushen[0].kline.close
      let row = []
      listMonth.forEach(function (item, index) {
        let data = {}
        data['日期'] = item['net_value_date']
        data['我的组合'] = numberUtil.keepTwoDecimals((item['net_value'] - 1) * 100)
        data['上证指数'] = numberUtil.keepTwoDecimals(((listShangzheng[index].kline.close - baseShangzheng) / baseShangzheng) * 100)
        data['创业指数'] = numberUtil.keepTwoDecimals(((listChuangye[index].kline.close - baseChuangye) / baseChuangye) * 100)
        data['沪深300指数'] = numberUtil.keepTwoDecimals(((listHushen[index].kline.close - baseHushen) / baseHushen) * 100)
        row.push(data)
      })
      console.log(row)
      return {
        columns: ['日期', '我的组合', '上证指数', '创业指数', '沪深300指数'],
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
        }
      })
      Http.get('webData/getWebStockdaybar', {
        code: 'sz399006'
      }).then((data) => {
        if (data.success) {
          this.chuangye = data.data.list
        }
      })
      Http.get('webData/getWebStockdaybar', {
        code: 'sz399300'
      }).then((data) => {
        if (data.success) {
          this.hushen = data.data.list
        }
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
