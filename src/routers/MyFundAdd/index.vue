<template>
  <div class="my-fund-add">
    <mt-header :title="type==='add'?'添加':'编辑'" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
    <mt-field label="代码" placeholder="请输入代码" v-model="form.code"></mt-field>
    <mt-field label="策略组" placeholder="请输入策略组" v-model="form.strategy"></mt-field>
    <mt-field label="持仓成本" placeholder="请输入持仓成本" v-model="form.cost"></mt-field>
    <mt-field label="份额" placeholder="请输入份额" v-model="form.shares"></mt-field>
    <mt-field label="购买日期" placeholder="请输入购买日期" v-model="form.buy_date"></mt-field>
    <mt-field label="目标收益率" placeholder="请输入目标收益率" v-model="form.target_rate"></mt-field>
    <mt-button type="primary" @click="okHandler" class="main-btn">完成</mt-button>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import { Toast } from 'mint-ui'
import numberUtil from '@/util/numberUtil.js'
export default {
  name: 'MyFundAdd',
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
    okHandler () {
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
