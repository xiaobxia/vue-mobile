<template>
  <div class="principle-wrap">
    <mt-header title="原则" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="principle-block">
        <h3>信号</h3>
        <ol>
          <li>在市场环境不错(建议仓位高)的时候，出现卖点还可以拿一拿，等出现首阴了再卖。</li>
          <li>当卖点出现很久还不出阴线的，可以继续持有，等待回调到距离卖点的一半再卖出。</li>
          <li>如果批量出现卖出信号，那就卖出。如果大部分处于买入信号，那么出了卖出信号，是可以考虑继续持有的。</li>
          <li>对于特别强势的抱团股，出现卖出信号可以减仓。出买入信号那就买，等市场环境一变好，大资金买的还是这些。</li>
        </ol>
      </div>
      <div class="principle-block">
        <h3>图形</h3>
        <ol>
          <li>支撑是没有用的，大概率破位。</li>
        </ol>
      </div>
      <div class="principle-block">
        <h3>消息面</h3>
        <ol>
          <li>出现巨大利空马上逃，因为至少会影响3天。</li>
          <li>放消息说了不能炒的，那就一定不要炒。</li>
          <li>国家队砸盘那就离场，应该还会砸几天，特别是，砸什么那就卖什么。</li>
        </ol>
      </div>
      <div class="principle-block">
        <h3>下跌</h3>
        <ol>
          <li>下跌趋势会以最后的暴跌结束。</li>
          <li>超跌后反弹，还是以表现强势的领涨。</li>
        </ol>
      </div>
      <div class="principle-block">
        <h3>趋势</h3>
        <ol>
          <li>在上升市中做超跌，在下跌市中做强势。</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Principle',
  data () {
    return {
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
