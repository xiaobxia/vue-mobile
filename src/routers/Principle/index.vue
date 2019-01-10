<template>
  <div class="principle-wrap">
    <mt-header title="原则" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="question">
        1.是否需要护盘？
      </div>
      <div class="answer">
        <mt-radio
          align="right"
          v-model="question_3"
          :options="['是', '否']">
        </mt-radio>
      </div>
      <div class="question">
        2.市场强弱情况？(该跌不跌，该涨不涨，怂)
      </div>
      <div class="answer">
        <mt-radio
          align="right"
          v-model="question_1"
          :options="['强', '略强', '略弱', '弱']">
        </mt-radio>
      </div>
      <div class="question">
        3.消息面情况？(不是指未来的利好)
      </div>
      <div class="answer">
        <mt-radio
          align="right"
          v-model="question_2"
          :options="['利好', '无', '利空']">
        </mt-radio>
      </div>
      <div class="question">
        4.明天是否是特殊的时间点（事件，周五，假期）？
      </div>
      <div class="answer">
        <mt-radio
          align="right"
          v-model="question_4"
          :options="['是', '否']">
        </mt-radio>
      </div>
      <div class="question">
        5.是否有上涨的意愿（高开冲高，只看前30分钟）？
      </div>
      <div class="answer">
        <mt-radio
          align="right"
          v-model="question_5"
          :options="['是', '否']">
        </mt-radio>
      </div>
      <div class="question">
        6.是否悲观（卖飞，买亏）？
      </div>
      <div class="answer">
        <mt-radio
          align="right"
          v-model="question_6"
          :options="['乐观', '无', '悲观']">
        </mt-radio>
      </div>
      <div class="question">
        7.是否缩量？
      </div>
      <div class="answer">
        <mt-radio
          align="right"
          v-model="question_7"
          :options="['是', '否']">
        </mt-radio>
      </div>
      <div class="suggest">
        <template v-if="['是'].indexOf(question_3) !== -1">
          <p>在需要护盘的下跌期，就不要再看创业板了，看50。</p>
        </template>
        <template v-if="['强', '略强'].indexOf(question_1) !== -1">
          <p>在市场环境不错的时候，出现卖点还可以拿一拿，等出现首阴了再决定。</p>
          <p>在市场环境不错的时候，卖飞了，可以考虑接回来。</p>
          <p>在市场环境不错的时候，出现买点，都可以考虑买一点。</p>
        </template>
        <template v-if="['略弱', '弱'].indexOf(question_1) !== -1">
          <p>在市场环境不行的时候，出现卖点就该卖掉，至少得要减仓。</p>
          <p>在市场环境不行的时候，出现买点，要少买，不能在单个品种下重仓。</p>
        </template>
        <template v-if="['利空'].indexOf(question_2) !== -1">
          <p>出现巨大利空马上逃，因为影响是持续的，之后会不断有人找理由做空。</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import storageUtil from '@/util/storageUtil.js'

export default {
  name: 'Principle',
  data () {
    return {
      question_1: storageUtil.getMarketStatus('question_1') || '强',
      question_2: storageUtil.getMarketStatus('question_2') || '无',
      question_3: storageUtil.getMarketStatus('question_3') || '否',
      question_4: storageUtil.getMarketStatus('question_4') || '否',
      question_5: storageUtil.getMarketStatus('question_5') || '否',
      question_6: storageUtil.getMarketStatus('question_6') || '无',
      question_7: storageUtil.getMarketStatus('question_7') || '否'
    }
  },
  watch: {
    question_1 (val) {
      storageUtil.setMarketStatus('question_1', val)
    },
    question_2 (val) {
      storageUtil.setMarketStatus('question_2', val)
    },
    question_3 (val) {
      storageUtil.setMarketStatus('question_3', val)
    },
    question_4 (val) {
      storageUtil.setMarketStatus('question_4', val)
    },
    question_5 (val) {
      storageUtil.setMarketStatus('question_5', val)
    },
    question_6 (val) {
      storageUtil.setMarketStatus('question_6', val)
    },
    question_7 (val) {
      storageUtil.setMarketStatus('question_7', val)
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
