(function(global) {
  'use strict';
  var LazyMan = function(name) {
    return new LazyMan.prototype.init(name)
  }

  LazyMan.prototype.init = function(name) {
    console.log(`Hi This is ${name}!`)
    this.name = name
    this.tasks = []
    setTimeout(() => {
      this.next()
    }, 0)
  }

  LazyMan.prototype.eat = function(food) {
    const task = () => {
      console.log(`Eat ${food}~`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }

  LazyMan.prototype.sleep = function(time) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next()
      }, time * 1000)
    }
    this.tasks.push(task)
    return this
  }
  
  LazyMan.prototype.sleepFirst = function(time) {
    const task = () => {
      setTimeout(() => {
        console.log(`Make up after ${time}`)
        this.next()
      }, time * 1000)
    }
    this.tasks.unshift(task)
    return this
  }
  
  LazyMan.prototype.next = function() {
    if (this.tasks.length > 0) {
      const task = this.tasks.shift()
      task()
    }
  }

  LazyMan.prototype.init.prototype = LazyMan.prototype
  
  global.$$LazyMan = global.LazyMan = LazyMan
})(this || window)
