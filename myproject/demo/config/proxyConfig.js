module.exports = {
  proxyList: {
    '/images':{
        target: 'http://zj.jinwen.tech:8080',
        pathRewrite: {
          '/images': '/images'
        }
    }
  }
}
