<template>
  <div class="strategy-list">
    <mt-cell-swipe v-for="(item) in listData" :key="item.code" :to="'/page/fundDetail?code='+item.code" :class="item.has?'has-back':''">
      <div slot="title">
        <h3 :class="{lowRate: item.lowRate}">{{item.code}} {{formatName(item.name)}} <span style="float: right"
                                              :class="item.valuationRate < 0 ? 'green-text' : 'red-text'">{{item.valuationRate}}%</span>
        </h3>
        <p class="explain">
            <mt-badge v-if="item.result.isMonthSlump" color="#52c41a">一月暴跌</mt-badge>
            <mt-badge v-if="item.result.isHalfMonthSlump" color="#52c41a">半月暴跌</mt-badge>
            <mt-badge v-if="item.result.isLow" color="#108ee9">一月低位</mt-badge>
            <mt-badge v-if="item.result.isLowHalf" color="#108ee9">半月低位</mt-badge>
            <mt-badge v-if="item.result.isMin" color="#13c2c2">新低</mt-badge>
            <mt-badge v-if="item.isUp" color="rgb(181,57,74)">上行</mt-badge>
            <mt-badge v-if="item.isReverse" color="rgb(255, 147, 22)">反转</mt-badge>
        </p>
        <p class="explain">
          <mt-badge v-if="item.result.isMonthBoom" color="#f50">近期暴涨</mt-badge>
          <mt-badge v-if="item.result.isHalfMonthBoom" color="#f50">超短暴涨</mt-badge>
          <mt-badge v-if="item.result.isHigh" color="#faad14">一月高位</mt-badge>
          <mt-badge v-if="item.result.isHighHalf" color="#faad14">半月高位</mt-badge>
          <mt-badge v-if="item.isDown" color="rgb(57, 181, 74)">下行</mt-badge>
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
    formatName (name) {
      if (name.length > 12) {
        return name.substr(0, 11) + '...'
      } else {
        return name
      }
    }
  }
}
</script>
<style>
</style>
