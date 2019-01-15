<template>
  <mt-cell-swipe :to="toUrl"
                 :class="['operating-info-item',buySellList[0], hasCount > 0 ? 'has':'no-has', 'should-' + marketWarn, lock ?'lock':'no-lock']">
    <div slot="title">
      <h3>
        {{indexInfo.name}}
        <i v-if="indexInfo.goodBad === '利空'" class="good-bad-tag fas fa-ban"></i>
        <span v-if="hasCount > 0" :class="['has-icon', buySellList[0]]"><i class="fas fa-hand-holding-usd"></i></span>
        <span v-if="hasCount" class="has-count">{{hasCount}}</span>
        <span v-if="positionWarn === 'danger'" class="danger-tag">危仓</span>
        <span v-if="positionWarn === 'warn'" class="warn-tag">高仓</span>
        <span style="float: right" :class="numberClass(rate)">{{rate}}%</span>
        <!--<span style="float: right" v-if="indexInfo.stable" class="stable-tag">稳定</span>-->
        <!--<span style="float: right" v-if="indexInfo.noLong" class="no-long-tag">短期</span>-->
        <!--<span style="float: right" v-if="indexInfo.incomeHighRate" class="incomeHighRate-tag">高增</span>-->
      </h3>
      <p class="explain">
            <span v-for="(subItem, index) in buySellList" :key="subItem + index"
                  :class="subItem">{{subItem === 'buy'?'买':subItem === 'sell'?'卖':''}}</span>
      </p>
      <p class="netChange">
            <span v-for="(subItem, index) in netChangeRatioList" :key="index"
                  :class="numberClass(subItem)"></span>
      </p>
      <div class="other-text">
        <p v-if="rate <= -3">是否有利空？是就先不接，标记利空，不是也不要接太多</p>
      </div>
      <div class="left-tag">
        <span v-if="lowSell && hasCount > 0" class="low-sell top"><i class="fas fa-long-arrow-alt-down"></i></span>
        <span v-if="ifStepUp" class="up-tag red-text mid"><i class="fas fa-level-up-alt"></i></span>
        <span v-if="ifStepDown" class="down-tag green-text mid"><i class="fas fa-level-down-alt"></i></span>
        <span v-if="changeMarket" class="change-tag bottom"><i class="fas fa-exchange-alt"></i></span>
      </div>
      <div class="right-tag">
        <span v-if="lock" class="lock-tag top"></span>
        <span class="bottom buysell">
          <i v-if="otherBuySell === 'buy'" class="red-text fas fa-shopping-cart"></i>
          <i v-if="otherBuySell === 'sell'" class="green-text fas fa-sign-out-alt"></i>
        </span>
      </div>
    </div>
  </mt-cell-swipe>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'
import operatingTooltip from '@/util/operatingTooltip.js'
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
    netChangeRatioList: {
      type: Array,
      default: function () {
        return [0, 0, 0, 0, 0]
      }
    },
    closeList: {
      type: Array,
      default: function () {
        return [0, 0, 0, 0, 0]
      }
    },
    lock: {
      type: Boolean,
      default: false
    },
    lowSell: {
      type: Boolean,
      default: false
    },
    marketWarn: {
      type: String
    },
    positionWarn: {
      type: String
    },
    type: {
      type: String,
      default: '简'
    }
  },
  computed: {
    changeMarket () {
      return storageUtil.getChangeMarket(this.indexInfo.key) || false
    },
    otherBuySell () {
      if (this.type === '简') {
        return storageUtil.getXiong(this.indexInfo.key)
      } else {
        return storageUtil.getJian(this.indexInfo.key)
      }
    },
    ifStepUp () {
      return operatingTooltip.ifStepUp(this.netChangeRatioList, this.closeList)
    },
    ifStepDown () {
      return operatingTooltip.ifStepDown(this.netChangeRatioList, this.closeList)
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
