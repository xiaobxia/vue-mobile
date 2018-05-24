/**
 * Created by xiaobxia on 2018/5/24.
 */
const debounce = function (action, delay) {
  let timer = null
  return function () {
    let self = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      action.apply(self, args)
    }, delay)
  }
}
export default debounce
