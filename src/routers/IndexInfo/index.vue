<template>
  <div class="index-info">
    <mt-header title="指数分析" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/indexDetail?'+qsStringify(item)">
        <div slot="title">
          <h3>{{item.name}}</h3>
        </div>
      </mt-cell-swipe>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import Toast from '@/common/toast.js'
import indexInfoUtil from '@/util/indexInfoUtil.js'
import qs from 'qs'

const codeMap = indexInfoUtil.codeMap
export default {
  name: 'IndexInfo',
  data () {
    let list = []
    for (let key in codeMap) {
      list.push({
        key: key,
        code: codeMap[key].code,
        name: codeMap[key].name
      })
    }
    return {
      list: list
    }
  },
  computed: {},
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      //Http.post('fund/updateFundThemeByKeyword', {theme: '环境', keyword: '环境'}).then((data) => {})
    },
    qsStringify (query) {
      return qs.stringify(query)
    },
    backHandler () {
      this.$router.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
