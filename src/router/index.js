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
    }
  ]
})
