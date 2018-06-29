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
    console.log(this.threshold)
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

  ifSellShangzheng: function (record, oneDayRecord) {
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
    if (ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose && !ifSessionDownCloseOne) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionUpOne && !ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionUpCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

  ifBuyShangzheng: function (record, oneDayRecord) {
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
    if (this.ifHighPreCloseDown(record) && ifSessionDownCloseOne) {
      return true
    }
    if (!ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifUpOpenOne && !ifSessionUpOne && !ifSessionUpCloseOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!(ifUpOpenOne && !ifUpCloseOne)) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!(ifUpOpenOne && !ifUpCloseOne)) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownCloseOne && !ifSessionUpOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifUpOpenOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

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
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionUpOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

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
    if (this.ifHighPreCloseDown(record) && ifSessionUpCloseOne) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifUpOpenOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!(ifUpOpenOne && !ifUpCloseOne)) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifUpOpenOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

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
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifUpOpenOne && ifSessionUpCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne) {
        if (!(!ifUpOpenOne && ifUpCloseOne)) {
          return true
        }
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifUpOpenOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne) {
        return true
      }
    }
    return false
  },

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
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownCloseOne && !ifSessionUpOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionUpOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        if (ifUpOpenOne && !ifUpCloseOne) {
          return true
        }
      }
    }
    return false
  },

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
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne) {
        if (!(!ifUpOpenOne && ifUpCloseOne)) {
          return true
        }
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifUpOpenOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifUpCloseOne) {
        return true
      }
    }
    return false
  },

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
      if (ifSessionDownCloseOne && !ifSessionUpOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownCloseOne && !ifSessionUpCloseOne) {
        return true
      }
    }
    return false
  },

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
      if (ifUpCloseOne && !ifSessionDownOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionUpCloseOne) {
        return true
      }
    }
    return false
  },
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
    if (this.ifHighPreCloseDown(record) && ifSessionUpCloseOne) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownCloseOne && !ifSessionUpOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionUpOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionUpOne && !ifSessionUpCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    return false
  },

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
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionDownCloseOne && !ifSessionUpOne) {
        return true
      }
    }
    return false
  },

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
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionUpOne && ifSessionDownCloseOne) {
        if (!(ifSessionDownOne && !ifSessionUpCloseOne)) {
          return true
        }
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

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
      if (!ifUpOpenOne && ifSessionUpCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionUpCloseOne && ifSessionUpOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    return false
  },

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
      if (ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionUpOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    return false
  },
  ifSellDichan: function (record, oneDayRecord) {
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
      if (ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifUpCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionUpCloseOne && ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

  ifBuyDichan: function (record, oneDayRecord) {
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
    if (this.ifHighPreCloseDown(record) && ifSessionUpCloseOne && ifSessionDownCloseOne) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!(!ifSessionUpCloseOne && !ifSessionUpOne)) {
        return true
      }
    }
    return false
  },

  ifSellJisuanji: function (record, oneDayRecord) {
    console.log(this)
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
      if (!ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifUpOpenOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

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
    if (this.ifHighPreCloseDown(record) && ifSessionUpCloseOne) {
      return true
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

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
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

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
    if (this.ifHighPreCloseDown(record)) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifUpOpenOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

  ifSellHuanbao: function (record, oneDayRecord) {
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
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
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
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifUpOpenOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

  ifBuyHuanbao: function (record, oneDayRecord) {
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
      if (!ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifUpOpenOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

  ifSellNengyuan: function (record, oneDayRecord) {
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
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifUpOpenOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
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
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

  ifBuyNengyuan: function (record, oneDayRecord) {
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
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        if (ifUpOpenOne) {
          return true
        }
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        if (ifUpOpenOne) {
          return true
        }
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return true
    }
    return false
  },

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
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

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
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    return false
  },

  ifSellZhengquan: function (record, oneDayRecord) {
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
      if (ifSessionUpCloseOne && ifSessionUpOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },
  ifBuyZhengquan: function (record, oneDayRecord) {
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
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

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
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownCloseOne) {
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
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

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
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },
  ifSellBaoxianfunction : function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record);
    const ifUpClose = this.ifUpClose(record);
    const ifSessionDown = this.ifSessionDown(record);
    const ifSessionUpClose = this.ifSessionUpClose(record);
    const ifSessionUp = this.ifSessionUp(record);
    const ifSessionDownClose = this.ifSessionDownClose(record);
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord);
    const ifUpCloseOne = this.ifUpClose(oneDayRecord);
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord);
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord);
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord);
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord);
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true;
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true;
      }
      if (ifUpOpenOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true;
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true;
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true;
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true;
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true;
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true;
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true;
      }
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true;
      }
      if (!ifUpOpenOne && ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true;
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true;
      }
    }
    return false
  },

  ifBuyBaoxian : function (record, oneDayRecord) {
    const ifUpOpen = this.ifUpOpen(record);
    const ifUpClose = this.ifUpClose(record);
    const ifSessionDown = this.ifSessionDown(record);
    const ifSessionUpClose = this.ifSessionUpClose(record);
    const ifSessionUp = this.ifSessionUp(record);
    const ifSessionDownClose = this.ifSessionDownClose(record);
    const ifUpOpenOne = this.ifUpOpen(oneDayRecord);
    const ifUpCloseOne = this.ifUpClose(oneDayRecord);
    const ifSessionDownOne = this.ifSessionDown(oneDayRecord);
    const ifSessionUpCloseOne = this.ifSessionUpClose(oneDayRecord);
    const ifSessionUpOne = this.ifSessionUp(oneDayRecord);
    const ifSessionDownCloseOne = this.ifSessionDownClose(oneDayRecord);
    if (this.ifHighPreCloseDown(record)) {
      return true;
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true;
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true;
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true;
      }
      if (ifUpCloseOne && ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true;
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true;
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true;
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true;
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true;
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true;
      }
    }
    return false
  }
}

const codeMap = {
  'shangzheng': {
    code: 'sh000001',
    name: '上证'
  },
  'chuangye': {
    code: 'sz399006',
    name: '创业'
  },
  'gangtie': {
    code: 'sz399440',
    name: '钢铁'
  },
  'jungong': {
    code: 'sz399959',
    name: '军工'
  },
  'yiyao': {
    code: 'sh000037',
    name: '医药'
  },
  'meitan': {
    code: 'sz399998',
    name: '煤炭'
  },
  'youse': {
    code: 'sh000823',
    name: '有色'
  },
  'dichan': {
    code: 'sz399393',
    name: '地产'
  },
  'jisuanji': {
    code: 'sz399363',
    name: '计算机'
  },
  'baijiu': {
    code: 'sz399997',
    name: '白酒'
  },
  'huanbao': {
    code: 'sh000827',
    name: '环保'
  },
  'nengyuan': {
    code: 'sh000986',
    name: '能源'
  },
  'xinxi': {
    code: 'sh000993',
    name: '信息'
  },
  'zhengquan': {
    code: 'sz399975',
    name: '证券'
  },
  'xiaofei': {
    code: 'sh000990',
    name: '消费'
  },
  'baoxian': {
    code: 'sz399809',
    name: '保险'
  }
}
const fnMap = {
  shangzhengBuy: 'ifBuyShangzheng',
  shangzhengSell: 'ifSellShangzheng',
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
  dichanBuy: 'ifBuyDichan',
  dichanSell: 'ifSellDichan',
  jisuanjiBuy: 'ifBuyJisuanji',
  jisuanjiSell: 'ifSellJisuanji',
  baijiuBuy: 'ifBuyBaijiu',
  baijiuSell: 'ifSellBaijiu',
  huanbaoBuy: 'ifBuyHuanbao',
  huanbaoSell: 'ifSellHuanbao',
  nengyuanBuy: 'ifBuyNengyuan',
  nengyuanSell: 'ifSellNengyuan',
  xinxiBuy: 'ifBuyXinxi',
  xinxiSell: 'ifSellXinxi',
  zhengquanBuy: 'ifBuyZhengquan',
  zhengquanSell: 'ifSellZhengquan',
  xiaofeiBuy: 'ifBuyXiaofei',
  xiaofeiSell: 'ifSellXiaofei',
  baoxianBuy: 'ifBuyBaoxian',
  baoxianSell: 'ifSellBaoxian'
}

const IndexInfoUtil = {
  Util,
  codeMap,
  fnMap,
  formatData: function (list) {
    let listTemp = []
    let allRate = 0
    let allRate3 = 0
    for (let i = 0; i < list.length; i++) {
      allRate += numberUtil.countDifferenceRate(list[i].kline.high, list[i].kline.low)
      allRate3 += Math.abs(numberUtil.countDifferenceRate(list[i].kline.close, list[i].kline.open))
      listTemp.push({
        date: '' + list[i].date,
        ...list[i].kline
      })
    }
    let a = (allRate / 2) / list.length
    let c = (allRate3) / list.length
    let threshold = numberUtil.keepTwoDecimals((a + c) / 2)
    console.log(threshold)
    return {list: listTemp, threshold: threshold}
  }
}

export default IndexInfoUtil
