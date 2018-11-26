<template>
  <div class="page-rank">
    <mt-header title="排行" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
      <mt-button slot="right"  @click="queryRecord">
        <i class="far fa-hand-point-right"></i>
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
      <div class="count-wrap">
        <span class="red-text">{{upCount}}</span>
        <span>:</span>
        <span class="green-text">{{downCount}}</span>
        <span> 幅度 </span>
        <span :class="numberClass(allRate)">{{allRate}}%</span>
      </div>
      <div class="fund-list simple">
        <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/fundDetail?code='+item.code">
          <div slot="title">
            <h3 :class="{lowRate: item.lowRate}">{{item.code}} {{formatFundName(item.name)}} <span style="float: right"
                                                              :class="numberClass(item.recentRate)">{{item.recentRate}}%</span></h3>
          </div>
        </mt-cell-swipe>
      </div>
    </div>
  </div>
</template>
<script>
import Http from '@/util/httpUtil.js'
import storageUtil from '@/util/storageUtil.js'
import { Indicator } from 'mint-ui'
import numberUtil from '@/util/numberUtil.js'

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
      ifUp: sort === 'up',
      upCount: 0,
      downCount: 0,
      allRate: 0
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
      Indicator.open({
        spinnerType: 'fading-circle'
      })
      Http.get('fund/getRank', this.queryData).then((data) => {
        Indicator.close()
        let list = data.data.list
        let up = 0
        let down = 0
        let allRate = 0
        for (let i = 0; i < list.length; i++) {
          if (list[i].recentRate > 0) {
            up++
          } else if (list[i].recentRate < 0) {
            down++
          }
          allRate += list[i].recentRate
        }
        this.upCount = up
        this.downCount = down
        this.allRate = numberUtil.keepTwoDecimals(allRate / list.length)
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
