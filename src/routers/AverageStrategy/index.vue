<template>
  <div class="schedule">
    <mt-header title="均线策略" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">上行</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-cell-swipe v-for="(item) in list" :key="item.code" :to="'/page/fundDetail?code='+item.code">
            <div slot="title">
              <h3>{{item.code}} {{formatName(item.name)}} <span style="float: right"
                                                                :class="item.valuationRate < 0 ? 'green-text' : 'red-text'">{{item.valuationRate}}%</span></h3>
            </div>
          </mt-cell-swipe>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import numberUtil from '@/util/numberUtil.js'
import StrategyList from '@/components/StrategyList.vue'
import storageUtil from '@/util/storageUtil.js'
export default {
  name: 'AverageStrategy',
  data () {
    const selected = storageUtil.getAppConfig('averageStrategySelected') || '1'
    return {
      list: [],
      selected: selected
    }
  },
  components: {StrategyList},
  computed: {},
  watch: {
    selected (val) {
      storageUtil.setAppConfig('averageStrategySelected', val)
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      Http.get('strategy/getAverageStrategy').then((data) => {
        this.list = data.data.result
      })
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    formatName (name) {
      if (name.length > 12) {
        return name.substr(0, 11) + '...'
      } else {
        return name
      }
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
