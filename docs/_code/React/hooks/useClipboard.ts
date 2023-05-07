import { useState } from 'react'

type CopiedValue = string | null
type CopiedFn = (text: string) => Promise<boolean>

export default function useClipboard(): [CopiedValue, CopiedFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopiedFn = async text => {
    if (!navigator?.clipboard) {
      console.warn(`Clipboard doesn't supported`);
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn(`Copied failed`, error);
      setCopiedText(null)
      return false
    }
  }

  return [copiedText, copy]
}
