class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    Dep.target = this
    // 旧数据更新视图进行比较
    // vm[key] 这个时候已经触发 get 方法
    // 之前 get 把观察者通过 dep.addSub(Dep.target) 添加到 dep.subs 中
    this.oldValue = vm[key]
    // 已缓存过就清除
    Dep.target = null
  }

  // 用来更新视图
  update() {
    let newValue = this.vm[this.key]
    // 比较新旧值
    if (newValue === this.oldValue) return
    this.cb(newValue)
  }
}
