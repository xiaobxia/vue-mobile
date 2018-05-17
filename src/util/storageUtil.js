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
  }
}

export default storageUtil
