<template>
  <div class="my-netValue-add">
    <mt-header :title="type==='add'?'添加':'编辑'" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
      <mt-button slot="right" v-if="type==='edit'">
        <i class="far fa-trash-alt" @click="deleteHandler"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
    <mt-field label="资产" placeholder="请输入资产" v-model="form.asset"></mt-field>
    <mt-field label="份额" placeholder="请输入份额" v-model="form.shares"></mt-field>
    <mt-field label="净值日期" placeholder="请输入净值日期" v-model="form.net_value_date"></mt-field>
    </div>
    <div class="bottom-bar">
      <mt-button type="primary" @click="okHandler" class="main-btn">完成</mt-button>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import { Toast, MessageBox } from 'mint-ui'
import moment from 'moment'
export default {
  name: 'MyNetValueAdd',
  data () {
    return {
      type: 'add',
      form: {}
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
      this.form = Object.assign({
        shares: 200000,
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
      Http.post(this.type === 'add' ? 'fund/addUserNetValue' : 'fund/updateUserNetValue', this.form).then((data) => {
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
