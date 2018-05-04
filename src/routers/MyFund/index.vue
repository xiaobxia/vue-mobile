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
      </div>
      <my-fund-card :listData="myFundList1" :title="'超跌'"/>
      <my-fund-card :listData="myFundList2" :title="'追涨'"/>
      <my-fund-card :listData="myFundList3" :title="'趋势'"/>
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
      timer: null
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
    },
    myFundList1 () {
      let temp = []
      this.list.forEach((item) => {
        if (item.strategy === '1') {
          temp.push(item)
        }
      })
      return temp
    },
    myFundList2 () {
      let temp = []
      this.list.forEach((item) => {
        if (item.strategy === '2') {
          temp.push(item)
        }
      })
      return temp
    },
    myFundList3 () {
      let temp = []
      this.list.forEach((item) => {
        if (item.strategy === '3') {
          temp.push(item)
        }
      })
      return temp
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.timer = setInterval(() => {
      this.initPage()
    }, 5000)
    this.initPage()
  },
  methods: {
    initPage () {
      Http.get('fund/getUserFunds').then((data) => {
        this.info = data.data.info
        this.list = data.data.list
      })
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
