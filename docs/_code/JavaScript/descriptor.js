/**
 * 装饰器基本结构
 * https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=true&code_lz=GYVwdgxgLglg9mABAGzgcwBRQIYCc0CmUANImNgLYGkAmBAzhLjAA5Ry4CUiA3gFCJEEBPSiIOMNDHLJEAXkR1GzNhwB0AN2zIQBPgMQxgiLAE8WBOMYlSZ8uQoDkoSLASPu_QYKVNW7XE1tXXlEF2h4MAw1GLw0ek8DbyEROGQCNVRMAAMssI5EOPoALkQAEh4igF9sziTvKFxTXnrk3CIQXCQbaW01bBYWZFMsAAsYelIiuuTBKqFsKAhRkwJE2e9hMHo0jKyMbIBRXFwOUoqCGrrWhtHTgHdEPQ2q-te5_UF2qE6kXxUAnxXnwIMhsPR6IgAIJgGAUbQtQRbUS4EDQDgYchUTyIepQcb0NRYgihYkGYGCAACWQM9GwpgAEgRkKhMZQ1ojNql0pl0AcmSy4OUeMSqqQAJKOCjC_ETInsq7koH6ZFiCCLUkER4wuHaDCOAWoRAAaxgUCgpg8IMWajpjOZrMcAClsBBjVa-AB6T0odD5XCFfAlRAut1en2GoWh40SqWISMms0WoA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.21.4&externalPlugins=&assumptions=%7B%7D
 * function fn(target, name, descriptor) {
 *  const original = descriptor.value
 *  if (type original === 'function') {
 *    descriptor.value = function(...args) {
 *      ... do something
 *    }
 *  }
 *  return descriptor
 * }
 * @param {*} target 
 * @param {*} name 
 * @param {*} descriptor 
 */
function log(target, name, descriptor) {
  const original = descriptor.value
  if (typeof original === 'function') {
    descriptor.value = function(...args) {
      console.log(`log for args: ${args}`)
      try {
        return original.apply(this, args)
      } catch (e) {
        console.log(`Error: ${e}`)
        throw e
      }
    }
  }
  return descriptor
}

// test
// class Animal {
//   constructor(name) { 
//     this.name = name
//   }

//   @log;
//   sayHello(name) {
//     console.log(`Hello ${name}, I'm ${this.name}`)
//   }
// }

// const cat = new Animal('Hello kitty')
// cat.sayHello('Jack')

// log for args: Jack
// Hello Jack, I'm Hello kitty
