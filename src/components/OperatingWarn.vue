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
        <span class="green-text">{{upFinalRate}}%</span>
      </div>
      <div class="item">
        <span class="label">跌概率：</span>
        <span class="green-text">{{downFinalRate}}%</span>
      </div>
      <div class="item">
        <span class="label">买金额：</span>
        <span class="green-text">{{buyOne}}</span>
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

export default {
  name: 'OperatingWarn',
  data () {
    const question1 = storageUtil.getMarketStatus('question_1')
    const question2 = storageUtil.getMarketStatus('question_2')
    const question3 = storageUtil.getMarketStatus('question_3')
    const question4 = storageUtil.getMarketStatus('question_4')
    const question5 = storageUtil.getMarketStatus('question_5')
    const question6 = storageUtil.getMarketStatus('question_6')
    const question7 = storageUtil.getMarketStatus('question_7')

    let ifOperatingTime = false
    const hour = new Date().getHours()
    if (hour === 14) {
      const Minute = new Date().getMinutes()
      if (Minute >= 40) {
        ifOperatingTime = true
      }
    }

    let upRate = 50
    let downRate = 50
    // 是否要护盘
    if (question3 === '是') {
      upRate += 10
      downRate -= 10
    }
    // 市场强弱
    if (question1 === '强') {
      upRate += 10
      downRate -= 10
    }
    if (question1 === '弱') {
      upRate -= 10
      downRate += 10
    }
    // 市场是否有利好
    if (question2 === '利好') {
      upRate += 10
      downRate -= 10
    }
    if (question2 === '利空') {
      upRate -= 10
      downRate += 10
    }
    // 是否有上涨意愿
    if (question5 === '是') {
      upRate += 10
      downRate -= 10
    }
    if (question5 === '否') {
      upRate -= 10
      downRate += 10
    }
    // 乐观悲观，特殊情况再加10
    if (question6 === '乐观') {
      upRate += 10
      if (question4 === '是') {
        upRate += 10
      }
    }
    if (question6 === '悲观') {
      downRate += 10
      if (question4 === '否') {
        downRate += 10
      }
    }
    // 缩量，特殊情况再加10
    if (question7 === '是') {
      if (question4 === '是') {
        upRate += 10
      }
    }
    if (question7 === '是') {
      if (question4 === '否') {
        downRate += 10
      }
    }
    return {
      ifOperatingTime,
      upRate,
      downRate,
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7
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
    myAsset: {
      type: Number,
      default: 100000
    },
    type: {
      type: String,
      default: '简'
    }
  },
  computed: {
    upFinalRate () {
      let one = 12
      let two = 18
      let upRate = this.upRate
      if (this.question7 === '否') {
        if (this.buyCount > one) {
          if (this.buyCount > two) {
            upRate += 20
          } else {
            upRate += 10
          }
        }
        if (this.sellCount > one) {
          if (this.sellCount > two) {
            upRate -= 20
          } else {
            upRate -= 10
          }
        }
      }
      return upRate
    },
    downFinalRate () {
      let one = 12
      let two = 18
      let downRate = this.downRate
      if (this.question7 === '否') {
        if (this.buyCount > one) {
          if (this.buyCount > two) {
            downRate -= 20
          } else {
            downRate -= 10
          }
        }
        if (this.sellCount > one) {
          if (this.sellCount > two) {
            downRate += 20
          } else {
            downRate += 10
          }
        }
      }
      return downRate
    },
    buyOne () {
      const flag = this.type === '熊' ? 1 : 0.7
      const base = flag * this.myAsset / 16000
      let b = 1
      if (this.upFinalRate >= 60) {
        b = 1.2
      }
      if (this.upFinalRate >= 70) {
        b = 1.4
      }
      if (this.upFinalRate >= 80) {
        b = 1.6
      }
      if (this.upFinalRate >= 90) {
        b = 1.8
      }
      if (this.upFinalRate >= 100) {
        b = 2
      }
      return Math.round(base * b) * 100
    }
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
