import { ChangeEvent, useState, useEffect } from 'react'
import useDebounce from '../useDebounce'

export default function DebounceDemo() {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)
  }

  useEffect(() => {
    // request api data...
    // do something when 'debouncedValue' changed. 
  }, [debouncedValue])

  return (
    <div className='container'>
      <p>Value real-time: {value}</p>
      <p>Debounced value: {debouncedValue}</p>

      <input type="text" value={value} onChange={handleChange} />
    </div>
  )
}
