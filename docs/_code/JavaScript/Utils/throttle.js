/**
 * 节流函数
 * @param {function} fn 回调函数
 * @param {number} ms 等待时间
 * @returns 
 */
function throttle(fn, ms) {
  let inThrottle, lastFn, lastTime
  return function(...args) {
    const context = this
    if (!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(function() {
        // 当前时间 - 上一次触发的时间 大于 等待时间
        if (Date.now() - lastTime >= ms) {
          fn.apply(context, args)
          lastTime = Date.now()
        }
      }, Math.max(ms - (Date.now() - lastTime), 0))
    }
  }

  // 时间戳
  // let previous = 0;
  // return function (...args) {
  //   const now = +new Date();
  //   if (now - previous > wait) {
  //     func.apply(this, args);
  //     previous = now;
  //   }
  // };

  // 定时器
  // let timer = null;
  // return function (...args) {
  //   if (!timer) {
  //     timer = setTimeout(() => {
  //       func.apply(this, args);
  //       timer = null;
  //     }, wait);
  //   }
  // };

  // 时间戳+定时器
  // let previous = 0,
  //   timer = null
  
  // return function(...args) {
  //   const now = +new Date()
  //   const remaining = ms - (now - previous)
  //   if (remaining <= 0) {
  //     clearTimeout(timer)
  //     timer = null
  //     previous = now
  //     fn.apply(this, args)
  //   } else if (!timer){
  //     timer = setTimeout(() => {
  //       timer = null
  //       previous = +new Date()
  //       fn.apply(this, args)
  //     }, remaining)
  //   }
  // }
}
