import storageUtil from '@/util/storageUtil.js'
const allDataList = {
  '中金': 'getWebStockdaybarAllZhongjin',
  '股市通': 'getWebStockdaybarAllGushitong',
  '东方': 'getWebStockdaybarDongfang'
}
const todayDataList = {
  '中金': 'getWebStockdaybarTodayZhongjin',
  '股市通': 'getWebStockdaybarTodayZhongjin',
  '东方': 'getWebStockdaybarTodayDongfang'
}

function getWay () {
  return storageUtil.getAppConfig('dataWay') || '东方'
}

const stockDataUtil = {
  getAllUrl: function () {
    const dataWay = getWay()
    return allDataList[dataWay]
  },
  getTodayUrl: function () {
    const dataWay = getWay()
    return todayDataList[dataWay]
  }
}
export default stockDataUtil
