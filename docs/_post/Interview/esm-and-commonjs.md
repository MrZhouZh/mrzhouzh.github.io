---
title: ESM 和 CommonJS 的区别
date: 2020-05-25
category: Interview
---

## `ESM` 和 `CommonJS` 的区别

不同点:

- `this` 指向不同

  `CommonJS` 的 `this` 指向的是当前 `module`, 默认是 `exports`

  ```js
  var args = [self.exports, require, self, filename, dirname]
  return compiledWrapper.apply(self.exports, args)
  ```

  `ESM` 由于语言层面的设计指向的是 `undefined`

- `__filename`, `__dirname` 在 `CommonJS` 中存在, 而 `ESM` 中不存在

  在 CommonJS 中, 模块的执行需要用函数包裹, 并制定一些常用值. 所以我们在全局中可以直接用 `__filename`, `__dirname`.

  ```js
  NativeModule.wrapper = [
    '(function (exports, require, module, __filename, __dirname) {',
    '\n});'
  ]
  ```

相同点:

- `ESM` 和 `CommonJS` 都有缓存

  加载一次后将其缓存起来, 后续再次加载就直接用缓存中的

