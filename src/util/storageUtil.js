/**
 * Created by xiaobxia on 2018/5/3.
 */
const storageUtil = {
  getAppConfig: function (key) {
    const appConfigString = localStorage.getItem('appConfig')
    let config = {}
    if (appConfigString) {
      config = JSON.parse(appConfigString)
    }
    if (key) {
      return config[key]
    }
    return config
  },
  setAppConfig: function (key, value) {
    let config = this.getAppConfig()
    config[key] = value
    localStorage.setItem('appConfig', JSON.stringify(config))
    return config
  }
}

export default storageUtil
