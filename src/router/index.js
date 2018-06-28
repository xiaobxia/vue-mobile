/**
 * Created by xiaobxia on 2018/4/9.
 */
import Vue from 'vue'
import Router from 'vue-router'
const lazyLoading = (path, index = true) => () => System.import(`@/routers/${path}${index ? '/index' : ''}.vue`)

Vue.use(Router)

export default new Router({
  // hash, history
  mode: 'hash',
  linkActiveClass: 'is-active',
  // 这个功能只在 HTML5 history 模式下可用
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      name: 'HelloWorld',
      path: '/',
      component: lazyLoading('HelloWorld')
    },
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
    }
  ]
})
