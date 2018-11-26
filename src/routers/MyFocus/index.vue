<template>
  <div class="my-focus">
    <mt-header title="我的关注" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div v-if="list.length>0" class="fund-list simple">
        <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/fundDetail?code='+item.code+'&focus=true'">
          <div slot="title">
            <h3 :class="{lowRate: item.lowRate}">{{item.code}} {{formatName(item.name)}} <span style="float: right"
                                                              :class="numberClass(item.rate)">{{item.rate}}%</span></h3>
          </div>
        </mt-cell-swipe>
      </div>
      <div v-else class="no-record">
        <i class="fab fa-optin-monster"></i>
        <p>没有关注记录</p>
      </div>
    </div>
  </div>
</template>
<script>
import Http from '@/util/httpUtil.js'

export default{
  name: 'MyFocus',
  data () {
    return {
      list: []
    }
  },
  computed: {
  },
  mounted () {
    this.queryRecord()
  },
  methods: {
    queryRecord () {
      Http.get('fund/getFocusFunds').then((data) => {
        let list = data.data.list
        let temp = []
        for (let i = 0; i < list.length; i++) {
          temp.push({
            ...list[i].fund
          })
        }
        this.list = temp
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
    }
  }
}
</script>
<style>
</style>
