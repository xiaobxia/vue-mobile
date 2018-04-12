<template>
  <div>
    <mt-header title="定时任务" :fixed="true"/>
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
      Http.get('schedule/getSchedules').then((data) => {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
