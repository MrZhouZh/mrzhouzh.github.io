/**
 * Map 实现 LRU 缓存
 */
class LRUCacheMap<K, V> {
  private cacheMap: Map<K, V>
  private readonly limit: number

  constructor(limit: number) {
    if (limit <= 0) throw new Error(`limit of cache must > 0`)
    this.limit = limit
    this.cacheMap = new Map()
  }

  public get(key: K): V | null {
    if (!this.cacheMap.get(key)) return null
    const temp = this.cacheMap.get(key)
    this.cacheMap.delete(key)
    this.cacheMap.set(key, temp)
    return temp
  }

  public put(key: K, value: V) {
    if (this.cacheMap.has(key)) {
      this.cacheMap.delete(key)
    } else if (this.cacheMap.size >= this.limit) {
      this.cacheMap.delete(this.cacheMap.keys().next().value)
    }
    this.cacheMap.set(key, value)
  }
}

const instance = new LRUCacheMap<string, number>(3)
instance.put('a', 1)
instance.put('b', 2)
instance.put('c', 3)
instance.put('d', 4)
instance.put('e', 5)
console.log(instance)
