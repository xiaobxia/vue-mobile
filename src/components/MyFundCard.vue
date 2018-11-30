<template>
  <div class="card">
    <h3 class="title">{{title}} <span :class="numberClass(totalRate)">{{totalRate}}%</span><span style="float: right">{{totalCount}}</span></h3>
    <mt-cell-swipe v-for="(item) in listData" :key="item.code" :to="'/page/fundDetail?'+qsStringify(item)"
                   >
      <div slot="title">
        <h3 :class="{lowRate: item.lowRate}">
          {{item.code}}
          {{formatFundName(item.name, 11)}}
          <i class="lock-tag" v-if="ifLock(item)"></i>
          <i class="position-tag" v-if="ifPosition(item)"></i>
          <span style="float: right" :class="numberClass(countDifferenceRate(item.valuationSum, item.sum))">{{countDifferenceRate(item.valuationSum, item.sum)}}%</span>
        </h3>
        <p class="explain">
          <!--<span class="item">一月最低：<span :class="numberClass(item.monthMin)">{{item.monthMin}}%</span></span>-->
          <!--<span class="item">一月最高：<span :class="numberClass(item.monthMax)">{{item.monthMax}}%</span></span>-->
          <!--<span class="item">半月最低：<span :class="numberClass(item.halfMonthMin)">{{item.halfMonthMin}}%</span></span>-->
          <!--<span class="item">半月最高：<span :class="numberClass(item.halfMonthMax)">{{item.halfMonthMax}}%</span></span>-->
          <span class="item">持有天数：{{item.has_days}}天</span>
          <span class="item">持仓金额：{{item.sum}}</span>
          <span class="item">估算金额：{{item.valuationSum}}</span>
          <span class="item">估算收益：<span
            :class="numberClass(keepTwoDecimals(item.valuationSum-item.sum))">{{keepTwoDecimals(item.valuationSum-item.sum)}}</span></span>
          <span class="item">持仓成本：{{parseInt(item.costSum)}}</span>
          <span class="item">收益率：<span
            :class="numberClass(countDifferenceRate(item.valuationSum, item.costSum))">{{countDifferenceRate(item.valuationSum, item.costSum)}}%</span></span>
          <span class="item">持有份额：{{item.shares}}</span>
        </p>
      </div>
      <div class="right-wrap">
      </div>
    </mt-cell-swipe>
  </div>
</template>
<script>
import qs from 'qs'

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
      return this.countDifferenceRate(valuation, sum)
    }
  },
  props: {
    listData: Array,
    title: String
  },
  mounted () {
  },
  methods: {
    qsStringify (query) {
      query.type = 'edit'
      return qs.stringify(query)
    }
  }
}
</script>
<style>
</style>
