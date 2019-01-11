/**
 * Created by xiaobxia on 2018/5/30.
 */
const minHasDay = 5

const fundAccountUtil = {
  minHasDay,
  // 是否解锁
  ifUnLock: function (item) {
    if (!item.has_days) {
      return true
    }
    if (item.has_days > minHasDay) {
      return true
    } else if (item.has_days === minHasDay) {
      const d = new Date()
      const n = d.getDay()
      return [1, 2, 3, 4].indexOf(n) !== -1
    }
    return false
  },
  // 是否定投
  ifFixedInvestment: function (item) {
    return item.strategy && item.strategy !== '1'
  },
  // 是否是阶梯仓位
  ifPosition (item) {
    if (item['position_record']) {
      if (JSON.parse(item['position_record']).length > 1) {
        return true
      }
    }
    return false
  },
  // 获取锁仓的仓位信息
  getLockInfo (item) {
    let data = {
      totalCost: 0,
      shares: 0,
      sum: 0,
      valuationSum: 0
    }
    if (item['position_record']) {
      const list = JSON.parse(item['position_record'])
      for (let i = 0; i < list.length; i++) {
        const subItem = list[i]
        // 没有解锁
        if (!this.ifUnLock(subItem)) {
          data.shares += subItem.shares
          data.sum += subItem.shares * item.netValue
          data.totalCost += subItem.shares * subItem.cost
          data.valuationSum += subItem.shares * item.valuation
        }
      }
    }
    return data
  },
  getUnLockInfo (item) {
    let data = {
      totalCost: 0,
      shares: 0,
      sum: 0,
      valuationSum: 0
    }
    if (item['position_record']) {
      const list = JSON.parse(item['position_record'])
      for (let i = 0; i < list.length; i++) {
        const subItem = list[i]
        // 没有解锁
        if (this.ifUnLock(subItem)) {
          data.shares += subItem.shares
          data.sum += subItem.shares * item.netValue
          data.totalCost += subItem.shares * subItem.cost
          data.valuationSum += subItem.shares * item.valuation
        }
      }
    }
    return data
  },
  getLastTradingDayBuy (item, day) {
    let data = {
      totalCost: 0,
      shares: 0
    }
    if (item['position_record']) {
      const list = JSON.parse(item['position_record'])
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        // 没有解锁
        if (item.buy_date === day) {
          data.shares += item.shares
          data.totalCost += item.shares * item.cost
        }
      }
    }
    return data
  }
}

export default fundAccountUtil
