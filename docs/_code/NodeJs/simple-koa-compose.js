/**
 * simple-koa-compose.js
 * refs: https://github.com/koajs/compose/blob/master/index.js
 * @param {function[]} middleware 
 * @returns {function}
 */
module.exports = function compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError(`Middleware stack must be an array`)
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError(`Middleware must be composed of functions!`)
  }

  /**
   * @param {object} context
   * @param {Promise} next
   */
  return function(context, next) {
    let index = -1
    
    return dispatch(0)
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error(`next() called multiple times`))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

