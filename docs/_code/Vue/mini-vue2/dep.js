class Dep {
  constructor() {
    // 观察者列表
    this.subs = []
  }

  addSub(sub) {
    // 判断观察者是否存在和是否拥有update方法
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }

  notify() {
    // 触发每个观察者更新方法
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
