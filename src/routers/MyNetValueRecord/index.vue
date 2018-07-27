<template>
  <div class="my-net-value-record">
    <mt-header title="净值记录" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
      <mt-button slot="right">
        <i class="fas fa-plus" @click="addHandler"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <mt-cell-swipe v-for="(item) in list" :key="item._id" :to="'/page/myNetValueAdd?'+qsStringify(item)">
          <div slot="title">
            <h3>
              {{item.net_value_date}}
              <span style="float: right" :class="item.rate < 0 ? 'green-text' : 'red-text'">{{item.rate}}%</span>
            </h3>
            <p class="explain">
              <span class="item">资产：{{item.asset}}</span>
              <span class="item">份额：{{item.shares}}</span>
              <span class="item">净值：{{item.net_value}}</span>
            </p>
          </div>
        </mt-cell-swipe>
      </ul>
    </div>
  </div>
</template>
<script>
import Http from '@/util/httpUtil.js'
import qs from 'qs'
import numberUtil from '@/util/numberUtil.js'

export default{
  name: 'MyNetValueRecord',
  data () {
    return {
      queryData: {
        current: 1,
        pageSize: 10
      },
      list: [],
      loading: true
    }
  },
  computed: {
  },
  mounted () {
    this.queryRecord()
  },
  methods: {
    queryRecord () {
      Http.get('fund/getUserNetValues', this.queryData).then((data) => {
        if (data.data.list.length < 10) {
          this.loading = true
        } else {
          this.loading = false
        }
        let list = [...this.list, ...data.data.list]
        let listTemp = []
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          let itemLast = list[i + 1] || {net_value: 1}
          item.rate = numberUtil.countDifferenceRate(item.net_value, itemLast.net_value)
          listTemp.push(item)
        }
        this.list = [...this.list, ...data.data.list]
      })
    },
    loadMore () {
      this.queryData.current++
      this.queryRecord()
    },
    qsStringify (query) {
      query.type = 'edit'
      return qs.stringify(query)
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    addHandler () {
      this.$router.push({path: '/page/myNetValueAdd', query: {type: 'add'}})
    }
  }
}
</script>
<style>
</style>
