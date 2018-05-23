<template>
  <div class="my-fund-add">
    <mt-header :title="type==='add'?'添加':'编辑'" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
      <mt-button slot="right" v-if="type==='edit'">
        <i class="far fa-trash-alt" @click="deleteHandler"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-field label="代码" placeholder="请输入代码" v-model="form.code"></mt-field>
      <mt-field label="策略组" placeholder="请输入策略组" v-model="form.strategy"></mt-field>
      <mt-field label="持仓成本" placeholder="请输入持仓成本" v-model="form.cost"></mt-field>
      <mt-field label="金额" placeholder="请输入金额" v-if="type === 'add'" v-model="form.asset"></mt-field>
      <mt-field label="份额" placeholder="请输入份额" v-if="type === 'edit'" v-model="form.shares"></mt-field>
      <mt-field label="购买日期" placeholder="请输入购买日期" v-model="form.buy_date"></mt-field>
      <mt-field label="目标点位" placeholder="请输入目标点位" v-model="form.target_net_value"></mt-field>
      <mt-field label="止损点位" placeholder="请输入止损点位" v-model="form.stop_net_value"></mt-field>
      <template v-if="type==='edit'">
        <mt-cell title="加仓">
          <mt-switch v-model="ifAdd"></mt-switch>
        </mt-cell>
        <template v-if="ifAdd">
          <mt-field label="新成本" placeholder="" v-model="addForm.newNetValue"></mt-field>
          <mt-field label="新金额" placeholder="" v-model="addForm.newAsset"></mt-field>
        </template>
      </template>
    </div>
    <div class="bottom-bar">
      <mt-button type="primary" @click="okHandler" class="main-btn">完成</mt-button>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import {Toast, MessageBox} from 'mint-ui'
import numberUtil from '@/util/numberUtil.js'
import moment from 'moment'
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
  watch: {
    'form.cost' (val) {
      val = val || 0
      this.form.target_net_value = numberUtil.keepFourDecimals(parseFloat(val) * (1 + 0.07))
      this.form.stop_net_value = numberUtil.keepFourDecimals(parseFloat(val) * (1 - 0.02))
    }
  },
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
      query.cost = query.cost || 0
      this.form = Object.assign({
        target_net_value: numberUtil.keepFourDecimals(parseFloat(query.cost) * (1 + 0.07)),
        stop_net_value: numberUtil.keepFourDecimals(parseFloat(query.cost) * (1 - 0.02)),
        buy_date: moment().subtract(1, 'days').format('YYYY-MM-DD')
      }, query)
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
                iconClass: 'icon far fa-check-circle',
                className: 'success'
              })
              this.$router.history.go(-1)
            } else {
              Toast({
                message: '操作失败',
                iconClass: 'icon far fa-frown',
                className: 'error'
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
      if (this.type === 'add') {
        this.form.shares = numberUtil.keepTwoDecimals(this.form.asset / this.form.cost)
      }
      Http.post(this.type === 'add' ? 'fund/addUserFund' : 'fund/updateUserFund', this.form).then((data) => {
        if (data.success) {
          Toast({
            message: '操作成功',
            iconClass: 'icon far fa-check-circle',
            className: 'success'
          })
          this.$router.history.go(-1)
        } else {
          Toast({
            message: '操作失败',
            iconClass: 'icon far fa-frown',
            className: 'error'
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
