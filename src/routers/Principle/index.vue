<template>
  <div class="principle-wrap">
    <mt-header title="原则" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="principle-block">
        <h3>图形</h3>
        <ol>
          <li>支撑是没有用的，大概率破位。</li>
          <li>没有到情绪崩溃的尾盘上拉，那就减仓，大概率继续跌。</li>
        </ol>
      </div>
      <div class="principle-block">
        <h3>持仓</h3>
        <ol>
          <li class="red-text">涨出分歧了就降仓位，领涨的第二天大概率下跌，卖掉领涨的，领跌的第二天大概率涨。降1/4的仓位。</li>
          <li>很多时候你掉不了头，就是因为持仓没有流动。</li>
        </ol>
      </div>
      <div class="principle-block">
        <h3>态度</h3>
        <ol>
          <li>放消息说了不能炒的，那就一定不要炒。</li>
          <li>国家队砸盘那就离场，应该还会砸几天，特别是，砸什么那就卖什么。</li>
        </ol>
      </div>
      <div class="principle-block">
        <h3>上升</h3>
        <ol>
          <li class="red-text">在普涨行情中，还是下跌，并且没出现买入理由的就卖掉。</li>
        </ol>
      </div>
      <div class="principle-block">
        <h3>下跌</h3>
        <ol>
          <li class="red-text">在普跌行情中，逆势的板块可以买入。</li>
          <li>下跌趋势会以最后的暴跌结束。</li>
          <li>超跌后反弹，还是以表现强势的领涨。</li>
        </ol>
      </div>
      <div class="principle-block">
        <h3>趋势</h3>
        <ol>
          <li>在上升市中做超跌，在下跌市中做强势。</li>
          <li>历史上没有走出趋势的，不要做趋势。</li>
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
