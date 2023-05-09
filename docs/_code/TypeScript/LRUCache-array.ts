/**
 * Map 实现 LRU 缓存
 */
type CacheItem<K, V> = { key: K, value: V }

class LRUCacheArray<K, V> {
  private cacheMap: CacheItem<K, V>[]
  private readonly limit: number

  constructor(limit: number) {
    if (limit <= 0) throw new Error(`limit of cache must > 0`)
    this.limit = limit
    this.cacheMap = []
  }

  public get(key: K): V | null {
    const index = this.findCacheIndex(key)
    if (index === -1) return null
    const temp = this.cacheMap[index].value
    this.cacheMap.splice(index, 1)
    this.cacheMap.unshift({
      key,
      value: temp
    })
    return temp
  }

  public put(key: K, value: V) {
    const index = this.findCacheIndex(key)
    if (index > -1) {
      this.cacheMap.splice(index, 1)
    } else if (this.cacheMap.length >= this.limit) {
      this.cacheMap.pop()
    }
    this.cacheMap.unshift({
      key,
      value
    })
  }

  private findCacheIndex(key: K): number {
    return this.cacheMap.findIndex(cache => cache.key === key)
  }
}

const instanceArr = new LRUCacheArray<string, number>(3)
instanceArr.put('a', 1)
instanceArr.put('b', 2)
instanceArr.put('c', 3)
instanceArr.put('d', 4)
instanceArr.put('e', 5)
console.log(instanceArr)
