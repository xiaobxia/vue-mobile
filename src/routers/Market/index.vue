<template>
  <div class="my-net-value-record">
    <mt-header title="行情" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-cell-swipe>
        <div slot="title">
          <h3>排序</h3>
          <p class="explain">{{ifUp?'涨幅':'跌幅'}}</p>
        </div>
        <div class="right-wrap">
          <mt-switch v-model="ifUp" @change="stateChangeHandler()"></mt-switch>
        </div>
      </mt-cell-swipe>
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/fundDetail?code='+item.code">
          <div slot="title">
            <h3>{{item.code}} {{formatName(item.name)}} <span style="float: right"
                                                              :class="item.rise < 0 ? 'green-text' : 'red-text'">{{item.rise}}%</span></h3>
          </div>
        </mt-cell-swipe>
      </ul>
    </div>
  </div>
</template>
<script>
import Http from '@/util/httpUtil.js'
import storageUtil from '@/util/storageUtil.js'
export default{
  name: 'Market',
  data () {
    const sort = storageUtil.getAppConfig('marketSort') || 'up'
    return {
      queryData: {
        current: 1,
        pageSize: 20,
        sort: sort
      },
      list: [],
      loading: true,
      ifUp: sort === 'up'
    }
  },
  computed: {
  },
  mounted () {
    this.queryRecord()
  },
  methods: {
    queryRecord () {
      Http.get('fund/getMarket', this.queryData).then((data) => {
        if (data.data.list.length < 20) {
          this.loading = true
        } else {
          this.loading = false
        }
        this.list = [...this.list, ...data.data.list]
      })
    },
    formatName (name) {
      if (name.length > 12) {
        return name.substr(0, 11) + '...'
      } else {
        return name
      }
    },
    loadMore () {
      this.queryData.current++
      this.queryRecord()
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    initModel () {
      this.queryData = {
        current: 1,
        pageSize: 20,
        sort: 'up'
      }
      this.list = []
      this.loading = true
    },
    stateChangeHandler () {
      this.initModel()
      const sort = this.ifUp ? 'up' : 'down'
      this.queryData.sort = sort
      storageUtil.setAppConfig('marketSort', sort)
      this.queryRecord()
    }
  }
}
</script>
<style>
</style>
