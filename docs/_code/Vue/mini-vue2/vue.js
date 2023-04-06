class Vue {
  constructor(options) {
    this.$options = options || {}
    this.$el = typeof options.el === 'string'
      ? document.querySelector(options.el)
      : options.el
    this.$data = options.data || {}
    this._proxyData(this.$data)
    // 响应式数据
    new Observer(this.$data)
    // 模板编译
    new Compiler(this)
  }

  // 将 data 中的属性注册到 Vue
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        // 可枚举
        enumerable: true,
        // 可配置
        configurable: true,
        // 获取
        get() {
          return data[key]
        },
        // 设置
        set(newValue) {
          // 判断新值和旧值是否相等
          if (newValue === data[key]) return
          data[key] = newValue
        }
      })
    })
  }
}
