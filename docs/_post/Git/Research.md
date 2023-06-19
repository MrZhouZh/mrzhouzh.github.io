---
title: git 内部实现 - git objects
date: 2023-06-19
category: Git
---

## Git objects

git 内部实现 - git objects

### git 添加暂存区

> git hash-object -w [filename]

`f761ec192d9f0dca3329044b96ebdb12839dbff6`

其中 `f7` 是目录名, 剩余的则是文件名

查看内容可通过以下命令

> git cat-file -p [hash]

查看存储文件类型可通过 `-t`

> git cat-file -t [hash]

在这里可以用一个真实的案例来查看, React 开源项目, 在根目录下执行

> git cat-file -p main^{tree}

可以看到第二列就是object类型, 存在 `tree` | `blob` | 'commit'

放置暂存区 `update-index`

> git update-index --add --cacheinfo 100644 [hash] [filename]

100644 是文件模式

| 编号 | 含义
| - | - 
| 100644 | 普通文件
| 100755 | 可执行文件
| 120000 | 符号链接文件

执行后可以在 `.git` 文件夹下看到 `index` 文件, 暂存区的内容就是存放在这

执行 `write-tree` 写入版本库

> git write-tree

这个命令返回一个hash, .git/objects 下多了一个 object

d0dd36bd931a9cc77430815f3533c4a36ab92e8d

通过 `cat-file -t` 查看类型, 可以看到是个 tree 对象

### git 提交

> echo 'message' | git commit-tree [hash]

## git 创建分支/tag

> git update-ref refs/heads/[branch-name] [commit-id]

### hash 生成算法

```js
const  crypto = require('crypto')

function hash(content) {
  const sha1 = crypto.createHash('sha1')
    sha1.update(content)
  return sha1.digest('hex')
}

console.log(hash('blob 3\0aaa'))
```

### 相关命令

| 含义 | old | new | 完整示例
| - | - | - | -
| 查看文件 | `cat-file` | - | -
| 添加暂存 | `hash-object` | `add` | -
| 提交信息 | `commit-tree` | `commit` | -
| 新增分支/tag | `update-ref` | - | -

### 参考资料

- [理解了这3个object, 你甚至能自己写个git!](https://mp.weixin.qq.com/s/FNrFXgp1uqobMcuPjo5mvA)

- [10.2 Git Internals - Git Objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects)
