// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import router from './router/index'
import App from './App'
import './style/main.scss'
import VCharts from 'v-charts'
import '../static/web-fonts-with-css/css/fontawesome-all.css'

function setAdaptive () {
  var _baseFontSize = 20
  // 和width有关
  var winWidth = 0
  var winHeight = 0
  if (window.innerWidth) {
    winWidth = window.innerWidth
  } else if ((document.body) && (document.body.clientWidth)) {
    winWidth = document.body.clientWidth
  }
  if (window.innerHeight) {
    winHeight = window.innerHeight
  } else if ((document.body) && (document.body.clientHeight)) {
    winHeight = document.body.clientHeight
  }
  // 通过深入Document内部对body进行检测，获取窗口大小
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winWidth = document.documentElement.clientWidth
    winHeight = document.documentElement.clientHeight
  }
  var _fontscale = winWidth / 375
  var ua = navigator.userAgent
  var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i)
  var UCversion = ua.match(/U3\/((\d+|\.){5,})/i)
  var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80
  var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi)
  var dpr = parseInt((window.devicePixelRatio || 1), 10)
  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1
  }
  var scale = 1 / dpr
  var metaEl = document.querySelector('meta[name="viewport"]')
  if (!metaEl) {
    metaEl = document.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    document.head.appendChild(metaEl)
  }
  metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale)
  document.documentElement.style.fontSize = (_baseFontSize / 2 * dpr * _fontscale) + 'px'
  document.documentElement.setAttribute('data-dpr', dpr)
  var fontSize = _baseFontSize / 2 * dpr * _fontscale
  window.adaptive = {
    winHeight: winHeight,
    winWidth: winWidth,
    dpr: dpr,
    fontSize: fontSize,
    baseFontSize: _baseFontSize,
    zoom: fontSize / 20
  }
}

setAdaptive()

Vue.use(MintUI)
Vue.use(VCharts)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
