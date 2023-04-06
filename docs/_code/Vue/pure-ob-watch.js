const handlers = new Map()

function ob(data) {
  return new Proxy(data, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      if (handlers.has(key)) {
        handlers.get(key).forEach(handler => handler(value))
      }
      return result
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)
      if (handlers.has(key)) {
        handlers.get(key).forEach(handler => handler(undefined))
      }
      return result
    }
  })
}

function watch(handler) {
  const observedKeys = new Set()
  const observe = (key, handler) => {
    if (!handlers.has(key)) {
      handlers.set(key, new Set())
    }
    handlers.get(key).add(handler)
  }

  const unobserve = (key, handler) => {
    if (handlers.has(key)) {
      handlers.get(key).delete(handler)
    }
  }

  const observeAll = () => {
    Object.keys(data).forEach(key => {
      observe(key, handler)
      observedKeys.add(key)
    })
  }

  const unobserveAll = () => {
    observedKeys.forEach(key => {
      unobserve(key, handler)
    })

    observedKeys.clear()
  }

  observeAll()

  return {
    observe,
    unobserve,
    observeAll,
    unobserveAll,
  }
}

const data = ob({ count: 0, foo: 'test' })

watch(() => {
  console.log('watch-count', data.count);
});

watch(() => {
  console.log('watch-foo', data.foo);
});

data.count += 1;
console.log('showcount', data.count);
delete data.count;
data.foo = 'test2';

// watch-count 1
// watch-foo test
// showcount 1
// watch-count undefined
// watch-foo test
// watch-count undefined
// watch-foo test2
