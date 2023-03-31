---
title: 深拷贝对象
date: 2023-03-29
category: JavaScript
---

## 深拷贝对象

第一种: `JSON.parse(JSON.stringify(obj))`

```js
const obj = {
  a: {
    b: 1,
    c: {
      d: 2
    }
  }
}
const deepObj = JSON.parse(JSON.stringify(obj))
deepObj.a.b = 3
console.log(obj.a.b)  // 1
console.log(deepObj.a.b)  // 3
```

第二种: `deepClone`, 本质是将基本类型进行copy

```js
function getType(target) {
  return Object.prototype.toString
    .call(target)
    .slice(8, -1)
    .toLowerCase();
}

const deepClone = (obj, clonedObj = new WeakMap()) => {
  if (obj === null || typeof obj !== 'object') return obj
  if (clonedObj.has(obj)) {
    return clonedObj.get(obj)
  }

  let clone;

  if (getType(obj) === 'date') {
    clone = new Date(obj.getTime())
  } else if (getType(obj) === 'regexp') {
    clone = new RegExp(obj)
  } else if (getType(obj) === 'function') {
    clone = function() {
      return obj.apply(this, arguments)
    }
  } else if (getType(obj) === 'symbol') {
    clone = Object(Symbol.prototype.valueOf.call(obj))
  } else if (getType(obj) === 'map') {
    clone = new Map()
    for (const [key, value] of obj) {
      clone.set(deepClone(key, clonedObj), deepClone(value, clonedObj))
    }
  } else if (getType(obj) === 'set') {
    clone = new Set()
    for (const value of obj) {
      clone.add(deepClone(value, clonedObj))
    }
  } else if (getType(obj) === 'object' || getType(obj) === 'array') {
    clone = new obj.constructor()
    clonedObj.set(obj, clone)
    // TODO: Symbol key copy failed
    for (const [key, value] of Object.entries(obj)) {
      clone[key] = deepClone(value, clonedObj)
    }
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
//     date: "2023-03-31T13:51:08.118Z",
//     regex: {
//     },
//   },
//   func: function(x) {
//     console.log(12321, x)
//   },
//   num: 43,
//   symbol: Symbol(test),
//   bint: 100n,
// }
```
