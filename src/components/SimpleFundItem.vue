<template>
  <mt-cell-swipe :key="item.code" :to="'/page/fundDetail?code='+item.code" :class="['simple-fund-item',item.has?'has-back':'']">
    <div slot="title">
      <h3 :class="{lowRate: item.lowRate}">
        {{item.code}} {{formatFundName(item.name)}}
        <i class="lock-tag" v-if="ifLock(item)"></i>
        <i class="position-tag" v-if="ifPosition(item)"></i>
        <i class="fixed-investment-tag" v-if="ifFixedInvestment(item)"></i>
        <span style="float: right" :class="numberClass(item.rate)">{{item.rate}}%</span>
      </h3>
    </div>
  </mt-cell-swipe>
</template>

<script>
export default {
  name: 'SimpleFundItem',
  data () {
    return {
    }
  },
  props: {
    item: {
      type: Object,
      require: true
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
