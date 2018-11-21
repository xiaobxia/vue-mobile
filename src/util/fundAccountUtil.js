/**
 * Created by xiaobxia on 2018/5/30.
 */
const minHasDay = 5

const fundAccountUtil = {
  myShares: 200000,
  minHasDay,
  // 解除
  ifRelieve: function (item) {
    if (!item.has_days) {
      return true
    }
    if (item.has_days > minHasDay) {
      return true
    } else if (item.has_days === minHasDay) {
      const d = new Date()
      const n = d.getDay()
      return n !== 5
    }
    return false
  }
}

export default fundAccountUtil
