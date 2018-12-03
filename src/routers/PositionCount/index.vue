<template>
  <div class="my-fund-add">
    <mt-header title="编辑" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-field label="期望仓位" placeholder="请输入" v-model="position"></mt-field>
      <div class="content">
        <p>当前仓位: {{nowPosition}}%</p>
        <p>操作: <span :class="numberClass(operate)">{{operate}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import Toast from '@/common/toast.js'
import numberUtil from '@/util/numberUtil.js'

export default {
  name: 'PositionCount',
  data () {
    return {
      position: 0,
      info: {},
      myAsset: 10000
    }
  },
  computed: {
    nowPosition () {
      if (this.info.totalSum) {
        return numberUtil.countRate(this.info.totalSum, this.myAsset)
      } else {
        return 0
      }
    },
    operate () {
      let asset = this.myAsset - (this.info.totalSum || 0) + (this.info.valuationTotalSum || 0)
      return parseInt((asset * this.position / 100) - (this.info.valuationTotalSum || 0))
    }
  },
  watch: {
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      Http.get('fund/getUserFunds').then((data) => {
        const info = data.data.info
        this.info = info
      })
      Http.get('fund/getUserLastNetValue').then((res) => {
        const record = res.data.record
        if (record.asset) {
          this.myAsset = record.asset
        }
      })
    },
    toPath (path) {
      this.$router.push(path)
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
