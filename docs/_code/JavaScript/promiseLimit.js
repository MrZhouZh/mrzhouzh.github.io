/**
 * 使用一个队列来存储尚未执行的任务，
 * 并在当前运行任务的数量达到限制时等待。
 * 在任务完成时，将从队列中获取并执行下一个任务
 * @param {function} fn 
 * @param {number} limit 
 * @returns {(...args: any[]) => Promise<any>}
 */
function promiseLimit(fn, limit) {
  const queue = []
  let activeCount = 0

  function next() {
    activeCount--
    if (queue.length > 0) {
      queue.shift()()
    }
  }

  function run(fn) {
    activeCount++
    fn().then(next)
  }

  return function (...args) {
    return new Promise(resolve => {
      const task = () => fn(...args).then(resolve)
      if (activeCount < limit) {
        run(task)
      } else {
        queue.push(() => run(task))
      }
    })
  }
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

const pDelay = promiseLimit(delay, 2);
pDelay(1000).then(() => console.log(1));
pDelay(2000).then(() => console.log(2));
pDelay(3000).then(() => console.log(3));
pDelay(4000).then(() => console.log(4));
