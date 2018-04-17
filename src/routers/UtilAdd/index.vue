<template>
  <div class="util-add">
    <mt-header title="加仓工具" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-field label="原成本" placeholder="" v-model="form.cost"></mt-field>
      <mt-field label="原金额" placeholder="" v-model="form.asset"></mt-field>
      <mt-field label="新成本" placeholder="" v-model="form.newNetValue"></mt-field>
      <mt-field label="新金额" placeholder="" v-model="form.newAsset"></mt-field>
      <div class="content">
        <p>成本：{{getNewCost}}</p>
        <p>份额：{{getNewShares}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import numberUtil from '@/util/numberUtil.js'
export default {
  name: 'UtilAdd',
  data () {
    return {
      form: {}
    }
  },
  computed: {
    getNewShares () {
      const asset = parseFloat(this.form.asset || 0)
      const cost = parseFloat(this.form.cost || 0)
      const newAsset = parseFloat(this.form.newAsset || 0)
      const newNetValue = parseFloat(this.form.newNetValue || 0)
      return numberUtil.keepTwoDecimals((asset / cost) + (newAsset / newNetValue))
    },
    getNewCost () {
      const asset = parseFloat(this.form.asset || 0)
      const cost = parseFloat(this.form.cost || 0)
      const newAsset = parseFloat(this.form.newAsset || 0)
      const newNetValue = parseFloat(this.form.newNetValue || 0)
      return numberUtil.keepFourDecimals((asset + newAsset) / ((asset / cost) + (newAsset / newNetValue)))
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    countValue (a, b) {
      return numberUtil.keepTwoDecimals(a - b)
    },
    countRate (a, b) {
      return numberUtil.countDifferenceRate(a, b)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
