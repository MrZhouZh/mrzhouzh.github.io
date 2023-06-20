---
title: React 源码阅读 - 环境准备
date: 2023-06-20
category: React
---

## React 源码阅读 - 环境准备

阅读源码之前, 先把准备工作做好~

### 下载代码

```
# --depth=1 只会下载最后一个 commit 关联的 object，下载内容更少，速度会快很多
git clone https://github.com/facebook/react.git --depth=1
```

## 安装依赖

```sh
yarn
```

安装中出现了一个问题

```sh
error /react/node_modules/gifsicle: Command failed.
Exit code: 1
Command: node lib/install.js
Arguments: 
Directory: /react/node_modules/gifsicle
Output:
⚠ connect ECONNREFUSED 0.0.0.0:443
  ⚠ gifsicle pre-build test failed
  ℹ compiling from source
  ✖ Error: Command failed: /bin/sh -c autoreconf -ivf
/bin/sh: autoreconf: command not found

    at /react/node_modules/bin-build/node_modules/execa/index.js:231:11
    at runMicrotasks (<anonymous>)
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
```


使用 `brew` 安装解决

```sh
brew install autoconf automake libtool
```

安装后重新执行 `yarn` 进行安装即可

### 参考链接

- [知乎 - 加速几十倍 git clone 速度的 --depth 1，它的后遗症怎么解决？](https://zhuanlan.zhihu.com/p/597688197)
- [众里千寻 - 阅读源码之前的准备工作](https://everfind.github.io/code-reading/react/install.html)
