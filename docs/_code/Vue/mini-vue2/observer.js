class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(data) {
    if (!data || typeof data !== 'object') return
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  
  defineReactive(obj, key, value) {
    this.walk(value)
    const self = this
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newValue) {
        if (newValue === value) return
        value = newValue
        // 赋值如果 newValue 是对象, 对象中的属性也应该设置为响应式
        self.walk(newValue)
        // 触发通知 更新视图
        dep.notify()
      }
    })
  }
}
