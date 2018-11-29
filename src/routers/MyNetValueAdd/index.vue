<template>
  <div class="my-netValue-add">
    <mt-header :title="type==='add'?'添加':'编辑'" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
      <mt-button slot="right" v-if="type==='edit'">
        <i class="far fa-trash-alt red-text" @click="deleteHandler"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <template v-if="type==='edit'">
          <mt-field label="资产" placeholder="请输入资产" v-model="form.asset"></mt-field>
          <mt-field label="份额" placeholder="请输入份额" v-model="form.shares"></mt-field>
          <mt-field label="净值日期" placeholder="请输入净值日期" v-model="form.net_value_date"></mt-field>
      </template>
      <template v-if="type==='add'">
          <mt-field label="盈亏" placeholder="请输入盈亏" v-model="income"></mt-field>
          <mt-field label="份额" placeholder="请输入份额" v-model="form.shares"></mt-field>
          <mt-field label="净值日期" placeholder="请输入净值日期" v-model="form.net_value_date"></mt-field>
      </template>
    </div>
    <div class="bottom-bar">
      <mt-button type="primary" @click="okHandler" class="main-btn">完成</mt-button>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import {MessageBox} from 'mint-ui'
import Toast from '@/common/toast.js'
import moment from 'moment'
import storageUtil from '@/util/storageUtil.js'

export default {
  name: 'MyNetValueAdd',
  data () {
    return {
      type: 'add',
      form: {},
      myAsset: 10000,
      income: 0,
      fundShares: 0,
      selected: storageUtil.getAppConfig('netValueAddSelected') || '1'
    }
  },
  watch: {
    selected (val) {
      storageUtil.setAppConfig('netValueAddSelected', val)
    }
  },
  computed: {},
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      Http.get('fund/getUserLastNetValue').then((res) => {
        const nowNetValue = res.data.record
        this.fundShares = res.data.fundAssetInfo.fundShares
        if (nowNetValue) {
          this.myAsset = nowNetValue.asset || res.data.fundAssetInfo.fundAssetCost
        }
        this.initQuery()
      })
    },
    initQuery () {
      const query = this.$router.history.current.query
      this.type = query.type
      this.form = Object.assign({
        shares: this.fundShares,
        net_value_date: moment().format('YYYY-MM-DD')
      }, query)
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    deleteHandler () {
      MessageBox.confirm('确定执行此操作?').then(action => {
        if (action === 'confirm') {
          Http.get('fund/deleteUserNetValue', {net_value_date: this.form.net_value_date}).then((data) => {
            if (data.success) {
              Toast.success('操作成功')
              this.$router.history.go(-1)
            } else {
              Toast.error('操作失败')
            }
          })
        }
      })
    },
    okHandler () {
      if (this.type === 'add') {
        this.form.asset = this.myAsset + parseFloat(this.income)
      }
      Http.post(this.type === 'add' ? 'fund/addUserNetValue' : 'fund/updateUserNetValue', this.form).then((data) => {
        if (data.success) {
          Toast.success('操作成功')
          this.$router.history.go(-1)
        } else {
          Toast.error('操作失败')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
