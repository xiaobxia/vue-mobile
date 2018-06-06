<template>
  <div class="card">
    <h3 class="title">{{title}} <span style="float: right">{{totalCount}}</span></h3>
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
      const rate = this.countRate(item.valuationSum)
      const level1 = constUtil.standard
      const level2 = constUtil.cutLevel1
      const level3 = constUtil.cutLevel1
      if (item.has_days <= 7) {
        return false
      }
      if (rate >= 3) {
        if (numberUtil.ifAround(item.costSum, level1 * standard)) {
          return true
        }
      }
      if (rate >= 6) {
        if (numberUtil.ifAround(item.costSum, level2 * standard)) {
          return true
        }
      }
      if (rate <= -1) {
        if (numberUtil.ifAround(item.costSum, level2 * standard)) {
          return true
        }
      }
      if (rate <= -2) {
        if (numberUtil.ifAround(item.costSum, level3 * standard)) {
          return true
        }
      }
      return false
    },
    ifSell (item) {
      // 小于7天
      if (item.has_days <= 7) {
        return false
      }
      // 转为下跌
      if (this.countRate(item.weekAverage, item.monthAverage) < -0.5 || this.countRate(item.weekAverage, item.halfMonthAverage) < -0.5) {
        return true
      }
      return false
    }
  }
}
</script>
<style>
</style>
