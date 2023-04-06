class Compiler {
  constructor(vm) {
    this.vm = vm
    this.el = vm.$el
    this.compile(this.el)
  }

  compile(el) {
    let childNodes = [...el.childNodes]
    childNodes.forEach(node => {
      // 根据不同的节点类型进行编译
      // 文本类型的节点
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      }

      // 有子节点进行递归
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  compileText(node) {
    // 找到模板变量
    let reg = /\{\{(.+?)\}\}/
    let val = node.textContent
    if (reg.test(val)) {
      let key = RegExp.$1.trim()
      node.textContent = val.replace(reg, this.vm[key])
      // 创建观察者
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }

  }

  compileElement(node) {
    ![...node.attributes].forEach(attr => {
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        attrName = attrName.substring(2)
        // 例如 v-text="msg"
        // msg 作为 key 去 vue 中找这个变量
        let key = attr.value
        // 指令操作 执行指令方法
        // vue指令很多为了避免大量 if 判断, 这里就写个 update 方法
        this.update(node, key, attrName)
      }
    })
  }

  // 添加指令方法,并执行
  update(node, key, attrName) {
    // 例如添加 textUpdater 用来处理 v-text 方法
    // 将其内置一个 textUpdater 方法进行调用
    // 加个后缀无所谓主要是定义相对应的方法
    let updateFn = this[attrName + 'Updater']
    // 如果存在这个方法, 就直接调用
    updateFn && updateFn.call(this, node, key, this.vm[key])
  }

  // v-text
  textUpdater(node, key, value) {
    node.textContent = value
    new Watcher(this.vm, key, newValue => {
      node.textContent = newValue
    })
  }

  // v-model
  modelUpdater(node, key, value) {
    node.value = value
    new Watcher(this.vm, key, newValue => {
      node.value = newValue
    })
    // 实现双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }

  // 判断元素的属性是否是 vue 指令
  isDirective(attr) {
    return attr.startsWith('v-')
  }

  // 判断是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }

  // 判断是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }
}
