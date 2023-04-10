function getType(target) {
  return Object.prototype.toString
    .call(target)
    .slice(8, -1)
    .toLowerCase();
}

/**
 * 深复制
 * @param {object} obj 
 * @param {object} clonedObj 
 * @returns {object}
 */
const deepClone = (obj, clonedObj = new WeakMap()) => {
  if (obj === null || typeof obj !== 'object') return obj
  if (clonedObj.has(obj)) {
    return clonedObj.get(obj)
  }

  const type = getType(obj)
  let clone;

  if (type === 'date') {
    clone = new Date(obj.getTime())
  } else if (type === 'regexp') {
    clone = new RegExp(obj)
  } else if (type === 'function') {
    clone = function() {
      return obj.apply(this, arguments)
    }
  } else if (type === 'symbol') {
    clone = Object(Symbol.prototype.valueOf.call(obj))
  } else if (type === 'map') {
    clone = new Map()
    for (const [key, value] of obj) {
      clone.set(deepClone(key, clonedObj), deepClone(value, clonedObj))
    }
  } else if (type === 'set') {
    clone = new Set()
    for (const value of obj) {
      clone.add(deepClone(value, clonedObj))
    }
  } else if (type === 'object' || type === 'array') {
    clone = new obj.constructor()
    clonedObj.set(obj, clone)
    // fix: Reflect.ownKeys 可以遍历拿到 symbol 的 key
    // refs: https://es6.ruanyifeng.com/#docs/symbol#%E5%B1%9E%E6%80%A7%E5%90%8D%E7%9A%84%E9%81%8D%E5%8E%86
    const keys = type === 'array' ? undefined : Reflect.ownKeys(obj)
    const ret = keys || obj
    ret.forEach((value, key) => {
      if (keys) {
        key = value
      }
      clone[key] = deepClone(obj[key], clonedObj)
    })
  }

  return clone
}

// example
const obj = {
  dep: {
    str: '123213',
    age: 12,
    bool: true,
    nullVal: null,
    undefinedVal: undefined,
    arr: [1, 2, 3],
    obj: { a: 1, b: 2 },
    date: new Date(),
    regex: /hello/g,
  },
  func(x) {
    console.log(12321, x)
  },
  num: 43,
  symbol: Symbol('test'),
  [Symbol('symbol1')]: 'foo',
  bint: BigInt(100)
}

const clone = deepClone(obj)

console.log(clone)
// {
//   dep: {
//     str: "123213",
//     age: 12,
//     bool: true,
//     nullVal: null,
//     undefinedVal: undefined,
//     arr: [
//       1,
//       2,
//       3,
//     ],
//     obj: {
//       a: 1,
//       b: 2,
//     },
//     date: "2023-04-10T11:59:43.017Z",
//     regex: /hello/g,
//   },
//   func: function(x) {
//     console.log(12321, x)
//   },
//   num: 43,
//   symbol: Symbol(test),
//   Symbol('symbol1'): 'foo',
//   bint: 100n,
// }
