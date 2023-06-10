function rearrange<T>(items: T[], threshold: number = 10): T[] {
  const mapping: { [index: number]: number } = {
    0: 0,
    2: 1,
    4: 2,
    6: 3,
    8: 4,
    1: 5,
    3: 6,
    5: 7,
    7: 8,
    9: 9
  }

  if (items.length >= threshold) {
    return items
      .slice(0, threshold)
      .map<T>((_, index, arr) => arr[mapping[index]])
      .concat(items.slice(threshold))
  }

  return items
}

console.log('rearrange -- ', rearrange([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))
// "rearrange -- ",  [1, 6, 2, 7, 3, 8, 4, 9, 5, 10, 11, 12] 
