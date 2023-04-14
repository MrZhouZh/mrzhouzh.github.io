class LifecycleComponent {
  constructor(options) {
    this.options = options;
    this._lifecycleHooks = [
      'beforeCreate',
      'created',
      'beforeMount',
      'mounted',
      'beforeUpdate',
      'updated',
      'beforeDestroy',
      'destroyed'
    ]

    this._lifecycleHooks.forEach(hook => {
      const fn = this.options[hook]
      if (typeof fn === 'function') {
        this[hook] = fn.bind(this)
      }
    })
  }

  _callHook(hook) {
    if (typeof this[hook] === 'function') {
      this[hook]()
    }
  }

  _create() {
    this._callHook('beforeCreate')
    this._callHook('created')
  }

  _mount() {
    this._callHook('beforeMount')
    this._callHook('mounted')
  }

  _update() {
    this._callHook('beforeUpdate')
    this._callHook('updated')
  }

  _destroy() {
    this._callHook('beforeDestroy')
    this._callHook('destroyed')
  }

  runLifecycle() {
    this._create()
    this._mount()
    this._update()
    this._destroy()
  }
}

// test
const myComponent = new LifecycleComponent({
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  destroyed() {
    console.log('destroyed');
  },
})

myComponent.runLifecycle()
