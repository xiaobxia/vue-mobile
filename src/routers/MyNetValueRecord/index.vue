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
            <h3>{{item.net_value_date}}</h3>
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
