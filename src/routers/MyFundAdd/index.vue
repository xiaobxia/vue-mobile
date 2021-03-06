<template>
  <div class="my-fund-add">
    <mt-header :title="type==='add'?'添加':'编辑'" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
      <mt-button slot="right" v-if="type==='edit'">
        <i class="far fa-trash-alt red-text" @click="deleteHandler"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <template v-if="type === 'edit'">
        <div class="strategy-wrap">
          <span class="name">{{editType}}</span>
          <mt-button type="primary" @click="editTypeChangeHandler">改变</mt-button>
        </div>
      </template>
      <template v-if="type === 'add' || (type === 'edit' && editType === '修改')">
        <mt-field label="代码" placeholder="请输入代码" v-model="form.code"></mt-field>
        <div class="strategy-wrap">
          <span class="name">{{form.strategy === '1' ? '波段':'定投'}}</span>
          <mt-button type="primary" @click="strategyChangeHandler">改变</mt-button>
        </div>
        <mt-field label="持仓成本" placeholder="请输入持仓成本" v-model="form.cost"></mt-field>
        <mt-field label="金额" placeholder="请输入金额" v-if="type === 'add'" v-model="form.asset"></mt-field>
        <mt-field label="份额" placeholder="请输入份额" v-if="type === 'edit'" v-model="form.shares"></mt-field>
        <mt-field label="购买日期" placeholder="请输入购买日期" v-model="form.buy_date"></mt-field>
        <mt-field label="倍仓" placeholder="请输入倍仓" v-model="form.standard"></mt-field>
        <mt-field label="目标点位" placeholder="请输入目标点位" v-model="form.target_net_value"></mt-field>
        <mt-field label="止损点位" placeholder="请输入止损点位" v-model="form.stop_net_value"></mt-field>
      </template>
      <template v-if="type === 'edit' && editType === '加仓'">
        <mt-field label="加仓金额" placeholder="加仓金额" v-model="addForm.asset"></mt-field>
        <mt-field label="加仓日期" placeholder="加仓日期" v-model="addForm.buy_date"></mt-field>
        <p class="infoP">成本：{{this.form.newNetValue}}</p>
      </template>
      <template v-if="type === 'edit' && editType === '减仓'">
        <mt-field label="减仓份额" placeholder="减仓份额" v-model="cutForm.shares"></mt-field>
        <div class="position_record_list">
          <div v-for="(item, index) in positionRecord" :key="index + item.buy_date">
            <p>份额:{{item.shares}}，市值:{{countAsset(item.shares)}}，{{item.buy_date}}<i class="lock-tag" v-if="ifLock(item)"></i></p>
          </div>
        </div>
        <div class="sell-list">
          <p>可卖份额：{{couldSellShares}}，市值：{{couldSellAsset}}</p>
        </div>
        <div class="shares-info-list">
          <p v-for="(item) in sharesInfoList" :key="item">{{item}}<span>{{countShares(item)}} 份</span></p>
        </div>
      </template>
    </div>
    <div class="bottom-bar">
      <mt-button type="primary" @click="okHandler" class="main-btn">完成</mt-button>
    </div>
    <mt-popup
      v-model="editTypePopupVisible"
      position="bottom">
      <ul class="strategy-list">
        <li class="strategy-item" v-for="(item) in editTypeList" :key="item.code"
            @click="onEditTypeChangeHandler(item.name)">{{item.name}}
        </li>
      </ul>
    </mt-popup>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <ul class="strategy-list">
        <li class="strategy-item" v-for="(item) in strategyList" :key="item.code"
            @click="onStrategyChangeHandler(item.name)">{{item.name}}
        </li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import {MessageBox} from 'mint-ui'
import Toast from '@/common/toast.js'
import numberUtil from '@/util/numberUtil.js'
import moment from 'moment'
import fundAccountUtil from '@/util/fundAccountUtil.js'

const todayDate = new Date()
const lastTradingDay = todayDate.getDay() === 1 ? moment().subtract(3, 'days').format('YYYY-MM-DD') : moment().subtract(1, 'days').format('YYYY-MM-DD')

export default {
  name: 'MyFundAdd',
  data () {
    return {
      type: 'add',
      popupVisible: false,
      editTypePopupVisible: false,
      strategyList: [{name: '波段'}, {name: '定投'}],
      editTypeList: [{name: '修改'}, {name: '加仓'}, {name: '减仓'}],
      form: {},
      addForm: {
        asset: '',
        buy_date: ''
      },
      cutForm: {
        shares: ''
      },
      positionRecord: [],
      editType: '修改',
      lastTradingDay: lastTradingDay,
      myAsset: 10000,
      sharesInfoList: [],
      couldSellShares: 0,
      couldSellAsset: 0
    }
  },
  computed: {},
  watch: {
    'form.cost' (val) {
      val = parseFloat(val || 0)
      this.form.target_net_value = numberUtil.keepFourDecimals(val * (1 + 0.06))
      this.form.stop_net_value = numberUtil.keepFourDecimals(val * (1 - 0.02))
    }
  },
  mounted () {
    Http.get('webData/getLastTradingDay').then((res) => {
      this.lastTradingDay = res.data.lastTradingDay
      this.initPage()
    })
  },
  methods: {
    initPage () {
      this.initQuery()
      Http.get('fund/getUserLastNetValue').then((res) => {
        const nowNetValue = res.data.record
        if (nowNetValue) {
          this.myAsset = nowNetValue.asset
        }
        let myAsset = this.myAsset
        let factor = [0.6, 0.9, 1, 1.5, 2.25]
        let sharesInfoList = []
        for (let i = 0; i < factor.length; i++) {
          sharesInfoList.push(100 * Math.round(myAsset * factor[i] / 16000))
        }
        this.sharesInfoList = sharesInfoList
      })
    },
    initQuery () {
      const query = this.$router.history.current.query
      console.log(query)
      this.type = query.type || 'add'
      const cost = parseFloat(query.cost || 0)
      this.form = Object.assign({
        target_net_value: numberUtil.keepFourDecimals(cost * (1 + 0.06)),
        stop_net_value: numberUtil.keepFourDecimals(cost * (1 - 0.02)),
        buy_date: this.lastTradingDay,
        standard: 1,
        strategy: '1'
      }, query)
      if (query.type === 'edit') {
        this.addForm.buy_date = this.lastTradingDay
      }
      if (query.position_record) {
        let positionRecord = JSON.parse(query.position_record)
        let couldSellShares = 0
        let couldSellAsset = 0
        for (let i = 0; i < positionRecord.length; i++) {
          if (!this.ifLock(positionRecord[i])) {
            couldSellShares += positionRecord[i].shares
            couldSellAsset += this.countAsset(positionRecord[i].shares)
          }
        }
        this.couldSellShares = this.keepTwoDecimals(couldSellShares)
        this.couldSellAsset = this.keepTwoDecimals(couldSellAsset)
        this.positionRecord = positionRecord
      }
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
              Toast.success('操作成功')
              this.$router.history.go(-1)
            } else {
              Toast.error('操作失败')
            }
          })
        }
      })
    },
    strategyChangeHandler () {
      this.popupVisible = true
    },
    editTypeChangeHandler () {
      this.editTypePopupVisible = true
    },
    onStrategyChangeHandler (strategy) {
      const strategyMap = {
        '波段': '1',
        '定投': '2'
      }
      this.form.strategy = strategyMap[strategy]
      this.popupVisible = false
    },
    onEditTypeChangeHandler (editType) {
      this.editType = editType
      this.editTypePopupVisible = false
    },
    toast (data) {
      if (data.success) {
        Toast.success('操作成功')
        this.$router.history.go(-1)
      } else {
        Toast.error('操作失败')
      }
    },
    ifLock (item) {
      return !fundAccountUtil.ifUnLock(item)
    },
    countCost (shares, cost) {
      return numberUtil.keepTwoDecimals(shares * parseFloat(cost))
    },
    countAsset (shares) {
      return numberUtil.keepTwoDecimals(shares * parseFloat(this.form.valuation))
    },
    countShares (number) {
      return parseInt(number / parseFloat(this.form.valuation))
    },
    okHandler () {
      if (this.type === 'add') {
        this.form.shares = numberUtil.keepTwoDecimals(parseFloat(this.form.asset) / this.form.cost)
        Http.post('fund/addUserFund', this.form).then(this.toast)
      }
      if (this.type === 'edit') {
        if (this.editType === '修改') {
          Http.post('fund/updateUserFund', this.form).then(this.toast)
        } else if (this.editType === '加仓') {
          const newForm = {
            code: this.form.code,
            shares: numberUtil.keepTwoDecimals(this.addForm.asset / this.form.newNetValue),
            cost: this.form.newNetValue,
            buy_date: this.addForm.buy_date
          }
          Http.post('fund/addUserFundPosition', newForm).then(this.toast)
        } else if (this.editType === '减仓') {
          const newForm = {
            code: this.form.code,
            shares: numberUtil.keepTwoDecimals(this.cutForm.shares)
          }
          Http.post('fund/cutUserFundPosition', newForm).then(this.toast)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
