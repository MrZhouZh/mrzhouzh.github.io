/**
 * 队列
 */
class CQueue {
  constructor() {
    this.inStack = []
    this.outStack = []
  }

  // 入队
  appendTail(value) {
    this.inStack.push(value)
  }

  // 出队
  deleteHead() {
    const { inStack, outStack } = this
    if (outStack.length > 0) return outStack.pop()

    while(inStack.length) {
      outStack.push(inStack.pop())
    }

    return outStack.pop() || -1
  }
}

// ---------- Test ---------
let cqueue = new CQueue()
cqueue.appendTail(0)
cqueue.appendTail(1)
cqueue.appendTail(2)

cqueue.deleteHead()
cqueue.deleteHead()

console.log(cqueue)
// CQueue { inStack: [], outStack: [2] }
