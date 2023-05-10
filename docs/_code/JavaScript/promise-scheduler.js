class Scheduler {
  constructor(limit) {
    this.taskQueue = []
    this.limit = limit
    this.running = 0
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.taskQueue.push(() => task().then(resolve).catch(reject))
      this.schedule()
    })
  }

  taskStart() {
    for (let i = 0; i < this.limit; i++) {
      this.request()
    }
  }

  schedule() {
    while (
      this.running < this.limit &&
      this.taskQueue.length > 0
    ) {
      const task = this.taskQueue.shift()
      task().finally(() => {
        this.running--
        this.schedule()
      })
      this.running++
    }
  }
}

const scheduleInstance = new Scheduler(2)
const addTask = (time, order) => {
  scheduleInstance.add(() =>
    new Promise(resolve => {
      console.log(`start ${order}`)
      setTimeout(() => {
        console.log(`end ${order}`)
        resolve()
      }, time)
    })
  )
}

/**
 * 完整执行流程：
 * 一开始1、2两个任务开始执行
 * 500ms时，2任务执行完毕，输出2，任务3开始执行
 * 800ms时，3任务执行完毕，输出3，任务4开始执行
 * 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
 * 1200ms时，4任务执行完毕，输出4
 */
addTask(1000,"1");
addTask(500,"2");
addTask(300,"3");
addTask(400,"4");
// 2, 3, 1, 4
// start 1
// start 2
// end 2
// start 3
// end 3
// start 4
// end 1
// end 4
console.log(scheduleInstance)
