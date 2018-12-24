const axios = require('axios')
const codeMap = {
  'chuangye': {
    code: 'sz399006',
    name: '创业',
    up: 136.55,
    upDay: 117,
    down: -165.46,
    downDay: 148,
    incomeHighRate: true,
    noLong: true
  },
  'gangtie': {
    code: 'sz399440',
    name: '钢铁',
    up: 135.67,
    upDay: 135,
    down: -163.66,
    downDay: 130,
    stable: true
  },
  'jungong': {
    code: 'sz399959',
    name: '军工',
    up: 138.31,
    upDay: 129,
    down: -165.67,
    downDay: 136
  },
  'yiyao': {
    code: 'sh000037',
    name: '医药',
    up: 160.94,
    upDay: 121,
    down: -184.03,
    downDay: 144,
    incomeHighRate: true,
    noLong: true
  },
  'meitan': {
    code: 'sz399998',
    name: '煤炭',
    up: 142.32,
    upDay: 130,
    down: -170.53,
    downDay: 135
  },
  'youse': {
    code: 'sh000823',
    name: '有色',
    up: 124.79,
    upDay: 129,
    down: -158.25,
    downDay: 136
  },
  'jisuanji': {
    code: 'sz399363',
    name: '计算机',
    up: 167.10,
    upDay: 119,
    down: -196.42,
    downDay: 146,
    incomeHighRate: true,
    noLong: true
  },
  'baijiu': {
    code: 'sz399997',
    name: '白酒',
    up: 211.44,
    upDay: 115,
    down: -235.00,
    downDay: 150,
    incomeHighRate: true,
    noLong: true
  },
  'xinxi': {
    code: 'sh000993',
    name: '信息',
    up: 144.75,
    upDay: 117,
    down: -180.78,
    downDay: 148,
    incomeHighRate: true,
    noLong: true
  },
  'xiaofei': {
    code: 'sh000990',
    name: '消费',
    up: 144.33,
    upDay: 124,
    down: -165.08,
    downDay: 141
  },
  'baoxian': {
    code: 'sz399809',
    name: '保险',
    up: 134.12,
    upDay: 124,
    down: -162.67,
    downDay: 141
  },
  'wulin': {
    code: 'sh000016',
    name: '50',
    up: 115.65,
    upDay: 135,
    down: -133.44,
    downDay: 130,
    stable: true
  },
  'chuanmei': {
    code: 'sz399971',
    name: '传媒',
    up: 119.45,
    upDay: 123,
    down: -154.27,
    downDay: 142
  },
  'dianzi': {
    code: 'sz399811',
    name: '电子',
    up: 132.40,
    upDay: 115,
    down: -176.17,
    downDay: 150,
    noLong: true
  },
  'yiliao': {
    code: 'sz399989',
    name: '医疗',
    up: 188.00,
    upDay: 126,
    down: -198.96,
    downDay: 139,
    incomeHighRate: true,
    stable: true
  },
  'shengwu': {
    code: 'sz399441',
    name: '生物',
    up: 156.94,
    upDay: 130,
    down: -179.35,
    downDay: 135,
    stable: true
  },
  'sanbai': {
    code: 'sh000300',
    name: '300',
    up: 106.64,
    upDay: 128,
    down: -130.22,
    downDay: 137
  },
  'wubai': {
    code: 'sh000905',
    name: '500',
    up: 104.21,
    upDay: 125,
    down: -136.18,
    downDay: 140
  },
  'zhengquan': {
    code: 'sz399437',
    name: '证券',
    up: 125.78,
    upDay: 124,
    down: -154.60,
    downDay: 141
  },
  'yinhang': {
    code: 'sz399986',
    name: '银行',
    up: 115.91,
    upDay: 129,
    down: -127.37,
    downDay: 136,
    stable: true
  },
  'dichan': {
    code: 'sz399393',
    name: '地产',
    up: 152.86,
    upDay: 123,
    down: -175.12,
    downDay: 142,
    incomeHighRate: true
  },
  'jijian': {
    code: 'sz399995',
    name: '基建',
    up: 84.87,
    upDay: 111,
    down: -114.35,
    downDay: 154,
    incomeHighRate: true,
    noLong: true
  },
  'huanbao': {
    code: 'sh000827',
    name: '环保',
    up: 83.86,
    upDay: 120,
    down: -122.27,
    downDay: 145,
    noLong: true
  },
  'qiche': {
    code: 'sz399432',
    name: '汽车',
    up: 78.74,
    upDay: 125,
    down: -114.06,
    downDay: 140
  }
}
let list = []
for (let key in codeMap) {
  const item = codeMap[key]
  list.push({
    name: item.name,
    up: item.up,
    upDay: item.upDay,
    down: item.down,
    downDay: item.downDay,
    flag: d(item)
  })
}
function d (a) {
  // return (a['up'])/( -a['down'])
  //incomeHighRate
  // return (a['up'] / a['upDay'])/( -a['down'] / a['downDay'])
  // return (a['downDay'])
  // stable: true
  return (a['up'] * a['upDay'])/( -a['down'] * a['downDay'])
}
list.sort((a, b)=>{
  return d(b) - d(a)
})
console.log(list)
// let up = 0
// let down = 0
// let upDay = 0
// let downDay = 0
axios.get(
  'http://47.98.140.76:3002/myService/webData/getWebStockdaybarAllZhongjin?code=sz399432&days=265'
).then((data) => {
  const list = data.data.data.list
  for (let i = 0; i < list.length; i++) {
    const item = list[i].kline
    let diff = item.close - item.preClose
    if (diff > 0) {
      up += diff
      upDay++
    } else {
      down += diff
      downDay++
    }
  }
  const base = list[list.length - 1].kline.preClose / 100
  console.log('up:' + (up / base).toFixed(2) + ',')
  console.log('upDay:' + upDay + ',')
  console.log('down:' + (down / base).toFixed(2) + ',')
  console.log('downDay:' + downDay)
});
console.log(265*0.53)
