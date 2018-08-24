/**
 * Created by xiaobxia on 2018/6/28.
 */
import numberUtil from './numberUtil'

function Util(threshold) {
  this.threshold = threshold
}

Util.prototype = {
  ifUpOpen: function (record) {
    const preClose = record.preClose
    const open = record.open
    return open >= preClose
  },
  ifUpClose: function (record) {
    return record.netChangeRatio > 0
  },
  // 盘中下跌
  ifSessionDown: function (record) {
    const threshold = this.threshold
    return numberUtil.countDifferenceRate(record.low, record.preClose) <= -threshold
  },
  // 收盘拉起
  ifSessionUpClose: function (record) {
    const threshold = this.threshold
    return numberUtil.countDifferenceRate(record.close, record.low) >= threshold
  },

  // 盘中上升
  ifSessionUp: function (record) {
    const threshold = this.threshold
    return numberUtil.countDifferenceRate(record.high, record.preClose) >= threshold
  },
  // 收盘回落
  ifSessionDownClose: function (record) {
    const threshold = this.threshold
    return numberUtil.countDifferenceRate(record.close, record.high) <= -threshold
  },
  ifHighPreCloseDown: function (record) {
    const threshold = this.threshold
    return numberUtil.countDifferenceRate(record.high, record.preClose) < -threshold
  },

  ifLowPreCloseHigh: function (record) {
    const threshold = this.threshold
    return numberUtil.countDifferenceRate(record.low, record.preClose) > threshold
  },
  //2018-08-23
  ifSellChuangye: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-0-0'
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-1-0'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-1-1'
        }
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-2-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-3-0'
        }
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-4-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-5-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-6-0'
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-7-0'
      }
    }
    return false
  },
  //2018-08-23
  ifBuyChuangye: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      return {
        flag: true,
        text: 'buy-0-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-0'
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-1'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-2'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-0'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-1'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-3-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-4-0'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-4-1'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-5-0'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-6-0'
        }
      }
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-6-1'
        }
      }
    }
    return false
  },
  //2018-08-23
  ifSellGangtie: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-0-0'
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-1-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-2-0'
        }
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-3-0'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-3-1'
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-3-2'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-4-0'
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-5-0'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-5-1'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-5-2'
        }
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-6-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-7-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-8-0'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-8-1'
        }
      }
    }
    return false
  },
  //2018-08-23
  ifBuyGangtie: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record) && ifSessionUpCloseOne) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'buy-0-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'buy-1-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-0'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-3-0'
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-3-1'
        }
      }
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-3-2'
        }
      }
      if (ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-3-3'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-4-0'
        }
      }
    }
    return false
  },
  //2018-08-03
  ifSellJungong: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    return false
  },
  //2018-08-03
  ifBuyJungong: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },
  //2018-08-24
  ifSellYiyao: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifUpOpenOne && ifUpCloseOne && ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifUpOpenOne && ifUpCloseOne && ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-0-0'
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-1-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-2-0'
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-3-0'
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-3-1'
        }
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-4-0'
        }
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-5-0'
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-6-0'
      }
    }
    return false
  },
  //2018-08-24
  ifBuyYiyao: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      return {
        flag: true,
        text: 'buy-0-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'buy-1-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-0'
        }
      }
      if (!ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-1'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-3'
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-4'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-5'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-6'
        }
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-3-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-4-0'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-4-1'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-5-0'
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-6-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-7-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-8-0'
      }
    }
    return false
  },
  //2018-08-23
  ifSellMeitan: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-0-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-1-0'
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-2-0'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-2-1'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-2-2'
        }
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-3-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-4-0'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-4-1'
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-4-2'
        }
      }
    }
    if (ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-5-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-6-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-7-0'
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-8-0'
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-9-0'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-9-1'
        }
      }
    }
    return false
  },
  //2018-08-23
  ifBuyMeitan: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'buy-0-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-1-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-0'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-1'
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-2'
        }
      }
      if (!ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-3'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-4'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'buy-3-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'buy-4-0'
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-5-0'
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-6-0'
        }
      }
    }
    return false
  },
  //2018-07-30
  ifSellYouse: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },
  //2018-07-30
  ifBuyYouse: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },
  //2018-08-24
  ifSellJisuanji: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-0-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-1-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-2-0'
        }
      }
    }
    if (ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-3-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-4-0'
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-5-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-6-0'
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-7-0'
      }
    }
    return false
  },
  //2018-08-24
  ifBuyJisuanji: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'buy-0-0'
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-0'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-0'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-3-0'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-3-1'
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-3-2'
        }
      }
      if (!ifUpOpenOne && ifUpCloseOne && ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-3-3'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-3-4'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-4-0'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-5-0'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-6-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-7-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-8-0'
      }
    }
    return false
  },
  //2018-08-24
  ifSellBaijiu: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-0-0'
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-1-0'
        }
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-2-0'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-3-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-4-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-5-0'
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-6-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-7-0'
        }
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-8-0'
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'buy-9-0'
      }
    }
    return false
  },
  //2018-08-24
  ifBuyBaijiu: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-0-0'
        }
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-0-1'
        }
      }
      if (ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-0-2'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-0-3'
        }
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-0-4'
        }
      }
      if (ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-0-5'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-0'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-1'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'buy-2-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-3-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-4-0'
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-4-1'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-5-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-6-0'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-7-0'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-8-0'
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-9-0'
      }
    }
    return false
  },
  //2018-07-27
  ifSellXinxi: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },
  //2018-07-27
  ifBuyXinxi: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifUpOpenOne && ifUpCloseOne && ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        if (ifUpOpenOne && !ifUpCloseOne) {
          return true
        }
      }
      if (!ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },
  //2018-08-24
  ifSellXiaofei: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-0-0'
        }
      }
      if (!ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-0-1'
        }
      }
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-0-2'
        }
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-0-3'
        }
      }
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-0-4'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-0-5'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-0-6'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-0-7'
        }
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-1-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-2-0'
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-3-0'
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-4-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-5-0'
        }
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-6-0'
      }
    }
    return false
  },
  //2018-08-24
  ifBuyXiaofei: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'buy-0-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-0'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-1'
        }
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-2'
        }
      }
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-3'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-0'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-1'
        }
      }
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-2'
        }
      }
      if (ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-3'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-4'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-3-0'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-4-0'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-5-0'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-6-0'
        }
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-6-1'
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-6-2'
        }
      }
    }
    return false
  },
  //2018-07-29
  ifSellBaoxian: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-0-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-1-0'
        }
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-2-0'
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-3-0'
        }
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-4-0'
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-5-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-6-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-7-0'
        }
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-8-0'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-8-1'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-9-0'
      }
    }
    return false
  },
  //2018-07-29
  ifBuyBaoxian: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      return {
        flag: true,
        text: 'buy-0-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'buy-1-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-0'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-3-0'
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'buy-4-0'
      }
    }
    return false
  },
  //2018-08-23
  ifSellWulin: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionUpOne && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-0-0'
        }
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-1-0'
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-2-0'
        }
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-3-0'
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-4-0'
      }
    }
    if (ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-5-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-6-1'
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-6-2'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-7-0'
        }
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-8-0'
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'sell-8-1'
        }
      }
    }
    return false
  },
  //2018-08-23
  ifBuyWulin: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-0-0'
        }
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-0-1'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-0'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-1'
        }
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-2'
        }
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-3'
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-4'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-5'
        }
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-2-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'buy-3-0'
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-4-0'
        }
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-4-1'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-5-0'
        }
      }
    }
    return false
  },
  //2018-07-30
  ifSellChuanmei: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    return false
  },
  //2018-07-30
  ifBuyChuanmei: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },
  //2018-08-22
  ifSellDianzi: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-0-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-1-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-2-0'
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-3-0'
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-4-0'
      }
    }
    if (ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return {
        flag: true,
        text: 'sell-5-0'
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-6-0'
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'sell-7-0'
      }
    }
    return false
  },
  //2018-08-22
  ifBuyDianzi: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      return {
        flag: true,
        text: 'buy-0-0'
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-0'
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-1'
        }
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-2'
        }
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-3'
        }
      }
      if (!ifUpOpenOne && ifUpCloseOne && ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-1-4'
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return {
          flag: true,
          text: 'buy-2-0'
        }
      }
    }
    if (ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-3-0'
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return {
        flag: true,
        text: 'buy-4-0'
      }
    }
    return false
  },
  //2018-08-07
  ifSellYiliao: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionUpOne && !ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },
  //2018-08-07
  ifBuyYiliao: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },
  //2018-08-06
  ifSellShengwu: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    return false
  },
  //2018-08-06
  ifBuyShengwu: function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record)
    const ifUpClose = this.ifUpClose(record)
    const ifSessionDown = this.ifSessionDown(record)
    const ifSessionUpClose = this.ifSessionUpClose(record)
    const ifSessionUp = this.ifSessionUp(record)
    const ifSessionDownClose = this.ifSessionDownClose(record)
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord)
    const ifUpCloseOne = this.ifUpClose(oneDayRecord)
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord)
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord)
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord)
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord)
    if (this.ifHighPreCloseDown(record)) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  }
}

const codeMap = {
  //2018-08-23
  'chuangye': {
    code: 'sz399006',
    name: '创业',
    threshold: 0.91
  },
  //2018-08-23
  'gangtie': {
    code: 'sz399440',
    name: '钢铁',
    threshold: 0.88
  },
  'jungong': {
    code: 'sz399959',
    name: '军工',
    threshold: 1.12
  },
  //2018-08-24
  'yiyao': {
    code: 'sh000037',
    name: '医药',
    threshold: 0.85
  },
  //2018-08-23
  'meitan': {
    code: 'sz399998',
    name: '煤炭',
    threshold: 0.92
  },
  'youse': {
    code: 'sh000823',
    name: '有色',
    threshold: 1.02
  },
  //2018-08-24
  'jisuanji': {
    code: 'sz399363',
    name: '计算机',
    threshold: 0.98
  },
  //2018-08-24
  'baijiu': {
    code: 'sz399997',
    name: '白酒',
    threshold: 1.24
  },
  'xinxi': {
    code: 'sh000993',
    name: '信息',
    threshold: 1.13
  },
  //2018-08-24
  'xiaofei': {
    code: 'sh000990',
    name: '消费',
    threshold: 0.95
  },
  'baoxian': {
    code: 'sz399809',
    name: '保险',
    threshold: 1.03
  },
  //2018-08-23
  'wulin': {
    code: 'sh000016',
    name: '50',
    threshold: 0.7
  },
  'chuanmei': {
    code: 'sz399971',
    name: '传媒',
    threshold: 0.86
  },
  //2018-08-22
  'dianzi': {
    code: 'sz399811',
    name: '电子',
    threshold: 0.98
  },
  'yiliao': {
    code: 'sz399989',
    name: '医疗',
    threshold: 1.13
  },
  'shengwu': {
    code: 'sz399441',
    name: '生物',
    threshold: 1.05
  }
}
const fnMap = {
  chuangyeBuy: 'ifBuyChuangye',
  chuangyeSell: 'ifSellChuangye',
  gangtieBuy: 'ifBuyGangtie',
  gangtieSell: 'ifSellGangtie',
  jungongBuy: 'ifBuyJungong',
  jungongSell: 'ifSellJungong',
  yiyaoBuy: 'ifBuyYiyao',
  yiyaoSell: 'ifSellYiyao',
  meitanBuy: 'ifBuyMeitan',
  meitanSell: 'ifSellMeitan',
  youseBuy: 'ifBuyYouse',
  youseSell: 'ifSellYouse',
  jisuanjiBuy: 'ifBuyJisuanji',
  jisuanjiSell: 'ifSellJisuanji',
  baijiuBuy: 'ifBuyBaijiu',
  baijiuSell: 'ifSellBaijiu',
  xinxiBuy: 'ifBuyXinxi',
  xinxiSell: 'ifSellXinxi',
  xiaofeiBuy: 'ifBuyXiaofei',
  xiaofeiSell: 'ifSellXiaofei',
  baoxianBuy: 'ifBuyBaoxian',
  baoxianSell: 'ifSellBaoxian',
  wulinBuy: 'ifBuyWulin',
  wulinSell: 'ifSellWulin',
  chuanmeiBuy: 'ifBuyChuanmei',
  chuanmeiSell: 'ifSellChuanmei',
  dianziBuy: 'ifBuyDianzi',
  dianziSell: 'ifSellDianzi',
  yiliaoBuy: 'ifBuyYiliao',
  yiliaoSell: 'ifSellYiliao',
  shengwuBuy: 'ifBuyShengwu',
  shengwuSell: 'ifSellShengwu'
}

const IndexInfoUtil = {
  Util,
  codeMap,
  fnMap,
  formatData: function (list) {
    let listTemp = []
    for (let i = 0; i < list.length; i++) {
      listTemp.push({
        date: '' + list[i].date,
        ...list[i].kline
      })
    }
    let xData = []
    for (let j = 0; j < 7; j = j + 0.1) {
      xData.push({
        number: j.toFixed(1),
        count: 0,
        countList: [],
        count2: 0,
        countList2: []
      });
    }
    list.forEach((item, index) => {
      let value = Math.abs(numberUtil.countDifferenceRate(item.kline.close, item.kline.preClose));
      let value2 = Math.abs(numberUtil.countDifferenceRate(item.kline.high, item.kline.low));
      for (let i = 0; i < xData.length; i++) {
        if (value >= xData[i].number && xData[i + 1] && value < xData[i + 1].number) {
          xData[i].count++
          xData[i].countList.push(value)
          break
        }
      }
      for (let j = 0; j < xData.length; j++) {
        if (value2 >= xData[j].number && xData[j + 1] && value2 < xData[j + 1].number) {
          xData[j].count2++
          xData[j].countList2.push(value2)
          break
        }
      }
    });
    let all = 0
    let count = 0
    let all2 = 0
    let count2 = 0
    for (let k = 0; k < xData.length; k++) {
      if (xData[k].count >= 5) {
        count = count + xData[k].count;
        for (let c = 0; c < xData[k].countList.length; c++) {
          all = all + xData[k].countList[c]
        }
      }
      if (xData[k].count2 >= 5) {
        count2 = count2 + xData[k].count2;
        for (let b = 0; b < xData[k].countList2.length; b++) {
          all2 = all2 + xData[k].countList2[b]
        }
      }
    }
    xData.sort((a, b) => {
      return b.count2 - a.count2
    })
    console.log(xData)
    let a = (all2 / count2) / 2
    let c = all / count
    let threshold = numberUtil.keepTwoDecimals((a + c) / 2)
    console.log(count)
    console.log(count2)
    console.log(a)
    console.log(c)
    console.log(threshold)
    return {list: listTemp, threshold: threshold}
  }
}

export default IndexInfoUtil
