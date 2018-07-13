import axios from 'axios'
import qs from 'qs'
import router from '../router/index'
const basePath = '/myService/'

axios.interceptors.request.use(function (config) {
  config.headers.token = window._token || localStorage.getItem('token') || ''
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  if (response.data.success === false) {
    console.error(response.data.message)
    if (response.data.code === 401) {
      router.push('/page/login')
    }
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

function makeUrl (url) {
  if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')) {
    return url
  } else {
    return `${basePath}${url}`
  }
}
const Http = {
  get (url, query, options) {
    let queryString = ''
    if (query) {
      query.timestamp = new Date().getTime()
      queryString = qs.stringify(query)
    } else {
      queryString = qs.stringify({timestamp: new Date().getTime()})
    }
    return axios.get(makeUrl(url + (queryString ? '?' + queryString : '')), options).then(data => data.data)
  },

  getWithCache (url, query, cache, options) {
    let queryString = ''
    let cacheKey = url
    if (query) {
      cacheKey += qs.stringify({
        ...query
      })
      query.timestamp = new Date().getTime()
      queryString = qs.stringify(query)
    } else {
      queryString = qs.stringify({timestamp: new Date().getTime()})
    }
    let cacheData = localStorage.getItem(cacheKey)
    if (cacheData) {
      let cacheDataRaw = JSON.parse(cacheData)
      // 可以使用缓存
      if (!((Date.now() - cacheDataRaw.time) > cache.interval * 1000)) {
        return new Promise((resolve, reject) => {
          resolve(cacheDataRaw.data)
        })
      }
    }
    return axios.get(makeUrl(url + (queryString ? '?' + queryString : '')), options).then(data => {
      cacheData = {
        time: Date.now(),
        data: data.data
      }
      localStorage.setItem(cacheKey, JSON.stringify(cacheData))
      return data.data
    })
  },

  getRaw (url, query, options) {
    let queryString = ''
    if (query) {
      query.timestamp = new Date().getTime()
      queryString = qs.stringify(query)
    } else {
      queryString = qs.stringify({timestamp: new Date().getTime()})
    }
    return axios.get(makeUrl(url + (queryString ? '?' + queryString : '')), options)
  },

  post (url, param, options) {
    return axios.post(makeUrl(url), qs.stringify(param), options).then(data => data.data)
  },

  postRaw (url, param, options) {
    return axios.post(makeUrl(url), qs.stringify(param), options)
  },

  postJSON (url, param, options) {
    return axios.post(makeUrl(url), param, options).then(data => data.data)
  },

  postJSONRaw (url, param, options) {
    return axios.post(makeUrl(url), param, options)
  },

  delete (url, options) {
    return axios.delete(makeUrl(url), options).then(data => data.data)
  },

  deleteRaw (url, options) {
    return axios.delete(makeUrl(url), options)
  },

  jsonp (url, options) {
    return axios.jsonp(makeUrl(url), options)
  },
  generateUrl (url) {
    return makeUrl(url)
  }
}

export default Http
