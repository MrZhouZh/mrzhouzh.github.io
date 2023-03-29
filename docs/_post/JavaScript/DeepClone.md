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

const deepClone = obj => {
  if (obj === null) return null
  let clone = Object.assign({}, obj)

  if (getType(obj) === 'object') {
    Object.keys(clone).forEach(
      key => (
        clone[key] = typeof obj[key] === 'object'
          ? deepClone(obj[key])
          : obj[key]
      )
    )
  }

  if (Array.isArray(obj)) {
    clone.length = obj.length
    return Array.from(clone)
  }

  // TODO: other type Set RegExp Function
  return clone
}

// Test
const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj
```
