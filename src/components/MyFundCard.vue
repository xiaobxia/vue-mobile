<template>
  <div class="card">
    <h3 class="title">{{title}} {{totalCount}}</h3>
    <mt-cell-swipe v-for="(item) in listData" :key="item.code" :to="'/page/fundDetail?code='+item.code">
      <div slot="title">
        <h3>{{item.code}} {{item.name}} <span style="float: right" :class="countRate(item.valuationSum, item.sum) < 0 ? 'green-text' : 'red-text'">{{countRate(item.valuationSum, item.sum)}}%</span></h3>
        <p class="explain">
          <span class="item">持有天数：{{item.has_days}}天</span>
          <span class="item">持仓金额：{{item.sum}}</span>
          <span class="item">估算金额：{{item.valuationSum}}</span>
          <span class="item">估算收益：<span :class="countValue(item.valuationSum, item.sum) < 0 ? 'green-text' : 'red-text'">{{countValue(item.valuationSum, item.sum)}}</span></span>
          <span class="item">持仓成本：{{item.costSum}}</span>
          <span class="item">收益率：<span :class="countRate(item.sum, item.costSum) < 0 ? 'green-text' : 'red-text'">{{countRate(item.sum, item.costSum)}}%</span></span>
        </p>
      </div>
      <div class="right-wrap">
      </div>
    </mt-cell-swipe>
  </div>
</template>
<script>
import numberUtil from '@/util/numberUtil.js'
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
    }
  }
}
</script>
<style>
</style>
