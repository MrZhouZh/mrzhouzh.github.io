---
title: JS - 合并两个对象
date: 2023-04-04
category: JavaScript
---

## 合并两个对象

两个对象合并成一个JSON, 其中对象的key为点语法拼接的字符串

```js
const data1 = {"a.b.c": 1, "a.b.d": 2};
const data2 = {"a.b.e": 3, "a.b.f": 4};
const mergedObj = mergeObj(data1, data2);
```

实现思路: 利用 reduce 可重新构造对象, 引用类型的可变性来缓存值

::: details 点击查看代码

```js {5}
function mergeObj(...data) {
  return data.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const keys = key.split('.')
      let nestedObj = prev
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        nestedObj[k] = nestedObj[k] || {}
        nestedObj = nestedObj[k]
      }
      nestedObj[keys[keys.length - 1]] = obj[key]
    })

  return prev
  }, {})
}

const mergedObj = mergeObj(data1, data2)

console.log('mergedObj -- ', mergedObj)
// {
//   a: {
//     b: {
//       c: 1,
//       d: 2,
//       e: 3,
//       f: 4,
//     },
//   },
// }
```

:::

<!-- ### 变种

```js
tools.transfer('[abc[def[ghi]]]')
// {
//   value: "abc",
//   child: {
//     value: "def",
//     child: {
//       value: "ghi",
//     },
//   },
// }
```

```js
const tools = {
  transfer(string) {
    const self = this
    // 去除首尾字符
    let newStr = self.removeStartAndEnd(string);
    // 获取本字符串的有效值
    let value = self.getValue(newStr);
  
    // 初始化嵌套变量
    let nestOrNot = false;
    let child = {};
    
    // 构造返回对象
    let object = {
      value: value
    };
  
    // 如果嵌套，递归获取属性
    if (self.isNest(newStr)) {
      nestOrNot = true;
      child = self.transfer(self.cutSonString(newStr));
    }
  
    // 如果嵌套，返回对象添加child属性
    if (nestOrNot) {
      object.child = child;
    }
    
    return object;
  },

  getValue(string) {
    if (string.indexOf('[') !== -1) {
      return string.substring(0, string.indexOf('['))
    } else {
      return string;
    }
  },

  isNest(string) {
    return string.indexOf('[') !== -1
  },

  removeStartAndEnd(string) {
    return string.substring(1, string.length - 1);
  },

  cutSonString(string) {
    return string.substring(string.indexOf('['), string.lastIndexOf(']') + 1);
  }
}
``` -->




