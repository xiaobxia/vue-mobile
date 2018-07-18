<template>
  <div class="card">
    <h3 class="title">{{title}} <span :class="totalRate < 0 ? 'green-text' : 'red-text'">{{totalRate}}%</span><span style="float: right">{{totalCount}}</span></h3>
    <mt-cell-swipe v-for="(item) in listData" :key="item.code" :to="'/page/fundDetail?'+qsStringify(item)"
                   :class="{up:item.isUp, cut: ifCut(item), sell: ifSell(item)}">
      <div slot="title">
        <h3 :class="{lowRate: item.lowRate}">
          {{item.code}}
          {{formatName(item.name)}}
          <i class="lock-tag" v-if="ifLock(item)"></i>
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
          <span class="item">持仓成本：{{item.costSum}}</span>
          <span class="item">收益率：<span
            :class="countRate(item.valuationSum, item.costSum) < 0 ? 'green-text' : 'red-text'">{{countRate(item.valuationSum, item.costSum)}}%</span></span>
          <span class="item">持有份额：{{item.shares}}</span>
          <span class="item">调仓份额：{{countCutShares(item)}}</span>
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
      if (name.length > 11) {
        return name.substr(0, 10) + '...'
      } else {
        return name
      }
    },
    ifLock (item) {
      return item.has_days <= constUtil.minHasDay
    },
    countCutShares (item) {
      const costSum = item.costSum
      const multiple = item.standard || 1
      const standard = constUtil.standard * multiple
      const cutLevelOne = constUtil.cutRateLevelOne * standard
      const cutLevelTwo = constUtil.cutRateLevelTwo * standard
      if ((costSum > cutLevelOne) && !numberUtil.ifAround(item.costSum, cutLevelOne)) {
        let newShares = cutLevelOne / item.cost
        return parseInt(item.shares - newShares)
      }
      if ((costSum > cutLevelTwo) && !numberUtil.ifAround(item.costSum, cutLevelTwo)) {
        let newShares = cutLevelTwo / item.cost
        return parseInt(item.shares - newShares)
      }
      return item.shares
    },
    ifCut (item) {
      const multiple = item.standard || 1
      const allRate = this.countRate(item.valuationSum, item.costSum)
      const standard = constUtil.standard * multiple
      const cutRateLevelOne = constUtil.cutRateLevelOne

      if (item.has_days <= constUtil.minHasDay) {
        return false
      }
      // 盈利2.5点，减一次
      if (allRate >= 2.5) {
        if (numberUtil.ifAround(item.costSum, standard)) {
          return true
        }
      }
      // 盈利5点，减一次
      if (allRate >= 5) {
        if (numberUtil.ifAround(item.costSum, cutRateLevelOne * standard)) {
          return true
        }
      }
      // 亏损1.5点，减一次
      if (allRate <= -1.5) {
        if (numberUtil.ifAround(item.costSum, standard)) {
          return true
        }
      }
      // 亏损3点，减一次
      if (allRate <= -3) {
        if (numberUtil.ifAround(item.costSum, cutRateLevelOne * standard)) {
          return true
        }
      }
      return false
    },
    ifSell (item) {
      const allRate = this.countRate(item.valuationSum, item.costSum)
      // 小于7天
      if (item.has_days <= constUtil.minHasDay) {
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
      return false
    }
  }
}
</script>
<style>
</style>
