import { useState, useEffect } from 'react'

// debounce
export default function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debounceValue
}

