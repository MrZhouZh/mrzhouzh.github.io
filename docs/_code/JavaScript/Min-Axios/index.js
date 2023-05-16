class MinAxios {
  constructor() {}

  request(config) {
    return new Promise(resolve => {
      const { url = '', method = 'get', data = {} } = config
      const xhr = new XMLHttpRequest()
      xhr.open(method, url, true)
      xhr.onload = function() {
        resolve(xhr.responseText)
      }
      xhr.send(data)
    })
  }
}

function CreateAxiosFn() {
  const axios = new MinAxios()
  const req = axios.request.bind(axios)
  // MinAxios.prototype 混入到 request 上
  utils.extend(req, MinAxios.prototype, axios)
  return req
}

// const axios = new CreateAxiosFn()

const methods = [
  'get', 'delete', 'head', 'options', 'put', 'patch', 'post',
]
methods.forEach(method => {
  MinAxios.prototype[method] = function(...args) {
    if (['get', 'delete', 'head', 'options'].includes(method)) {
      // (url[, config])
      return this.request({
        method,
        url: args[0],
        ...args[1] || {}
      })
    } else {
      // (url[, data[, config]])
      return this.request({
        method,
        url: args[0],
        data: args[1] || {},
        ...args[2] || {}
      })
    }
  }
})

// 工具类
const utils = {
  extend(a, b, context) {
    for(let key in b) {
      if (b.hasOwnProperty(key)) {
        if (typeof b[key] === 'function') {
          a[key] = b[key].bind(context)
        } else {
          a[key] = b[key]
        }
      }
    }
  }
}
