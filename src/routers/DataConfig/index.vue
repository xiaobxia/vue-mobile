<template>
  <div>
    <mt-header title="数据配置" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body has-bar">
      <mt-radio
        v-model="dataWay"
        :options="['中金', '股市通', '东方']">
      </mt-radio>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import { Indicator } from 'mint-ui'
import storageUtil from '@/util/storageUtil.js'

export default {
  name: 'DataConfig',
  data () {
    const dataWay = storageUtil.getAppConfig('dataWay') || '中金'
    return {
      dataWay: dataWay
    }
  },
  watch: {
    dataWay (val) {
      storageUtil.setAppConfig('dataWay', val)
    }
  },
  mounted () {
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
