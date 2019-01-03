<template>
  <mt-cell-swipe :to="toUrl"
                 :class="['operating-info-item',buySellList[0], hasCount > 0 ? 'has':'no-has', 'should-' + marketWarn, lock ?'lock':'no-lock']">
    <div slot="title">
      <h3>
        {{indexInfo.name}}
        <i v-if="indexInfo.goodBad === '利空'" class="good-bad-tag fas fa-ban"></i>
        <span v-if="hasCount > 0" :class="['has-tag', buySellList[0]]">持有</span>
        <span v-if="hasCount" class="has-count">{{hasCount}}</span>
        <span v-if="positionWarn === 'danger'" class="danger-tag">危仓</span>
        <span v-if="positionWarn === 'warn'" class="warn-tag">高仓</span>
        <span style="float: right" :class="numberClass(rate)">{{rate}}%</span>
        <span style="float: right" v-if="indexInfo.stable" class="stable-tag">稳定</span>
        <span style="float: right" v-if="indexInfo.noLong" class="no-long-tag">短期</span>
        <span style="float: right" v-if="indexInfo.incomeHighRate" class="incomeHighRate-tag">高增</span>
      </h3>
      <p class="explain">
            <span v-for="(subItem, index) in buySellList" :key="subItem + index"
                  :class="subItem">{{subItem === 'buy'?'买':subItem === 'sell'?'卖':''}}</span>
      </p>
      <div class="other-text">
        <p v-if="rate <= -3">是否有利空？是就先不接，标记利空，不是也不要接太多</p>
      </div>
      <div v-if="lock" class="lock-tag"></div>
    </div>
  </mt-cell-swipe>
</template>

<script>
export default {
  name: 'OperatingInfoItem',
  data () {
    return {
    }
  },
  props: {
    indexInfo: {
      type: Object,
      default: function () {
        return {
        }
      }
    },
    toUrl: String,
    hasCount: {
      type: Number,
      default: 0
    },
    rate: {
      type: Number,
      default: 0
    },
    buySellList: {
      type: Array,
      default: function () {
        return ['', '', '', '', '']
      }
    },
    lock: {
      type: Boolean,
      default: false
    },
    marketWarn: {
      type: String
    },
    positionWarn: {
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
