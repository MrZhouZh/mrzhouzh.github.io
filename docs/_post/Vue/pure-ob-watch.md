---
title: 实现简易观察者模式和watch
date: 2023-04-06
category: Vue
---

## 实现简易观察者模式和watch

实现 ob 和 watch 方法，希望当方法传入 watch 函数时会执行一次，之后每次修改 data 上的属性时，会触发对应的 console

```js
const data = ob({ count: 0, foo: 'test' });

watch(() => {
    console.log('watch-count', data.count);
});
watch(() => {
    console.log('watch-foo', data.foo);
});

data.count += 1;
console.log('showcount', data.count);
delete data.count;
data.foo = 'test2';
```

实现: 主要是借助 Proxy/Reflect 进行检测代理, 一旦检测对象发生改变, 就触发watch的钩子函数

::: details 点击查看代码

<<< @/docs/_code/Vue/pure-ob-watch.js#snippet{11,18,31}

:::

### 参考资料

- [腾讯(看点)](https://juejin.cn/post/7036581158670303240#heading-25)
- [实现简易Vue响应式](https://juejin.cn/post/6989106100582744072#heading-14)
