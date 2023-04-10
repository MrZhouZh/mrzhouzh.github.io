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

第二种: `deepClone`, 就是将以下类型进行复制, 基本类型可直接赋值, 但是以下类型需要特殊处理:

> `date`, `regexp`, `function`, `symbol`, `map`, `set`, `object`, `array`

<!-- function myForeach(arr, iteratorFn) {
  let index = -1
  const length = arr.length
  while(++index < length) {
    iteratorFn(arr[index], index)
  }
  return arr
} -->

::: details 点击查看代码

<<< @/docs/_code/JavaScript/DeepClone.js

:::

## 参考资料

- [30secondsofcode - deepClone](https://www.30secondsofcode.org/js/s/deep-clone/)
