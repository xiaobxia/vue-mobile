<template>
  <div class="card">
    <h3 class="title">{{title}} <span :class="totalRate < 0 ? 'green-text' : 'red-text'">{{totalRate}}%</span><span style="float: right">{{totalCount}}</span></h3>
    <mt-cell-swipe v-for="(item) in listData" :key="item.code" :to="'/page/fundDetail?'+qsStringify(item)"
                   :class="{up:item.isUp, cut: ifCut(item), sell: ifSell(item)}">
      <div slot="title">
        <h3 :class="{lowRate: item.lowRate}">{{item.code}} {{formatName(item.name)}} <span style="float: right"
                                                          :class="countRate(item.valuationSum, item.sum) < 0 ? 'green-text' : 'red-text'">{{countRate(item.valuationSum, item.sum)}}%</span>
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
          <span class="item">持仓成本：{{item.costSum}}</span>
          <span class="item">收益率：<span
            :class="countRate(item.valuationSum, item.costSum) < 0 ? 'green-text' : 'red-text'">{{countRate(item.valuationSum, item.costSum)}}%</span></span>
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
import constUtil from '@/util/constUtil.js'

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
      if (name.length > 12) {
        return name.substr(0, 11) + '...'
      } else {
        return name
      }
    },
    ifCut (item) {
      const standard = item.standard || 1
      const allRate = this.countRate(item.valuationSum, item.costSum)
      // 5000
      const level1 = constUtil.standard
      // 4000
      const level2 = constUtil.cutLevel1
      if (item.has_days <= 7) {
        return false
      }
      // 盈利2.5点，减一次
      if (allRate >= 2.5) {
        if (numberUtil.ifAround(item.costSum, level1 * standard)) {
          return true
        }
      }
      // 盈利5点，减一次
      if (allRate >= 5) {
        if (numberUtil.ifAround(item.costSum, level2 * standard)) {
          return true
        }
      }
      // 亏损3点，减一次
      if (allRate <= -3) {
        if (numberUtil.ifAround(item.costSum, level2 * standard)) {
          return true
        }
      }
      // 亏损1.5点，减一次
      if (allRate <= -1.5) {
        if (numberUtil.ifAround(item.costSum, level1 * standard)) {
          return true
        }
      }
      return false
    },
    ifSell (item) {
      const allRate = this.countRate(item.valuationSum, item.costSum)
      // 小于7天
      if (item.has_days <= 7) {
        return false
      }
      // 待卖状态，亏损超过3个点的
      if (this.title === '待卖' && (allRate <= -3)) {
        return true
      }
      // 老的仓位，一接近成本线就卖
      if (item.has_days > 30) {
        if (allRate < 1 && allRate > -1) {
          return true
        }
      }
      // 利润大于5个点，并且并不是机构趋势的，卖掉
      if (allRate >= 5 && item.strategy !== '3') {
        return true
      }
      // 转为下跌
      //      if (this.countRate(item.weekAverage, item.monthAverage) < -0.5 || this.countRate(item.weekAverage, item.halfMonthAverage) < -0.5) {
      //        return true
      //      }
      return false
    }
  }
}
</script>
<style>
</style>
