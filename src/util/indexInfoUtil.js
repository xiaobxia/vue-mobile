/**
 * Created by xiaobxia on 2018/6/28.
 */
import numberUtil from './numberUtil'

function Util (threshold) {
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
      if (!ifUpOpenOne && ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return true
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
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
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
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
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
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
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
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
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
      return true
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
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
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
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
    if (this.ifHighPreCloseDown(record)) {
      if (!ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
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
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
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
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
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
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
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
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
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
    return false
  },
  //2018-07-11
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
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
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
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    return false
  },
  //2018-07-11
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
    // if (this.ifHighPreCloseDown(record)) {
    //   if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
    //     return true
    //   }
    //   if (!ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
    //     return true
    //   }
    //   if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
    //     return true
    //   }
    // }
    // if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
    //   if (!ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
    //     return true
    //   }
    // }
    // if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
    //   if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
    //     return true
    //   }
    // }
    return false
  },

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
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
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
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
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
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
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
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
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
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
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
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
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
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    return false
  },
  //2018-07-11
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
      if (ifUpOpenOne && ifUpCloseOne && !ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },
  //2018-07-11
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
    // if (this.ifHighPreCloseDown(record)) {
    //   if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
    //     return true
    //   }
    //   if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
    //     return true
    //   }
    //   if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
    //     return true
    //   }
    // }
    // if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
    //   if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
    //     return true
    //   }
    //   if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
    //     return true
    //   }
    //   if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
    //     return true
    //   }
    //   if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
    //     return true
    //   }
    //   if (!ifUpOpenOne && ifUpCloseOne && ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
    //     return true
    //   }
    //   if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
    //     return true
    //   }
    // }
    // if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
    //   if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
    //     return true
    //   }
    //   if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
    //     return true
    //   }
    // }
    return false
  },
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
      if (!ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    return false
  },

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
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return false
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    return false
  },
  ifSellYinhang: function (record, oneDayRecord) {
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
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      if (!ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return false
      }
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      if (ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

  ifBuyYinhang: function (record, oneDayRecord) {
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
        return true
      }
      if (!ifSessionDownOne && ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      //否
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        if (ifUpOpenOne && ifUpCloseOne) {
          return false
        }
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && !ifSessionDown && !ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifUpOpenOne && !ifUpCloseOne && ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },
  ifSellXinnengyuan: function (record, oneDayRecord) {
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
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (!ifSessionDownOne && !ifSessionUpCloseOne && ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (ifUpOpen && ifUpClose && !ifSessionDown && !ifSessionUpClose && ifSessionUp && !ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && !ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (!ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  },

  ifBuyXinnengyuan: function (record, oneDayRecord) {
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
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifUpOpenOne && !ifUpCloseOne && !ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && ifSessionDownCloseOne) {
        return true
      }
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && ifUpClose && ifSessionDown && ifSessionUpClose && ifSessionUp && ifSessionDownClose) {
      return true
    }
    if (!ifUpOpen && !ifUpClose && ifSessionDown && ifSessionUpClose && !ifSessionUp && !ifSessionDownClose) {
      if (ifSessionDownOne && ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
      if (ifSessionDownOne && !ifSessionUpCloseOne && !ifSessionUpOne && !ifSessionDownCloseOne) {
        return true
      }
    }
    return false
  }
}

const codeMap = {
  'chuangye': {
    code: 'sz399006',
    name: '创业',
    threshold: 0.96
  },
  'gangtie': {
    code: 'sz399440',
    name: '钢铁',
    threshold: 1.01
  },
  'jungong': {
    code: 'sz399959',
    name: '军工',
    threshold: 1.03
  },
  'yiyao': {
    code: 'sh000037',
    name: '医药',
    threshold: 0.97
  },
  'meitan': {
    code: 'sz399998',
    name: '煤炭',
    threshold: 1.13
  },
  'youse': {
    code: 'sh000823',
    name: '有色',
    threshold: 1.04
  },
  'dichan': {
    code: 'sz399393',
    name: '地产',
    threshold: 1.01
  },
  'jisuanji': {
    code: 'sz399363',
    name: '计算机',
    threshold: 1.09
  },
  'baijiu': {
    code: 'sz399997',
    name: '白酒',
    threshold: 1.43
  },
  'huanbao': {
    code: 'sh000827',
    name: '环保',
    threshold: 0.75
  },
  'nengyuan': {
    code: 'sh000986',
    name: '能源',
    threshold: 0.84
  },
  'xinxi': {
    code: 'sh000993',
    name: '信息',
    threshold: 1.09
  },
  'zhengquan': {
    code: 'sz399975',
    name: '证券',
    threshold: 0.94
  },
  'xiaofei': {
    code: 'sh000990',
    name: '消费',
    threshold: 0.93
  },
  'baoxian': {
    code: 'sz399809',
    name: '保险',
    threshold: 1.17
  },
  'wulin': {
    code: 'sh000016',
    name: '50',
    threshold: 0.73
  },
  'yinhang': {
    code: 'sz399431',
    name: '银行',
    threshold: 0.72
  },
  'xinnengyuan': {
    code: 'sz399412',
    name: '新能源',
    threshold: 0.92
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
  baoxianSell: 'ifSellBaoxian',
  wulinBuy: 'ifBuyWulin',
  wulinSell: 'ifSellWulin',
  yinhangBuy: 'ifBuyYinhang',
  yinhangSell: 'ifSellYinhang',
  xinnengyuanBuy: 'ifBuyXinnengyuan',
  xinnengyuanSell: 'ifSellXinnengyuan'
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