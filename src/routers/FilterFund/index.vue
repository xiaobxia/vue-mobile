<template>
  <div class="page-filter-fund">
    <mt-header title="筛选基金" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="theme-wrap">
        <span class="name">{{filterTheme}}</span>
        <mt-button type="primary" @click="themeChangeHandler">改变</mt-button>
      </div>
      <mt-popup
        v-model="popupVisible"
        position="bottom">
        <ul class="theme-list">
          <li class="theme-item" v-for="(item) in filterList" :key="item.code" @click="onThemeChangeHandler(item.name)">{{item.name}}</li>
        </ul>
      </mt-popup>
      <div class="fund-list simple">
        <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/fundDetail?code='+item.code" :class="item.has?'has-back':''">
          <div slot="title">
            <h3 :class="{lowRate: item.lowRate}">{{item.code}} {{formatName(item.name)}} <span style="float: right"
                                                                                               :class="item.rate < 0 ? 'green-text' : 'red-text'">{{item.rate}}%</span></h3>
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
import indexInfoUtil from '@/util/indexInfoUtil.js'

const codeMap = indexInfoUtil.codeMap

export default{
  name: 'FilterFund',
  data () {
    let filterList = []
    for (let key in codeMap) {
      filterList.push({
        key: key,
        code: codeMap[key].code,
        name: codeMap[key].name
      })
    }
    const filterTheme = storageUtil.getAppConfig('filterTheme') || '计算机'
    return {
      popupVisible: false,
      filterTheme,
      list: [],
      filterList
    }
  },
  computed: {
  },
  mounted () {
    this.queryRecord()
  },
  methods: {
    queryRecord () {
      Http.get('fund/getFundsByTheme', {theme: this.filterTheme}).then((data) => {
        let funds = data.data.funds
        funds.sort((a, b) => {
          return b.rate - a.rate
        })
        this.list = funds
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
    themeChangeHandler () {
      this.popupVisible = true
    },
    onThemeChangeHandler (theme) {
      storageUtil.setAppConfig('filterTheme', theme)
      this.filterTheme = theme
      this.popupVisible = false
      this.queryRecord()
    }
  }
}
</script>
<style>
</style>
