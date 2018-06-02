<template>
  <ve-pie :data="pieChartData" :textStyle="chartTextStyle"
          :height="chartHeight" :legend="chartLegend" :settings="chartSettings"
          :tooltip="tooltip"
  ></ve-pie>
</template>
<script>
import Http from '@/util/httpUtil.js'

const zoom = window.adaptive.zoom
export default{
  name: 'Chart',
  data () {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)',
        textStyle: {
          fontSize: 22 * zoom
        }
      },
      chartHeight: (650 / 20) + 'rem',
      chartTextStyle: {
        fontSize: 22 * zoom
      },
      chartSettings: {
        radius: 200 * zoom,
        offsetY: 350 * zoom,
        limitShowNum: 4
      },
      chartLegend: {
        itemWidth: 50 * zoom,
        itemHeight: 30 * zoom
      },
      marketInfo: {},
      distribution: {}
    }
  },
  computed: {
    pieChartData () {
      let rows = []
      for (let key in this.distribution) {
        rows.push({
          '区间': key,
          '数量': this.distribution[key]
        })
      }
      return {
        columns: ['区间', '数量'],
        rows
      }
    }
  },
  mounted () {
    this.queryRecord()
  },
  methods: {
    queryRecord () {
      Http.get('fund/getMarketInfo').then((data) => {
        this.marketInfo = data.data.info
        this.distribution = data.data.info.distribution
      })
    }
  }
}
</script>
<style>
</style>
