class MinAxios {
  constructor() {
    this.interceptors = {
      request: new InterceptorsMange,
      response: new InterceptorsMange,
    }
  }

  request(config) {
    // 拦截器和请求队列
    let chain = [this.sendAjax.bind(this), undefined]

    // 请求拦截
    this.interceptors.request.handlers.forEach(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected)
    })
    // 响应拦截
    this.interceptors.response.handlers.forEach(interceptor => {
      chain.push(interceptor.fulfilled, interceptor.rejected)
    })
    
    // 执行队列
    let promise = Promise.resolve(config)
    while(chain.length > 0) {
      promise = promise.then(chain.shift(), chain.shift())
    }

    return promise
  }

  sendAjax(config) {
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
  const context = new MinAxios()
  const instance = context.request.bind(context)
  // MinAxios.prototype 混入到 request 上
  utils.extend(instance, MinAxios.prototype, context)
  utils.extend(instance, context)
  return instance
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

// 拦截器
class InterceptorsMange {
  constructor() {
    this.handlers = []
  }

  use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    })
  }
}
