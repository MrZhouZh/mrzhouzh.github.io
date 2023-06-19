---
title: 如何自定义个人的 VS Code 代码片段
date: 2023-06-19
category: VS Code
---

## 如何自定义个人的 VS Code 代码片段

自定义个人的代码片段, 以防抖函数为例, 注册一个全局代码块

```js
function debounce(fn, wait) {
  let timeoutId
  return function(...args) {
    timeoutId && clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), wait)
  }
}
```

**Mac**:

-> `command + shift + p`

-> 输入 `snippets` 关键字进行查找, 选择 `Snippets: Configure User Snippets`

-> 选择 `New Global Snippets file`

-> 输入 snippets 名后, 例如: `debounce`

`debounce.code-snippets`

```json
{
	"debounce": {
		"scope": "javascript",
		"prefix": "debounce",
		"body": [
			"function debounce(fn, ms = 0) {",
			"  let timeoutId;",
			"  return function(...args) {",
			"    clearTimeout(timeoutId);",
			"    timeoutId = setTimeout(() => fn.apply(this, args), ms)",
			"  }",
			"}"
		],
		"description": "Log output to console"
	}
}
```

接下来就可以在任意 `js` 文件中使用了

输入 `debounce`, 就能看到提示了

![debounce snippets](/images/VSCode/snippets.png)
