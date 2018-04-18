<template>
  <div class="util-add">
    <mt-header title="分析配置" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-field v-for="(item) in list" :label="keyMap[item.key]" :key="item.key" placeholder="" v-model="item.value"></mt-field>
      <mt-button type="primary" @click="okHandler" class="main-btn">完成</mt-button>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import { Toast } from 'mint-ui'
export default {
  name: 'AnalyzeConfig',
  data () {
    return {
      list: [],
      keyMap: {
        monthSlumpValue: '月跌',
        halfMonthSlumpValue: '半月跌',
        monthBoomValue: '月涨',
        halfMonthBoomValue: '半月涨'
      }
    }
  },
  computed: {},
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      Http.get('strategy/getAnalyzeValue').then((data) => {
        if (data.success) {
          this.list = data.data.list
        }
      })
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    okHandler () {
      Http.post('strategy/updateAnalyzeValue', {list: JSON.stringify(this.list)}).then((data) => {
        if (data.success) {
          if (data.success) {
            Toast({
              message: '操作成功',
              iconClass: 'icon icon-success'
            })
            this.initPage()
          } else {
            Toast({
              message: '操作失败',
              iconClass: 'icon icon-success'
            })
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
