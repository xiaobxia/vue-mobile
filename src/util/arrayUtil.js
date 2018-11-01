const arrayUtil = {
  findObjectItem (array, keyName, keyValue) {
    for (let k = 0, len = array.length; k < len; k++) {
      if (array[k][keyName] === keyValue) {
        return array[k]
      }
    }
  },
  findIndex (array, keyName, keyValue) {
    for (let k = 0, len = array.length; k < len; k++) {
      if (array[k][keyName] === keyValue) {
        return k
      }
    }
    return 0
  },
  removeObjectItem (array, keyName, keyValue) {
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (item[keyName] === keyValue) {
        array.splice(i, 1)
        break
      }
    }
  },
  copy (list) {
    let temp = []
    for (let i = 0; i < list.length; i++) {
      temp[i] = list[i]
    }
    return temp
  }
}

export default arrayUtil
