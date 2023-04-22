/**
 * 消除异步的传染性
 * @refs: https://juejin.cn/post/7223937161707716669
 */
function getUser() {
  return fetch('https://jsonplaceholder.typicode.com/users/1')
}

function m1() {
  return getUser()
}

function m2() {
  return m1()
}

function m3() {
  return m2()
}

function main() {
  const res = m3()
  console.log('res', res)
}

function run(fn) {
  const cache = []
  let i = 0
  const _originalFetch = window.fetch
  window.fetch = (...args) => {
    if (cache[i]) {
      if (cache[i].status === 'fulfilled') {
        return cache[i].data
      } else if (cache[i].status === 'rejected') {
        throw cache[i].err
      }
    }
    const result = {
      status: 'pending',
      data: null,
      err: null
    }
    cache[i++] = result
    const promise = _originalFetch(...args)
      .then(res => res.json())
      .then(
        res => {
          result.status = 'fulfilled'
          result.data = res
        },
        err => {
          result.status = 'rejected'
          result.err = err
        }
      )
      throw promise
  }

  try {
    fn()
  } catch (err) {
    if (err instanceof Promise) {
      const reRun = () => {
        i = 0
        fn()
      }
      err.then(reRun, reRun)
    }
  }
}

run(main)

// {
//   id: 1,
//   name: "Leanne Graham",
//   username: "Bret",
//   email: "Sincere@april.biz",
//   address: {
//     street: "Kulas Light",
//     suite: "Apt. 556",
//     city: "Gwenborough",
//     zipcode: "92998-3874",
//     geo: {
//       lat: "-37.3159",
//       lng: "81.1496",
//     },
//   },
//   phone: "1-770-736-8031 x56442",
//   website: "hildegard.org",
//   company: {
//     name: "Romaguera-Crona",
//     catchPhrase: "Multi-layered client-server neural-net",
//     bs: "harness real-time e-markets",
//   },
// }
