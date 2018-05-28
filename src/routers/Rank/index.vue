<template>
  <div class="my-net-value-record">
    <mt-header title="排行" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
      <mt-button slot="right">
        <i class="far fa-hand-point-right" @click="queryRecord"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-field label="间隔" placeholder="请输入间隔" v-model="queryData.day"></mt-field>
      <mt-cell-swipe>
        <div slot="title">
          <h3>排序</h3>
          <p class="explain">{{ifUp?'涨幅':'跌幅'}}</p>
        </div>
        <div class="right-wrap">
          <mt-switch v-model="ifUp" @change="stateChangeHandler()"></mt-switch>
        </div>
      </mt-cell-swipe>
      <div class="fund-list">
        <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/fundDetail?code='+item.code">
          <div slot="title">
            <h3>{{item.code}} {{formatName(item.name)}} <span style="float: right"
                                                              :class="item.recentRate < 0 ? 'green-text' : 'red-text'">{{item.recentRate}}%</span></h3>
          </div>
        </mt-cell-swipe>
      </div>
    </div>
  </div>
</template>
<script>
import Http from '@/util/httpUtil.js'
import storageUtil from '@/util/storageUtil.js'
export default{
  name: 'Rank',
  data () {
    const rankDay = storageUtil.getAppConfig('rankDay') || 5
    const sort = storageUtil.getAppConfig('rankSort') || 'up'
    return {
      queryData: {
        day: rankDay
      },
      list: [],
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
      this.queryData.day = this.queryData.day || 1
      storageUtil.setAppConfig('rankDay', this.queryData.day)
      Http.get('fund/getRank', this.queryData).then((data) => {
        let list = data.data.list
        if (this.ifUp) {
          list.sort((a, b) => {
            return b.recentRate - a.recentRate
          })
        } else {
          list.sort((a, b) => {
            return a.recentRate - b.recentRate
          })
        }
        this.list = list
      })
    },
    formatName (name) {
      if (name.length > 12) {
        return name.substr(0, 11) + '...'
      } else {
        return name
      }
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    stateChangeHandler () {
      const sort = this.ifUp ? 'up' : 'down'
      storageUtil.setAppConfig('rankSort', sort)
      if (this.ifUp) {
        this.list.sort((a, b) => {
          return b.recentRate - a.recentRate
        })
      } else {
        this.list.sort((a, b) => {
          return a.recentRate - b.recentRate
        })
      }
    }
  }
}
</script>
<style>
</style>
