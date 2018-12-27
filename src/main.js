// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import router from './router/index'
import App from './App'
import './style/main.scss'
import VCharts from 'v-charts'
import '../static/web-fonts-with-css/css/fontawesome-all.css'
import numberUtil from '@/util/numberUtil.js'
import fundAccountUtil from '@/util/fundAccountUtil.js'
// import VConsole from 'vconsole/dist/vconsole.min.js'
// let vConsole = new VConsole()
// localStorage.clear()
function setAdaptive () {
  let _baseFontSize = 20
  // 和width有关
  let winWidth = 0
  let winHeight = 0
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
  let _fontscale = winWidth / 375
  let ua = navigator.userAgent
  let matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i)
  let UCversion = ua.match(/U3\/((\d+|\.){5,})/i)
  let isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80
  let isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi)
  let dpr = parseInt((window.devicePixelRatio || 1), 10)
  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1
  }
  let scale = 1 / dpr
  let metaEl = document.querySelector('meta[name="viewport"]')
  if (!metaEl) {
    metaEl = document.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    document.head.appendChild(metaEl)
  }
  // metaEl.setAttribute('content', 'width=device-width,initial-scale=1.0')
  metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale)
  document.documentElement.style.fontSize = (_baseFontSize / 2 * dpr * _fontscale) + 'px'
  document.documentElement.setAttribute('data-dpr', dpr)
  let fontSize = _baseFontSize / 2 * dpr * _fontscale
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

Vue.prototype.numberClass = function (number) {
  if (!number) {
    return ''
  }
  return number < 0 ? 'green-text' : 'red-text'
}

Vue.prototype.formatFundName = function (name, len) {
  len = len || 12
  if (name.length > len) {
    const lastChart = name.substr(name.length - 1)
    console.log(lastChart)
    if (lastChart === 'A' || lastChart === 'C') {
      return name.substr(0, (len - 2)) + '...' + lastChart
    }
    return name.substr(0, (len - 1)) + '...'
  } else {
    return name
  }
}

Vue.prototype.countDifferenceRate = function (numerator, denominator) {
  return numberUtil.countDifferenceRate(numerator, denominator)
}

Vue.prototype.countDifferenceRate = function (numerator, denominator) {
  return numberUtil.countDifferenceRate(numerator, denominator)
}

Vue.prototype.keepTwoDecimals = function (number) {
  return numberUtil.keepTwoDecimals(number)
}

Vue.prototype.ifLock = function (item) {
  if (fundAccountUtil.ifFixedInvestment(item)) {
    return false
  }
  return !fundAccountUtil.ifUnLock(item)
}
Vue.prototype.ifPosition = function (item) {
  if (fundAccountUtil.ifFixedInvestment(item)) {
    return false
  }
  return fundAccountUtil.ifPosition(item)
}
Vue.prototype.ifFixedInvestment = function (item) {
  return fundAccountUtil.ifFixedInvestment(item)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
