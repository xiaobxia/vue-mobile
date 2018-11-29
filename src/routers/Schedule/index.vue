<template>
  <div>
    <mt-header title="定时任务" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body has-bar">
      <mt-cell-swipe v-for="(item) in scheduleList" :key="item._id">
        <div slot="title">
          <h3>{{item.key}}</h3>
          <p class="explain">{{item.describe}}</p>
        </div>
        <div class="right-wrap">
          <mt-switch v-model="item.value" @change="stateChangeHandler(item.key)"></mt-switch>
        </div>
      </mt-cell-swipe>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import { Indicator } from 'mint-ui'
export default {
  name: 'Schedule',
  data () {
    return {
      scheduleList: []
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      Indicator.open({
        spinnerType: 'fading-circle'
      })
      Http.get('webData/getWebStockdaybarRate', {
        code: 'sz399006',
        start: '2018-03-13'
      }).then((data) => {
      })
      Http.get('schedule/getSchedules').then((data) => {
        Indicator.close()
        let list = data.data.list
        list.forEach((item) => {
          item.value = item.value === 'open'
        })
        this.scheduleList = list
      })
    },
    stateChangeHandler (key) {
      const item = this.scheduleList.find((item) => {
        return item.key === key
      })
      Http.post('schedule/changeScheduleStatus', {
        key: item.key,
        value: item.value ? 'open' : 'close'
      }).then((data) => {
        if (data.success) {
          this.initPage()
        }
        return data
      })
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
