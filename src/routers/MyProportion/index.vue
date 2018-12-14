<template>
  <div class="page-my-proportion">
    <mt-header title="持仓占比" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="content">
        <div v-for="(item, index) in list" :key="index" class="proportion-item">
          <div class="title">{{item.name}}<span>{{item.proportion}}%</span></div>
          <mt-progress :value="item.proportion" :bar-height="barHeight"></mt-progress>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Http from '@/util/httpUtil.js'
import indexInfoUtilXiong from '@/util/indexInfoUtilXiong.js'

const codeMap = indexInfoUtilXiong.codeMap

const zoom = window.adaptive.zoom
export default{
  name: 'MyProportion',
  data () {
    let distribution = {}
    for (let key in codeMap) {
      distribution[codeMap[key].name] = 0
    }
    return {
      distribution,
      totalSum: 0,
      barHeight: 30 * zoom,
      list: []
    }
  },
  computed: {
  },
  mounted () {
    this.queryRecord()
  },
  methods: {
    queryRecord () {
      Http.get('fund/getUserFundsNormal').then((data) => {
        if (data.success) {
          const list = data.data.list
          let totalSum = 0
          for (let i = 0; i < list.length; i++) {
            const item = list[i]
            totalSum += item.costSum
            if (item.theme) {
              if (item.strategy === '1') {
                if (this.distribution[item.theme]) {
                  this.distribution[item.theme] += parseInt(item.costSum)
                } else {
                  this.distribution[item.theme] = parseInt(item.costSum)
                }
              } else {
                if (this.distribution['定投']) {
                  this.distribution['定投'] += parseInt(item.costSum)
                } else {
                  this.distribution['定投'] = parseInt(item.costSum)
                }
              }
            }
          }
          this.totalSum = totalSum
          let proportionList = []
          for (let key in codeMap) {
            if (this.distribution[codeMap[key].name]) {
              proportionList.push({
                name: codeMap[key].name,
                proportion: this.keepTwoDecimals(100 * this.distribution[codeMap[key].name] / totalSum)
              })
            } else {
              proportionList.push({
                name: codeMap[key].name,
                proportion: 0
              })
            }
          }
          proportionList.push({
            name: '定投',
            proportion: this.keepTwoDecimals(100 * this.distribution['定投'] / totalSum)
          })
          proportionList.sort((a, b) => {
            return b.proportion - a.proportion
          })
          this.list = proportionList
        }
      })
    }
  }
}
</script>
<style>
</style>
