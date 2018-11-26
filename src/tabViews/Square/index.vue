<template>
  <div class="page-search has-bar">
    <mt-search
      v-model="searchText"
      cancel-text="取消"
      placeholder="搜索">
      <div class="simple">
        <mt-cell-swipe v-for="(item) in showList" :key="item.code" :to="'/page/fundDetail?code='+item.code">
          <div slot="title">
            <h3 :class="{lowRate: item.lowRate}">{{item.code}} {{formatFundName(item.name)}} <span style="float: right"
                                                              :class="numberClass(item.rate)">{{item.rate}}%</span></h3>
          </div>
        </mt-cell-swipe>
      </div>
    </mt-search>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'

let searchTimer = null

export default {
  name: 'Square',
  data () {
    return {
      searchText: '',
      showList: []
    }
  },
  computed: {},
  watch: {
    searchText (val) {
      this.onSearch(val)
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
    },
    onSearch (searchText) {
      clearTimeout(searchTimer)
      searchTimer = setTimeout(() => {
        Http.get('fund/getFunds', {
          keyword: searchText,
          current: 1,
          pageSize: 40
        }).then((data) => {
          this.showList = data.data.list
        })
      }, 1000)
    },
    okHandler () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
