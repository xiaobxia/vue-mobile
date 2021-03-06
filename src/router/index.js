/**
 * Created by xiaobxia on 2018/4/9.
 */
import Vue from 'vue'
import Router from 'vue-router'
const lazyLoading = (path, index = true) => () => System.import(`@/routers/${path}${index ? '/index' : ''}.vue`)

Vue.use(Router)

const routers = [
  {
    name: 'Login',
    path: '/page/login',
    component: lazyLoading('Login')
  },
  {
    name: 'MyNetValueLine',
    path: '/page/myNetValueLine',
    component: lazyLoading('MyNetValueLine')
  },
  {
    name: 'MyFund',
    path: '/page/myFund',
    component: lazyLoading('MyFund')
  },
  {
    name: 'Strategy',
    path: '/page/strategy',
    component: lazyLoading('Strategy')
  },
  {
    name: 'FundDetail',
    path: '/page/fundDetail',
    component: lazyLoading('FundDetail')
  },
  {
    name: 'MyFundAdd',
    path: '/page/myFundAdd',
    component: lazyLoading('MyFundAdd')
  },
  {
    name: 'MyNetValueAdd',
    path: '/page/myNetValueAdd',
    component: lazyLoading('MyNetValueAdd')
  },
  {
    name: 'MyNetValueRecord',
    path: '/page/myNetValueRecord',
    component: lazyLoading('MyNetValueRecord')
  },
  {
    name: 'AnalyzeConfig',
    path: '/page/analyzeConfig',
    component: lazyLoading('AnalyzeConfig')
  },
  {
    name: 'Market',
    path: '/page/market',
    component: lazyLoading('Market')
  },
  {
    name: 'AverageStrategy',
    path: '/page/averageStrategy',
    component: lazyLoading('AverageStrategy')
  },
  {
    name: 'MyStrategy',
    path: '/page/myStrategy',
    component: lazyLoading('MyStrategy')
  },
  {
    name: 'Rank',
    path: '/page/rank',
    component: lazyLoading('Rank')
  },
  {
    name: 'Principle',
    path: '/page/principle',
    component: lazyLoading('Principle')
  },
  {
    name: 'Plate',
    path: '/page/plate',
    component: lazyLoading('Plate')
  },
  {
    name: 'MyFocus',
    path: '/page/myFocus',
    component: lazyLoading('MyFocus')
  },
  {
    name: 'Schedule',
    path: '/page/schedule',
    component: lazyLoading('Schedule')
  },
  {
    name: 'IndexInfo',
    path: '/page/indexInfo',
    component: lazyLoading('IndexInfo')
  },
  {
    name: 'IndexDetail',
    path: '/page/indexDetail',
    component: lazyLoading('IndexDetail')
  },
  {
    name: 'OperatingInfo',
    path: '/page/operatingInfo',
    component: lazyLoading('OperatingInfo')
  },
  {
    name: 'FilterFund',
    path: '/page/filterFund',
    component: lazyLoading('FilterFund')
  },
  {
    name: 'DataConfig',
    path: '/page/dataConfig',
    component: lazyLoading('DataConfig')
  },
  {
    name: 'IndexDetailXiong',
    path: '/page/indexDetailXiong',
    component: lazyLoading('IndexDetailXiong')
  },
  {
    name: 'OperatingInfoXiong',
    path: '/page/operatingInfoXiong',
    component: lazyLoading('OperatingInfoXiong')
  },
  {
    name: 'TodayIndex',
    path: '/page/todayIndex',
    component: lazyLoading('TodayIndex')
  },
  {
    name: 'IndexDetailJian',
    path: '/page/indexDetailJian',
    component: lazyLoading('IndexDetailJian')
  },
  {
    name: 'OperatingInfoJian',
    path: '/page/operatingInfoJian',
    component: lazyLoading('OperatingInfoJian')
  },
  {
    name: 'IndexDifference',
    path: '/page/indexDifference',
    component: lazyLoading('IndexDifference')
  },
  {
    name: 'MyAsset',
    path: '/page/myAsset',
    component: lazyLoading('MyAsset')
  },
  {
    name: 'ChangeMarket',
    path: '/page/changeMarket',
    component: lazyLoading('ChangeMarket')
  },
  {
    name: 'ChangeMarketDetail',
    path: '/page/changeMarketDetail',
    component: lazyLoading('ChangeMarketDetail')
  },
  {
    name: 'IncomeAll',
    path: '/page/incomeAll',
    component: lazyLoading('IncomeAll')
  },
  {
    name: 'PositionCount',
    path: '/page/positionCount',
    component: lazyLoading('PositionCount')
  },
  {
    name: 'MyProportion',
    path: '/page/myProportion',
    component: lazyLoading('MyProportion')
  },
  {
    name: 'GoodBad',
    path: '/page/goodBad',
    component: lazyLoading('GoodBad')
  },
  {
    name: 'FixedInvestment',
    path: '/page/fixedInvestment',
    component: lazyLoading('FixedInvestment')
  }
]

console.log('路由页面数：' + routers.length)

export default new Router({
  // hash, history
  mode: 'hash',
  linkActiveClass: 'is-active',
  // 这个功能只在 HTML5 history 模式下可用
  scrollBehavior: () => ({y: 0}),
  routes: routers
})
