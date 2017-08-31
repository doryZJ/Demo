import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://121.40.161.244:8080/#'
})
instance.interceptors.request.use((config) => {
  let configUrl = config.url.split('#')
  const site = window.localStorage['site']
  configUrl.splice(1, 0, site)
  configUrl = configUrl.join('')
  config.url = configUrl
  return config
})
export default instance