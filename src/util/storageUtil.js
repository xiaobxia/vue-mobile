/**
 * Created by xiaobxia on 2018/5/3.
 */
const storageUtil = {
  getAppConfig: function (key) {
    let config = {}
    if (window._appConfig) {
      config = window._appConfig
    } else {
      const appConfigString = localStorage.getItem('appConfig')
      if (appConfigString) {
        config = JSON.parse(appConfigString)
      }
      window._appConfig = config
    }
    if (key) {
      return config[key]
    }
    return config
  },
  setAppConfig: function (key, value) {
    let config = this.getAppConfig()
    config[key] = value
    window._appConfig = config
    localStorage.setItem('appConfig', JSON.stringify(config))
    return config
  },
  getUserInfo: function (key) {
    let userInfo = {}
    if (window._userInfo) {
      userInfo = window._userInfo
    } else {
      const userInfoString = localStorage.getItem('userInfo')
      if (userInfoString) {
        userInfo = JSON.parse(userInfoString)
      }
      window._userInfo = userInfo
    }
    if (key) {
      return userInfo[key]
    }
    return userInfo
  },
  setUserInfo: function (key, value) {
    let userInfo = this.getUserInfo()
    userInfo[key] = value
    window._userInfo = userInfo
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    return userInfo
  },
  initUserInfo: function (info) {
    window._userInfo = info
    localStorage.setItem('userInfo', JSON.stringify(info))
    return info
  },
  getSearchHistory: function (key) {
    let searchHistory = {}
    if (window._searchHistory) {
      searchHistory = window._searchHistory
    } else {
      const searchHistoryString = localStorage.getItem('searchHistory')
      if (searchHistoryString) {
        searchHistory = JSON.parse(searchHistoryString)
      }
      window._searchHistory = searchHistory
    }
    if (key) {
      return searchHistory[key]
    }
    return searchHistory
  },
  setSearchHistory: function (key, value) {
    let searchHistory = this.getSearchHistory()
    searchHistory[key] = value
    window._searchHistory = searchHistory
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    return searchHistory
  },
  getIndexRate: function (key) {
    let config = {}
    if (window._indexRate) {
      config = window._indexRate
    } else {
      const indexRateString = localStorage.getItem('indexRate')
      if (indexRateString) {
        config = JSON.parse(indexRateString)
      }
      window._indexRate = config
    }
    if (key) {
      return config[key]
    }
    return config
  },
  setIndexRate: function (key, value) {
    let config = this.getIndexRate()
    config[key] = value
    window._indexRate = config
    localStorage.setItem('indexRate', JSON.stringify(config))
    return config
  },
  getMarketStatus: function (key) {
    let config = {}
    if (window._marketStatus) {
      config = window._marketStatus
    } else {
      const marketStatusString = localStorage.getItem('marketStatus')
      if (marketStatusString) {
        config = JSON.parse(marketStatusString)
      }
      window._marketStatus = config
    }
    if (key) {
      return config[key]
    }
    return config
  },
  setMarketStatus: function (key, value) {
    let config = this.getMarketStatus()
    config[key] = value
    window._marketStatus = config
    localStorage.setItem('marketStatus', JSON.stringify(config))
    return config
  },
  getGoodBad: function (key) {
    let config = {}
    if (window._goodBad) {
      config = window._goodBad
    } else {
      const goodBadString = localStorage.getItem('goodBad')
      if (goodBadString) {
        config = JSON.parse(goodBadString)
      }
      window._goodBad = config
    }
    if (key) {
      return config[key]
    }
    return config
  },
  setGoodBad: function (key, value) {
    let config = this.getGoodBad()
    config[key] = value
    window._goodBad = config
    localStorage.setItem('goodBad', JSON.stringify(config))
    return config
  },
  getChangeMarket: function (key) {
    let config = {}
    if (window._changeMarket) {
      config = window._changeMarket
    } else {
      const changeMarketString = localStorage.getItem('changeMarket')
      if (changeMarketString) {
        config = JSON.parse(changeMarketString)
      }
      window._changeMarket = config
    }
    if (key) {
      return config[key]
    }
    return config
  },
  setChangeMarket: function (key, value) {
    let config = this.getChangeMarket()
    config[key] = value
    window._changeMarket = config
    localStorage.setItem('changeMarket', JSON.stringify(config))
    return config
  },
  getXiong: function (key) {
    let config = {}
    if (window._xiong) {
      config = window._xiong
    } else {
      const xiongString = localStorage.getItem('xiong')
      if (xiongString) {
        config = JSON.parse(xiongString)
      }
      window._xiong = config
    }
    if (key) {
      return config[key]
    }
    return config
  },
  setXiong: function (key, value) {
    let config = this.getXiong()
    config[key] = value
    window._xiong = config
    localStorage.setItem('xiong', JSON.stringify(config))
    return config
  },
  getJian: function (key) {
    let config = {}
    if (window._jian) {
      config = window._jian
    } else {
      const jianString = localStorage.getItem('jian')
      if (jianString) {
        config = JSON.parse(jianString)
      }
      window._jian = config
    }
    if (key) {
      return config[key]
    }
    return config
  },
  setJian: function (key, value) {
    let config = this.getJian()
    config[key] = value
    window._jian = config
    localStorage.setItem('jian', JSON.stringify(config))
    return config
  },
  getJianBuySellList: function (key) {
    let config = {}
    if (window._jianBuySellList) {
      config = window._jianBuySellList
    } else {
      const jianBuySellListString = localStorage.getItem('jianBuySellList')
      if (jianBuySellListString) {
        config = JSON.parse(jianBuySellListString)
      }
      window._jianBuySellList = config
    }
    if (key) {
      return JSON.parse(config[key] || '["","","","",""]')
    }
    return config
  },
  setJianBuySellList: function (key, value) {
    let config = this.getJianBuySellList()
    config[key] = JSON.stringify(value)
    window._jianBuySellList = config
    localStorage.setItem('jianBuySellList', JSON.stringify(config))
    return config
  },
  getXiongBuySellList: function (key) {
    let config = {}
    if (window._xiongBuySellList) {
      config = window._xiongBuySellList
    } else {
      const xiongBuySellListString = localStorage.getItem('xiongBuySellList')
      if (xiongBuySellListString) {
        config = JSON.parse(xiongBuySellListString)
      }
      window._xiongBuySellList = config
    }
    if (key) {
      return JSON.parse(config[key] || '["","","","",""]')
    }
    return config
  },
  setXiongBuySellList: function (key, value) {
    let config = this.getXiongBuySellList()
    config[key] = JSON.stringify(value)
    window._xiongBuySellList = config
    localStorage.setItem('xiongBuySellList', JSON.stringify(config))
    return config
  }
}

export default storageUtil
