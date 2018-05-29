<template>
  <div class="my-fund">
    <mt-header title="我的持仓" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
      <mt-button slot="right">
        <i class="fas fa-plus" @click="addHandler"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="info-wrap">
        <span class="item">持仓金额：{{info.totalSum}}</span>
        <span class="item">持仓成本：{{info.costTotalSum}}</span>
        <span class="item">估算金额：{{info.valuationTotalSum}}</span>
        <span class="item">估算收益：<span :class="valuationInfo < 0 ? 'green-text' : 'red-text'">{{valuationInfo}}</span></span>
        <span class="item">市场平均：<span :class="marketRise < 0 ? 'green-text' : 'red-text'">{{marketRise}}%</span></span>
        <span class="item">估算比率：<span :class="myRise < 0 ? 'green-text' : 'red-text'">{{myRise}}%</span></span>
        </div>
      <my-fund-card :listData="myFundList1" :title="'超跌博反'"/>
      <my-fund-card :listData="myFundList2" :title="'逆势上涨'"/>
      <my-fund-card :listData="myFundList3" :title="'机构趋势'"/>
      <my-fund-card :listData="myFundList5" :title="'待卖'"/>
      <my-fund-card :listData="myFundList4" :title="'锁仓'"/>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
import MyFundCard from '@/components/MyFundCard.vue'
export default {
  name: 'MyFund',
  data () {
    return {
      info: {},
      list: [],
      timer: null,
      marketRise: 0,
      myRise: 0,
      myFundList1: [],
      myFundList2: [],
      myFundList3: [],
      myFundList4: [],
      myFundList5: []
    }
  },
  components: {MyFundCard},
  computed: {
    valuationInfo () {
      if (this.info.valuationTotalSum && this.info.totalSum) {
        return numberUtil.keepTwoDecimals(this.info.valuationTotalSum - this.info.totalSum)
      } else {
        return 0
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.timer = setInterval(() => {
      this.initPage()
    }, 1000 * 60)
    this.initPage()
  },
  methods: {
    initPage () {
      Http.get('fund/getUserFunds').then((data) => {
        const info = data.data.info
        this.info = info
        const list = data.data.list
        let list1 = []
        let list2 = []
        let list3 = []
        let list4 = []
        let list5 = []
        list.forEach((item) => {
          if (item.has_days <= 7) {
            list4.push(item)
          } else {
            if (this.ifWaitSell(item)) {
              list5.push(item)
            } else {
              if (item.strategy === '1') {
                list1.push(item)
              }
              if (item.strategy === '2') {
                list2.push(item)
              }
              if (item.strategy === '3') {
                list3.push(item)
              }
            }
          }
        })
        this.myFundList1 = list1
        this.myFundList2 = list2
        this.myFundList3 = list3
        this.myFundList4 = list4
        this.myFundList5 = list5
        this.myRise = numberUtil.countDifferenceRate(info.valuationTotalSum, info.totalSum)
      })
      Http.get('fund/getAverageValuationRate').then((data) => {
        this.marketRise = data.data.rate
      })
    },
    ifWaitSell (item) {
      const rate = numberUtil.countDifferenceRate(item.valuationSum, item.costSum)
      if (rate > 0) {
        // 上涨的情况
        if (item.valuationSum < 4000) {
          return true
        }
      } else {
        if (item.valuationSum < 3000) {
          return true
        }
      }
      return false
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    countValue (a, b) {
      return numberUtil.keepTwoDecimals(a - b)
    },
    countRate (a, b) {
      return numberUtil.countDifferenceRate(a, b)
    },
    addHandler () {
      this.$router.push({path: '/page/myFundAdd', query: {type: 'add'}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
