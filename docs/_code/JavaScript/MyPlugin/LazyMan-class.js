class LazyManClass {
  constructor(name) {
    console.log(`Hi This is ${name}!`)
    this.name = name
    this.tasks = []
    setTimeout(() => {
      this.next()
    }, 0)
  }

  eat(food) {
    const task = () => {
      console.log(`Eat ${food}~`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }

  sleep(time) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next()
      }, time * 1000)
    }
    this.tasks.push(task)
    return this
  }

  sleepFirst(time) {
    const task = () => {
      setTimeout(() => {
        console.log(`Make up after ${time}`)
        this.next()
      }, time * 1000)
    }
    this.tasks.unshift(task)
    return this
  }

  next() {
    if (this.tasks.length > 0) {
      const task = this.tasks.shift()
      task()
    }
  }
}

function LazyMan(name) {
  return new LazyManClass(name)
}
