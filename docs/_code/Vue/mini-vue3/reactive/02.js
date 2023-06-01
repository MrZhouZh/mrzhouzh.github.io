/**
 * 实现最基本的响应式系统
 * 1. 借助 Proxy 将一个对象变成响应式数据, 拦截 get/set 操作
 * 2. 通过 effect 注册副作用函数, 并在首次执行副作用函数时完成对象的依赖收集 (track)
 * 3. 当数据发生变化时, 第二步注册的副作用函数会重新执行 (trigger)
 * 
 * @refs: https://mp.weixin.qq.com/s/ncPgUrQ8ZddR2AAGVmeojw
 */
;(function() {
  const bucket = new WeakMap()
  // 重新定义 bucket 数据类型为 WeakMap
  let activeEffect
  const effect = function(fn) {
    const effectFn = () => {
      cleanup(effectFn)
      activeEffect = effectFn
      fn()
    }
    effectFn.deps = []
    effectFn()
  }

  function cleanup(effectFn) {
    for (let i = 0; i < effectFn.deps.length; i++) {
      const deps = effectFn.deps[i]
      deps.delete(effectFn)
    }

    effectFn.deps.length = 0
  }

  // track
  function track(target, key) {
    // activeEffect 没有值意味着没有执行 effect 函数, 无法收集依赖, 直接 return
    if (!activeEffect) return

    // 每个 target 在 bucket 中都是一个 Map: key => effects
    let depsMap = bucket.get(target)

    // 首次拦截, depsMap 不存在, 先创建联系
    if (!depsMap) {
      bucket.set(target, (depsMap = new Map()))
    }
    
    // 根据当前读取的 key, 尝试读取 key 对应的 effects
    let deps = depsMap.get(key)

    if (!deps) {
      // deps 本质是 Set 结构, 一个 key 可以存在多个 effect, 被多个 effect 所依赖, 一对多的关系
      depsMap.set(key, (deps = new Set()))
    }

    // 将激活的 effect fn 放进桶中
    deps.add(activeEffect)
  }

  // trigger 执行
  function trigger(target, key) {
    const depsMap = bucket.get(target)
    if (!depsMap) return

    const effects = depsMap.get(key)
    // 解决 cleanup 执行后无限调用的问题
    const effectsToRun = new Set(effects)
    // 逐个执行
    // effects && effects.forEach(fn => fn())
    effectsToRun.forEach(fn => fn())
  }

  // 响应式函数
  function reactive(state) {
    return new Proxy(state, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver)
        track(target, prop)

        return value
      },
      set(target, prop, newValue, receiver) {
        const oldValue = Reflect.get(target, prop, receiver)
        let result = true
        if (oldValue !== newValue) {
          result = Reflect.set(target, prop, newValue, receiver)
          trigger(target, prop)
        }

        return result
      },
      deleteProperty(target, prop) {
        const hadKey = Object.prototype.hasOwnProperty.call(target, prop)
        const result = Reflect.deleteProperty(target, prop)
        if (hadKey && result) {
          trigger(target, key)
        }

        return result
      }
    })
  }

  // test
  const state = reactive({
    ok: true,
    text: 'hello world',
  })


  effect(() => {
    console.log('rendering...')
    document.querySelector('#app').innerHTML = state.ok ? state.text : 'not' 
  })

  setTimeout(() => {
    state.ok = false

    setTimeout(() => {
      state.text = 'other'
    }, 1000);
  }, 1000);

  // rendering...
  // rendering...
  // rendering...

})();
