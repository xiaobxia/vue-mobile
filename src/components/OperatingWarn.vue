<template>
  <div>
    <div class="count-wrap">
      <div class="item">
        <span class="label">信号比：</span>
        <span class="red-text">{{buyCount}}</span>
        <span>:</span>
        <span class="green-text">{{sellCount}}</span>
      </div>
      <div class="item">
        <span class="label">涨跌比：</span>
        <span class="red-text">{{countUpNumber}}</span>
        <span>:</span>
        <span class="green-text">{{countDownNumber}}</span>
      </div>
    </div>
    <div class="warn-wrap">
      <p v-if="ifOperatingTime" class="red-text">操作前应该去标记市场状况</p>
      <p v-if="sellCountLastDay > 10">市场大量卖出却没有跌，可以认为市场强</p>
      <p v-if="buyCountLastDay > 10">该涨不涨那市场就定为弱，一次可以忍，两次不行</p>
      <p v-if="marketStatus === '弱'">买入只看熊，熊里的卖出一定卖</p>
      <p v-if="nowMonthRate < -2">月线进入-2，减仓到半仓</p>
    </div>
  </div>
</template>

<script>
let ifOperatingTime = false
const hour = new Date().getHours()
if (hour === 14) {
  const Minute = new Date().getMinutes()
  if (Minute >= 40) {
    ifOperatingTime = true
  }
}
export default {
  name: 'OperatingWarn',
  data () {
    return {
      ifOperatingTime
    }
  },
  props: {
    buyCount: {
      type: Number,
      default: 0
    },
    sellCount: {
      type: Number,
      default: 0
    },
    countUpNumber: {
      type: Number,
      default: 0
    },
    countDownNumber: {
      type: Number,
      default: 0
    },
    sellCountLastDay: {
      type: Number,
      default: 0
    },
    buyCountLastDay: {
      type: Number,
      default: 0
    },
    nowMonthRate: {
      type: Number,
      default: 0
    },
    marketStatus: {
      type: String
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
