/**
 * simple-koa.js
 * 简易版 koa
 */
const Emitter = require('events');
const compose = require('./simple-koa-compose');

module.exports = class Koa extends Emitter {
  constructor(options) {
    super()
    options = options || {}
    this.middware = []
    this.context = {
      method: 'GET',
      url: '/url',
      body: undefined,
      set(key, val) {
        console.log('context set', key, val);
      }
    }
  }

  use(fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function')
    // TODO: convert generator function
    this.middware.push(fn)
    return this
  }

  listen() {
    const fnMiddleware = compose(this.middware)
    const ctx = this.context
    const handleResponse = () => respond(ctx)
    const onerror = () => { console.log('onerror') }
    return fnMiddleware(ctx).then(handleResponse).catch(onerror)
  }
}

// handle response
function respond(ctx) {
  console.log('handle response');
  console.log('response end', ctx.body);
}


