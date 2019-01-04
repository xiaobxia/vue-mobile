<template>
  <div>
    <mt-header title="数据配置" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body has-bar">
      <mt-radio
        align="right"
        v-model="dataWay"
        :options="['中金', '东方', '腾讯']">
      </mt-radio>
      <mt-button style="margin-top: 10rem" type="primary" @click="clearHandler" class="main-btn">清除数据缓存</mt-button>
    </div>
  </div>
</template>

<script>
import Toast from '@/common/toast.js'
import storageUtil from '@/util/storageUtil.js'

export default {
  name: 'DataConfig',
  data () {
    const dataWay = storageUtil.getAppConfig('dataWay') || '东方'
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
    },
    clearHandler () {
      for (let key in localStorage) {
        if (key.startsWith('webData')) {
          localStorage.removeItem(key)
        }
      }
      Toast.success('操作成功')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
