import { ChangeEvent, useState, useEffect } from 'react'
import useThrottle from '../useThrottle'

export default function DebounceDemo() {
  const [value, setValue] = useState<string>('')
  const throttledValue = useThrottle<string>(value)

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)
  }

  useEffect(() => {
    // request api data...
    // do something when 'throttledValue' changed. 
    console.log('throttledValue has changed.')
  }, [throttledValue])

  return (
    <div className='container'>
      Input: <input value={value} onChange={onChange} />
      <p>Throttled value: {throttledValue}</p>
    </div>
  )
}
