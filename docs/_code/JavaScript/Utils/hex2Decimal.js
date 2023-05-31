class Stack {
  constructor() {
    this.dataStore = []
    this.top = 0
  }

  // 入栈
  push(value) {
    return this.dataStore[this.top++] = value
  }

  // 删除栈顶元素
  pop() {
    return this.dataStore[--this.top]
  }

  // 返回栈顶元素
  peek() {
    return this.dataStore[this.top - 1]
  }

  // 判断栈是否为空
  isEmpty() {
    return this.top === 0
  }

  // 清空栈
  clear() {
    this.top = 0
  }

  // 返回栈大小
  size() {
    return this.top
  }

  // 打印栈
  print() {
    console.log('print -> ', this.dataStore.toString())
  }
}

/** */
function hex2Decimal(decNumber, base = 10) {
  let remStack = new Stack(),
    rem,
    binaryStr = '',
    digits = '0123456789ABCDEF'

  while (decNumber > 0) {
    rem = Math.floor(decNumber % base)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / base)
  }

  console.log('remStack -> ', remStack)

  while (!remStack.isEmpty()) {
    binaryStr += digits[remStack.pop()]
  }

  return binaryStr
}


hex2Decimal(8, 2)
