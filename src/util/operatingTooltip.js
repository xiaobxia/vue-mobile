import storageUtil from '@/util/storageUtil.js'

const operatingTooltip = {
  // 建议购买金额
  getBuyNumber (multiple, myAsset) {
    // 熊策略是简的1.5
    multiple = multiple || 1
    let marketStatus = storageUtil.getMarketStatus('question_1') || '强'
    let factor = 1
    // 根据市场强弱调节
    if (marketStatus === '强') {
      factor = 1.5
    }
    if (marketStatus === '弱') {
      factor = 0.6
    }
    // 1/160
    return 100 * Math.round(myAsset * multiple * factor / 16000)
  },
  // 根据市场强弱提示那些本该买卖，而没有进行的
  getMarketWarn (netChangeRatio, buySellList) {
    let marketWarn = ''
    if (buySellList[0] === '') {
      let marketStatus = storageUtil.getMarketStatus('question_1') || '强'
      for (let i = 1; i < buySellList.length; i++) {
        if (buySellList[i] === 'buy') {
          if (marketStatus === '略强' && netChangeRatio < 0) {
            marketWarn = 'buy'
          }
          if (marketStatus === '强') {
            marketWarn = 'buy'
          }
          break
        }
        if (buySellList[i] === 'sell') {
          if (['略弱', '弱'].indexOf(marketStatus) !== -1 && netChangeRatio < 0) {
            marketWarn = 'sell'
          }
          break
        }
      }
    }
    return marketWarn
  },
  // 根据仓位提示，仓位是否合适
  getPositionWarn (item, myAsset, totalSum, hasCount) {
    // 如果是混合指数宽限1.5倍
    let mix = (item.mix ? 1.5 : 1) * 0.9
    let assetLevelOne = (myAsset / 15) * mix
    let totalLevelOne = (totalSum / 6) * mix
    // 如果大于总资产的1/15，大于持仓的1/6，那就是危险
    if ((hasCount >= assetLevelOne) || (hasCount >= totalLevelOne)) {
      return 'danger'
    }
    let assetLevelTwo = (myAsset / 25) * mix
    let totalLevelTwo = (totalSum / 10) * mix
    // 如果大于总资产的1/25，大于持仓的1/10，那就需要警示
    if ((hasCount >= assetLevelTwo) || (hasCount >= totalLevelTwo)) {
      return 'warn'
    }
    return ''
  }
}
export default operatingTooltip
