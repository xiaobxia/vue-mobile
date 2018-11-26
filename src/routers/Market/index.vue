<template>
  <div class="page-market">
    <mt-header title="行情" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">排行</mt-tab-item>
      <mt-tab-item id="2">分析</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-cell-swipe>
            <div slot="title">
              <h3>费率</h3>
              <p class="explain">{{ifLowRate?'低':'正常'}}</p>
            </div>
            <div class="right-wrap">
              <mt-switch v-model="ifLowRate" @change="lowRateChangeHandler()"></mt-switch>
            </div>
          </mt-cell-swipe>
          <mt-cell-swipe>
            <div slot="title">
              <h3>排序</h3>
              <p class="explain">{{ifUp?'涨幅':'跌幅'}}</p>
            </div>
            <div class="right-wrap">
              <mt-switch v-model="ifUp" @change="stateChangeHandler()"></mt-switch>
            </div>
          </mt-cell-swipe>
          <div class="tag-info">
            <span class="sell-info"><i></i>不可售</span>
            <span class="theme-info"><i></i>无主题</span>
          </div>
          <ul
            class="simple"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/fundDetail?code='+item.code" :class="item.has?'has-back':''">
              <div slot="title">
                <h3 :class="{lowRate: item.lowRate}">
                  {{item.code}} {{formatName(item.name)}}
                  <i class="sell-tag" v-if="!item.sell"></i>
                  <i class="theme-tag" v-if="!item.theme"></i>
                  <span style="float: right" :class="numberClass(item.rate)">{{item.rate}}%</span>
                </h3>
              </div>
            </mt-cell-swipe>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="2" class="simple">
          <div class="chart-wrap">
            <chart v-if="selected==='2'"/>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
import Http from '@/util/httpUtil.js'
import storageUtil from '@/util/storageUtil.js'
import Chart from './chart.vue'

export default{
  name: 'Market',
  data () {
    const sort = storageUtil.getAppConfig('marketSort') || 'up'
    const lowRate = storageUtil.getAppConfig('marketLowRate') || 'false'
    const selected = storageUtil.getAppConfig('marketSelected') || '1'
    return {
      queryData: {
        current: 1,
        pageSize: 20,
        sort: sort,
        lowRate: lowRate === 'true' ? 1 : 0
      },
      selected: selected,
      list: [],
      loading: true,
      ifUp: sort === 'up',
      ifLowRate: lowRate === 'true'
    }
  },
  components: {Chart},
  watch: {
    selected (val) {
      storageUtil.setAppConfig('marketSelected', val)
    }
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
      if (name.length > 11) {
        return name.substr(0, 10) + '...'
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
      this.queryData.current = 1
      this.queryData.pageSize = 20
      this.list = []
      this.loading = true
    },
    stateChangeHandler () {
      this.initModel()
      const sort = this.ifUp ? 'up' : 'down'
      this.queryData.sort = sort
      storageUtil.setAppConfig('marketSort', sort)
      this.queryRecord()
    },
    lowRateChangeHandler () {
      this.initModel()
      const lowRate = this.ifLowRate ? 1 : 0
      this.queryData.lowRate = lowRate
      storageUtil.setAppConfig('marketLowRate', this.ifLowRate ? 'true' : 'false')
      this.queryRecord()
    }
  }
}
</script>
<style>
</style>
