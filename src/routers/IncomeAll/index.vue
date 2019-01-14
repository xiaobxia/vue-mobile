<template>
  <div class="income-all">
    <mt-header title="总收益" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="">
        <table width="100%" cellspacing="1" cellpadding="20">
          <tr>
            <th>指数</th>
            <th>总收益（基于本账户）</th>
          </tr>
          <tr>
            <td>我的</td>
            <td>{{allRate.my}}%</td>
          </tr>
          <tr>
            <td>上证</td>
            <td>{{allRate.shangzheng}}% <span :class="numberClass(allRate.my - allRate.shangzheng)">( {{keepTwoDecimals(allRate.my - allRate.shangzheng)}}% )</span></td>
          </tr>
          <tr>
            <td>创业</td>
            <td>{{allRate.chuangye}}% <span :class="numberClass(allRate.my - allRate.chuangye)">( {{keepTwoDecimals(allRate.my - allRate.chuangye)}}% )</span></td>
          </tr>
          <tr>
            <td>上证50</td>
            <td>{{allRate.wulin}}% <span :class="numberClass(allRate.my - allRate.wulin)">( {{keepTwoDecimals(allRate.my - allRate.wulin)}}% )</span></td>
          </tr>
          <tr>
            <td>沪深300</td>
            <td>{{allRate.hushen}}% <span :class="numberClass(allRate.my - allRate.hushen)">( {{keepTwoDecimals(allRate.my - allRate.hushen)}}% )</span></td>
          </tr>
          <tr>
            <td>沪深500</td>
            <td>{{allRate.wubai}}% <span :class="numberClass(allRate.my - allRate.wubai)">( {{keepTwoDecimals(allRate.my - allRate.wubai)}}% )</span></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
import {Indicator} from 'mint-ui'

let webDataMap = {
  shangzheng: {
    code: 'sh000001',
    name: '上证'
  },
  chuangye: {
    code: 'sz399006',
    name: '创业'
  },
  wulin: {
    code: 'sh000016',
    name: '上证50'
  },
  hushen: {
    code: 'sh000300',
    name: '沪深300'
  },
  'wubai': {
    code: 'sh000905',
    name: '500'
  }
}

let webDataKeyRateMap = {}
for (let key in webDataMap) {
  webDataKeyRateMap[key] = 0
}

export default {
  name: 'IncomeAll',
  data () {
    return {
      allRate: {
        my: 0,
        ...webDataKeyRateMap
      }
    }
  },

  computed: {
  },
  mounted () {
    this.initPage()
  },

  methods: {
    initPage () {
      Indicator.open({
        spinnerType: 'fading-circle'
      })
      let queryList = []
      Http.get('fund/getUserIncomeInfo').then((res) => {
        const data = res.data
        if (data.firstUserNetValue && data.firstUserNetValue.net_value_date) {
          const startDate = data.firstUserNetValue.net_value_date
          this.allRate.my = numberUtil.countDifferenceRate((data.userNetValue && data.userNetValue.asset) || data.fundAssetInfo.fundAssetCost, data.fundAssetInfo.fundAssetCost)
          for (let key in webDataMap) {
            queryList.push(Http.get(`webData/getWebStockdaybarRateByLocal`, {
              code: webDataMap[key].code,
              start: startDate
            }).then((res) => {
              if (res.success) {
                this.allRate[key] = res.data.rate
              }
            }))
          }
          Promise.all(queryList).then(() => {
            Indicator.close()
          })
        } else {
          Indicator.close()
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
