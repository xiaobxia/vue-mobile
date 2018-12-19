<template>
  <div class="good-bad-wrap">
    <mt-header title="利好利空" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body has-bar">
      <div v-for="(item) in list" :key="item.name">
        <div class="question">
         {{item.name}}
        </div>
        <div>
          <mt-radio
            align="right"
            v-model="item.goodBad"
            @change="stateChangeHandler(item.name)"
            :options="['利好', '无', '利空']">
          </mt-radio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import indexInfoUtilXiong from '@/util/indexInfoUtilXiong.js'
import storageUtil from '@/util/storageUtil.js'

const codeMap = indexInfoUtilXiong.codeMap
export default {
  name: 'GoodBad',
  data () {
    let list = []
    for (let key in codeMap) {
      list.push({
        name: codeMap[key].name,
        goodBad: storageUtil.getGoodBad(codeMap[key].name) || '无'
      })
    }
    return {
      list
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
    },
    stateChangeHandler (name) {
      const item = this.list.find((item) => {
        return item.name === name
      })
      setTimeout(() => {
        storageUtil.setGoodBad(item.name, item.goodBad)
      }, 100)
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
