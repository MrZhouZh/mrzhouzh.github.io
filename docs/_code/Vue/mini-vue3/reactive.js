const isObject = val => val !== null && typeof val === 'object'

const hasOwn = (target, key) =>
  Object.prototype.hasOwnProperty.call(target, key)

export function reactive(target) {
  if (!isObject(target)) return target

  const handler = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      if (isObject(result)) {
        return reactive(result)
      }
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        trigger(target, key)
      }

      return result
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey && result) {
        trigger(target, key)
      }

      return result
    }
  }

  return new Proxy(target, handler)
}

// 表示当前正在执行的 effect
let activeEffect = null
export function effect(callback) {
  activeEffect = callback
  callback()
  activeEffect = null
}

// 每个key都是一个普通对象, 对应他们的 depsMap
let targetMap = new WeakMap()

export function track(target, key) {
  if (!activeEffect) return
  // 获取当前对象的依赖图
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  // 根据key从依赖图中获取到 effect 集合
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  // 如果当前effect不存在, 注册到 dep 里
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
  }
}

// 响应式触发
export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}

// 判断是否是一个对象, 就用 reactive 来代理
const convert = val => (isObject(val) ? reactive(val) : val)

class RefImpl {
  constructor(_rawValue) {
    this._rawValue = _rawValue
    this.__v_isRef = true
    // 判断 _rawValue 是否是一个对象
    // 如果是对象调用 reactive 使用 proxy 来代理
    // 不是则返回 _rawValue 本身
    this._value = convert(_rawValue)
  }
  get value() {
    track(this, 'value')
    return this._value
  }
  set value(newValue) {
    if (newValue !== this._value) {
      this._rawValue = newValue
      this._value = convert(this._rawValue)
      trigger(this, 'value')
    }
  }
}

export function ref(rawValue) {
  if (!isObject(rawValue) && rawValue.__v_isRef) return
  return new RefImpl(rawValue)
}

class ObjectRefImpl {
  constructor(proxy, _key) {
    this._proxy = proxy
    this._key = _key
    // 用来标识是否是一个 ref
    this.__v_isRef = true
  }
  get value() {
    // _proxy 响应式对象, 当访问 _key 时, _proxy 会自动收集依赖
    return this._proxy[this._key]
  }
  set value(newValue) {
    // _proxy 响应式对象会在 _proxy 里 set 调用 trigger
    this._proxy[this._key] = newValue
  }
}

export function toRef(proxy, key) {
  return new ObjectRefImpl(proxy, key)
}

export function toRefs(proxy) {
  // 判断当前 proxy 是 proxy 数组还是对象
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}
  for (const key in proxy) {
    // 内部调用 toRef 转响应式
    ret[key] = toRef(proxy, key)
  }

  return ret
}
