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
      <div class="item">
        <span class="label">涨概率：</span>
        <span class="green-text">{{upRate + (buyCount > 10? 10: 0) + (sellCount > 10? -10: 0)}}%</span>
      </div>
    </div>
    <div class="warn-wrap">
      <p v-if="ifOperatingTime" class="red-text">操作前应该去标记市场状况</p>
      <p v-if="sellCountLastDay >= 10">市场大量卖出却没有跌，可以认为市场强</p>
      <p v-if="buyCountLastDay >= 10">该涨不涨那市场就定为弱，一次可以忍，两次不行</p>
      <p v-if="question1 === '弱'">买入只看熊，熊里的卖出一定卖</p>
      <p v-if="nowMonthRate < -2">月线进入-2，减仓到半仓</p>
    </div>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'
const question1 = storageUtil.getMarketStatus('question_1')
const question2 = storageUtil.getMarketStatus('question_2')
const question3 = storageUtil.getMarketStatus('question_3')
const question4 = storageUtil.getMarketStatus('question_4')
const question5 = storageUtil.getMarketStatus('question_5')
const question6 = storageUtil.getMarketStatus('question_6')

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
    let upRate = 50
    // 是否要护盘
    if (question3 === '是') {
      upRate += 10
    }
    // 市场强弱
    if (question1 === '强') {
      upRate += 10
    }
    if (question1 === '弱') {
      upRate -= 10
    }
    // 市场是否有利好
    if (question2 === '利好') {
      upRate += 10
    }
    if (question2 === '利空') {
      upRate -= 10
    }
    // 是否有上涨意愿
    if (question5 === '是') {
      upRate += 10
    }
    if (question5 === '否') {
      upRate -= 10
    }
    // 有外部事件，且长期悲观
    if (question4 === '是') {
      if (question6 === '是') {
        upRate += 10
      }
    }
    return {
      ifOperatingTime,
      upRate,
      question1
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
