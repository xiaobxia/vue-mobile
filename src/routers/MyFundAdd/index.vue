<template>
  <div class="my-fund-add">
    <mt-header :title="type==='add'?'添加':'编辑'" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
      <mt-button slot="right" v-if="type==='edit'">
        <i class="fas fa-trash-alt" @click="deleteHandler"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
    <mt-field label="代码" placeholder="请输入代码" v-model="form.code"></mt-field>
    <mt-field label="策略组" placeholder="请输入策略组" v-model="form.strategy"></mt-field>
    <mt-field label="持仓成本" placeholder="请输入持仓成本" v-model="form.cost"></mt-field>
    <mt-field label="份额" placeholder="请输入份额" v-model="form.shares"></mt-field>
    <mt-field label="购买日期" placeholder="请输入购买日期" v-model="form.buy_date"></mt-field>
    <mt-field label="目标收益率" placeholder="请输入目标收益率" v-model="form.target_rate"></mt-field>
    <template v-if="type==='edit'">
        <mt-cell title="加仓">
          <mt-switch v-model="ifAdd"></mt-switch>
        </mt-cell>
      <template v-if="ifAdd">
        <mt-field label="新成本" placeholder="" v-model="addForm.newNetValue"></mt-field>
        <mt-field label="新金额" placeholder="" v-model="addForm.newAsset"></mt-field>
      </template>
      </template>
      <mt-button type="primary" @click="okHandler" class="main-btn">完成</mt-button>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import { Toast, MessageBox } from 'mint-ui'
import numberUtil from '@/util/numberUtil.js'
export default {
  name: 'MyFundAdd',
  data () {
    return {
      type: 'add',
      ifAdd: false,
      form: {},
      addForm: {}
    }
  },
  computed: {},
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.initQuery()
    },
    initQuery () {
      const query = this.$router.history.current.query
      this.type = query.type
      if (query.target_net_value) {
        query.target_rate = numberUtil.countDifferenceRate(parseFloat(query.target_net_value), parseFloat(query.cost))
      }
      console.log(query)
      this.form = Object.assign({}, query)
    },
    toPath (path) {
      this.$router.push(path)
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    deleteHandler () {
      MessageBox.confirm('确定执行此操作?').then(action => {
        if (action === 'confirm') {
          Http.get('fund/deleteUserFund', {code: this.form.code}).then((data) => {
            if (data.success) {
              Toast({
                message: '操作成功',
                iconClass: 'icon icon-success'
              })
              this.$router.history.go(-1)
            } else {
              Toast({
                message: '操作失败',
                iconClass: 'icon icon-success'
              })
            }
          })
        }
      })
    },
    okHandler () {
      if (this.ifAdd) {
        const shares = parseFloat(this.form.shares || 0)
        const cost = parseFloat(this.form.cost || 0)
        const newAsset = parseFloat(this.addForm.newAsset || 0)
        const newNetValue = parseFloat(this.addForm.newNetValue || 0)
        const asset = shares * cost
        const newShares = numberUtil.keepTwoDecimals(shares + (newAsset / newNetValue))
        const newCost = numberUtil.keepFourDecimals((asset + newAsset) / (newShares))
        this.form.shares = newShares
        this.form.cost = newCost
      }
      this.form.target_net_value = Math.round(10000 * ((this.form.target_rate / 100) + 1) * this.form.cost) / 10000
      Http.post(this.type === 'add' ? 'fund/addUserFund' : 'fund/updateUserFund', this.form).then((data) => {
        if (data.success) {
          Toast({
            message: '操作成功',
            iconClass: 'icon icon-success'
          })
          this.$router.history.go(-1)
        } else {
          Toast({
            message: '操作失败',
            iconClass: 'icon icon-success'
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
