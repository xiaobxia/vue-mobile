<template>
  <div class="strategy-list">
    <mt-cell-swipe v-for="(item) in listData" :key="item.code" :to="'/page/fundDetail?code='+item.code" :class="item.has?'grey-back':''">
      <div slot="title">
        <h3>{{item.code}} {{item.name}} <span style="float: right"
                                              :class="item.valuationRate < 0 ? 'green-text' : 'red-text'">{{item.valuationRate}}%</span>
        </h3>
        <p class="explain">
            <mt-badge v-if="item.result.isMonthSlump" color="#52c41a">一月暴跌</mt-badge>
            <mt-badge v-if="item.result.isHalfMonthSlump" color="#52c41a">半月暴跌</mt-badge>
            <mt-badge v-if="item.result.isLow" color="#108ee9">低位</mt-badge>
            <mt-badge v-if="item.result.isLowHalf" color="#108ee9">半年低位</mt-badge>
            <mt-badge v-if="item.result.isMin" color="#13c2c2">新低</mt-badge>
        </p>
        <p class="explain">
          <mt-badge v-if="item.result.isMonthBoom" color="red">近期暴涨</mt-badge>
          <mt-badge v-if="item.result.isHalfMonthBoom" color="red">超短暴涨</mt-badge>
          <mt-badge v-if="item.result.isHigh" color="gold">高位</mt-badge>
          <mt-badge v-if="item.result.isLowHalf" color="gold">半年高位</mt-badge>
        </p>
      </div>
      <div class="right-wrap">
      </div>
    </mt-cell-swipe>
  </div>
</template>
<script>

export default{
  name: 'StrategyList',
  data () {
    return {}
  },
  computed: {},
  props: {
    listData: Array
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style>
</style>
