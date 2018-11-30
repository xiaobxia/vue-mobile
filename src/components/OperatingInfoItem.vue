<template>
  <mt-cell-swipe :to="toUrl"
                 :class="['operating-info-item',buySellList[0], hasCount > 0 ? 'has':'no-has', warn?'warn':'no-warn', lock ?'lock':'no-lock']">
    <div slot="title">
      <h3>
        {{indexInfo.name}}
        <span v-if="hasCount > 0" :class="['has-tag', buySellList[0]]">持有</span>
        <span v-if="hasCount" class="has-count">{{hasCount}}</span>
        <span v-if="hasCount >= (totalAsset/15)" class="danger-tag"></span>
        <span v-if="!(hasCount >= (totalAsset/15)) && (hasCount >= (totalAsset/25))" class="warn-tag"></span>
        <span style="float: right" :class="numberClass(rate)">{{rate}}%</span>
      </h3>
      <p class="explain">
            <span v-for="(subItem, index) in buySellList" :key="subItem + index"
                  :class="subItem">{{subItem === 'buy'?'买':subItem === 'sell'?'卖':''}}</span>
      </p>
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
          name: '未知'
        }
      }
    },
    toUrl: String,
    totalAsset: {
      type: Number,
      default: 10000
    },
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
        return ['','','','','']
      }
    },
    lock: {
      type: Boolean,
      default: false
    },
    warn: {
      type: Boolean,
      default: false
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
