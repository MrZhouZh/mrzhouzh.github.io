---
title: React 相关
date: 2023-08-08
category: React
---

## React 相关

- [Antd 优雅封装组件](https://codesandbox.io/p/sandbox/vite-antd-use-5ywkdx)

::: details 点击查看示例

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);border-radius:2px;" width="100%" height="450" src="https://codesandbox.io/p/sandbox/vite-antd-use-5ywkdx?embed=1" allowfullscreen></iframe>

:::

::: details 基础封装

```tsx
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { Modal } from "antd"

export type ModalPayload = {
  onOk?: () => void
  onCancel?: () => void
}

export interface ModalProps {
  show: (payload: ModalPayload) => void
}

const TestModal = forwardRef<ModalProps>((_props, ref) => {
  const [open, setOpen] = useState(false)
  const payloadRef = useRef<EStockOrderModalPayload>({})

  useImperativeHandle(
    ref,
    () => ({
      show(payload) {
        payloadRef.current = payload
        setOpen(true)
      },
    })
  )

  const wrapWithClose = (method?: () => void) => () => {
    setOpen(false)
    if (method) {
      method()
    }
  }

  return (
    <>
      <Modal
        open={open}
        onOk={wrapWithClose(payloadRef.current.onOk)}
        onCancel={wrapWithClose(payloadRef.current.onCancel)}
        closable={false}
      >
        <div>123123213</div>
      </Modal>
    </>
  )
})

TestModal.displayName = 'TestModal'
export default TestModal
```

## 待学

- [ ] HOC 高阶组件(Class/Function Component)

- [ ] useMemo 缓存进阶
