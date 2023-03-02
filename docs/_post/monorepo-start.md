---
title: monorepo 入门
date: 2023-02-23
---

## pnpm + vite + monorepo 最佳实践

使用 `pnpm` + `vite` 创建 monorepo 项目. [项目代码示例](https://github.com/MrZhouZh/monorepo-demo)

### 第一步: **创建目录**

```sh
# 项目文件夹
mkdir monorepo-demo && cd monorepo-demo

# 初始化 package.json
pnpm init

# 创建 packages 文件夹
mkdir packages

# 创建 `pnpm-workspace.yaml` 文件
touch pnpm-workspace.yaml
```

[`pnpm-workspace.yaml`](https://pnpm.io/pnpm-workspace_yaml) 写入以下内容

```yaml
packages:
  - 'packages/*'
```

### 创建子项目

```sh
cd packages
npm init vite vue-demo1
npm init vite vue-demo2
```

#### 精简子项目的 `package.json`, 其余项不需要, 只要保留以下内容即可(因为都是选择 `vue` 作为基础依赖)

```json
{
  "name": "vue-demo1",
  "private": true,
  "version": "0.0.0"
}
```

### 将公共依赖抽离到公共配置(`root/package.json`), 并新增 `scripts` 启动子项目

```json
{
  "name": "monorepo-demo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev:vue-demo1": "vite packages/vue-demo1",
    "dev:vue-demo2": "vite packages/vue-demo2"
  },
  "license": "ISC",
  "dependencies": {
    "vue": "^3.2.45"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.0.0",
    "typescript": "^4.9.3",
    "vite": "^4.1.0",
    "vue-tsc": "^1.0.24"
  },
  "engines": {
    "node": ">=14",
    "pnpm": ">=7"
  }
}
```

### 根目录下安装依赖, 并启动项目

```sh
# 安装
pnpm i

# 启动
pnpm run dev:vue-demo1
pnpm run dev:vue-demo2
```

### 注意项和要点

一些实用技巧

#### 局部安装依赖

两种方式局部安装

1. 进入指定目录下去安装

```sh
cd vue-demo1 && pnpm i unocss
```

2. `--filter` 进行安装

```sh
pnpm i unocss --filter vue-demo1
```

### 全局安装 (`-W`)

```sh
# -W 参数
pnpm i unocss -W
```

## 关联 sub-package



创建工具函数包 `root/libs/core`

`package.json`

```json
{
  "name": "@libs/core",
  "private": true,
  "version": "1.0.0"
}
```

`index.ts`

```ts
export function add(a: number, b: number): number {
  return a + b
}
```

安装在 `vue-demo1` 依赖中

```sh
pnpm i @libs/core -F vue-demo1
```

然后查看 `packages/vue-demo1/package.json`

```json
{
  "dependencies": {
    "@libs/core": "workspace:*",  // * 代表默认同步最新版本, 正常情况下应该是 ^1.0.0
  }
}
```

最后就能愉快的用上工具函数~

```ts
import { add } from '@libs/core'

console.log(add(1, 2))
```


## 运行 sub-package 的命令(scripts)

根目录关联子包的命令

`root/package.json`

```json
{
  "scripts": {
    "dev:vue-demo": "pnpm -F vue-demo dev"
    "build:vue-demo": "pnpm -F vue-demo build"
  }
}
```

`packages/vue-demo/package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build"
  }
}
```

