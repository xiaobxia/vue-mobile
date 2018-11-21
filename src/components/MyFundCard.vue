<template>
  <div class="card">
    <h3 class="title">{{title}} <span :class="totalRate < 0 ? 'green-text' : 'red-text'">{{totalRate}}%</span><span style="float: right">{{totalCount}}</span></h3>
    <mt-cell-swipe v-for="(item) in listData" :key="item.code" :to="'/page/fundDetail?'+qsStringify(item)"
                   :class="{up:item.isUp}">
      <div slot="title">
        <h3 :class="{lowRate: item.lowRate}">
          {{item.code}}
          {{formatName(item.name)}}
          <i class="lock-tag" v-if="ifLock(item)"></i>
          <i class="position-tag" v-if="ifPosition(item)"></i>
          <span style="float: right" :class="countRate(item.valuationSum, item.sum) < 0 ? 'green-text' : 'red-text'">{{countRate(item.valuationSum, item.sum)}}%</span>
        </h3>
        <p class="explain">
          <span class="item">一月最低：<span :class="item.monthMin < 0 ? 'green-text' : 'red-text'">{{item.monthMin}}%</span></span>
          <span class="item">一月最高：<span :class="item.monthMax < 0 ? 'green-text' : 'red-text'">{{item.monthMax}}%</span></span>
          <span class="item">半月最低：<span :class="item.halfMonthMin < 0 ? 'green-text' : 'red-text'">{{item.halfMonthMin}}%</span></span>
          <span class="item">半月最高：<span :class="item.halfMonthMax < 0 ? 'green-text' : 'red-text'">{{item.halfMonthMax}}%</span></span>
          <span class="item">持有天数：{{item.has_days}}天</span>
          <span class="item">持仓金额：{{item.sum}}</span>
          <span class="item">估算金额：{{item.valuationSum}}</span>
          <span class="item">估算收益：<span
            :class="countValue(item.valuationSum, item.sum) < 0 ? 'green-text' : 'red-text'">{{countValue(item.valuationSum, item.sum)}}</span></span>
          <span class="item">持仓成本：{{parseInt(item.costSum)}}</span>
          <span class="item">收益率：<span
            :class="countRate(item.valuationSum, item.costSum) < 0 ? 'green-text' : 'red-text'">{{countRate(item.valuationSum, item.costSum)}}%</span></span>
          <span class="item">持有份额：{{item.shares}}</span>
        </p>
      </div>
      <div class="right-wrap">
      </div>
    </mt-cell-swipe>
  </div>
</template>
<script>
import numberUtil from '@/util/numberUtil.js'
import qs from 'qs'
import fundAccountUtil from '@/util/fundAccountUtil.js'

export default{
  name: 'MyFundCard',
  data () {
    return {}
  },
  computed: {
    totalCount () {
      let count = 0
      const listData = this.listData
      for (let i = 0; i < listData.length; i++) {
        count += listData[i].costSum
      }
      return Math.round(count)
    },
    totalRate () {
      let valuation = 0
      let sum = 0
      for (let i = 0; i < this.listData.length; i++) {
        valuation += this.listData[i].valuationSum
        sum += this.listData[i].sum
      }
      return this.countRate(valuation || 1, sum || 1)
    }
  },
  props: {
    listData: Array,
    title: String
  },
  mounted () {
  },
  methods: {
    countValue (a, b) {
      return numberUtil.keepTwoDecimals(a - b)
    },
    countRate (a, b) {
      return numberUtil.countDifferenceRate(a, b)
    },
    qsStringify (query) {
      query.type = 'edit'
      return qs.stringify(query)
    },
    formatName (name) {
      if (name.length > 11) {
        return name.substr(0, 10) + '...'
      } else {
        return name
      }
    },
    ifLock (item) {
      return !fundAccountUtil.ifRelieve(item)
    },
    ifPosition (item) {
      if (item['position_record']) {
        if (JSON.parse(item['position_record']).length > 1) {
          return true
        }
      }
      return false
    }
  }
}
</script>
<style>
</style>
