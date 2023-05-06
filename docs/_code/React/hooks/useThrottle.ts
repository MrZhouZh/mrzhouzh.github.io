import { useState, useRef, useEffect } from 'react'

export default function useThrottle<T>(value: T, delay: number = 300): T {
  const [throttleValue, setThrottleValue] = useState<T>(value)
  const lastExecuted = useRef<number>(Date.now())

  useEffect(() => {
    if (Date.now() - lastExecuted.current >= delay) {
      lastExecuted.current = Date.now()
      setThrottleValue(value)
    } else {
      const timer = setTimeout(() => {
        lastExecuted.current = Date.now()
        setThrottleValue(value)
      }, delay);

      return () => clearTimeout(timer)
    }
  }, [value, delay])

  return throttleValue
}
