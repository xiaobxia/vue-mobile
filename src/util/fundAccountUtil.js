/**
 * Created by xiaobxia on 2018/5/30.
 */
// 资产
const asset = 200000
// 标准仓金额
const standard = 5000

const minHasDay = 5

const fundAccountUtil = {
  asset,
  myShares: 200000,
  buyIn7DaysLimit: asset / 4,
  standard,
  cutRateLevelOne: 0.8,
  cutRateLevelTwo: 0.6,
  minHasDay,
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
