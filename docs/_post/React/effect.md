---
title: useEffect 与 useLayoutEffect 的区别
date: 2023-05-10
category: React
---

## `useEffect` 与 `useLayoutEffect` 的区别

`useEffect`: 用来取代 `componentDidMount` 和 `componentDidUpdate`. 主要作用是当页面渲染后, 进行一些副作用操作(比如访问 `DOM`, 请求数据)

`useLayoutEffect`: 作用与 `useEffect` 几乎一致.

<!-- 衍生 useIsomon -->

观察以下两个例子:

`useEffect`:

```react
import { useEffect, useState } from 'react'

function App() {
  const [msg, setMsg] = useState('hello world')

  useEffect(() => {
    let i = 0;
    while(i <= 100000000) {
      i++;
    }
    setMsg("world hello")
  }, [])

  return (
    <div>{msg}</div>
  )
}
```

`useLayoutEffect`:

```react
import { useEffect, useState } from 'react'

function App() {
  const [msg, setMsg] = useState('hello world')

  useLayoutEffect(() => {
    let i = 0;
    while(i <= 100000000) {
      i++;
    }
    setMsg("world hello")
  }, [])

  return (
    <div>{msg}</div>
  )
}
```

可以看出, 使用 `useEffect` 在页面中进行 `msg` 的值, 页面会有细微的闪烁, 而 `useLayoutEffect` 则不会出现闪烁.

> `useEffect` 在渲染完成后异步执行, 先将初始值 `hello world` 渲染, 然后异步变成 `world hello`, 从而导致页面闪烁

> `useLayoutEffect` 是渲染之前同步完成, 等到执行完成后再进行渲染.

### 总结

- 优先使用 `useEffect`, 因为异步执行不会阻塞渲染

- 影响渲染的操作统一放到 `useLayoutEffect`, 避免页面闪烁

- `useLayoutEffect` 与 `componentDidMount` 等价, 同步调用从而阻塞渲染

- 在 `SSR` 项目中使用 `useLayoutEffect` 会出现 **warning**, 这是 `useLayoutEffect` 只有 `CSR` 时才能使用, 这可能导致 `SSR`渲染的内容与实际不符. 而解决办法就是 `useIsomorphicLayoutEffect`:

  > Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://fb.me/react-uselayouteffect-ssr for common fixes.

  ```jsx
  import { useEffect, useLayoutEffect } from 'react'
  const useIsomorphicLayoutEffect = 
    typeof window !== 'undefined' ? useLayoutEffect : useEffect
  export default useIsomorphicLayoutEffect
  ```

<!-- [useLayoutEffect和useEffect的区别](https://zhuanlan.zhihu.com/p/348701319) -->
