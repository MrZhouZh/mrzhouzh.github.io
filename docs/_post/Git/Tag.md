---
title: git tag 操作
date: 2023-09-07
category: Git
---

## git tag 操作

```sh
# 新建标签
git tag v1.0
# 推送至远端
git push origin v1.0

# 修改 tag
git checkout -b update/v1.0 v1.0
git add .
git commit -m 'chore: updated something'
git push origin update/v1.0
git checkout main
git merge update/v1.0
git push origin main
git push origin -d v1.0
git tag -d v1.0
git tag v1.0
git push origin v1.0
```

### 总结

创建 tag

```sh
git tag [tagName]

# 在具体某个 commitID 上新建tag
git tag [tagName] [commitID]
```

推送至远端

```sh
git tag 
```

删除 tag

```sh
# 本地
git tag -d [tagName]
# 远端
git push origin -d [tagName]
```

想要修改 tag, 则需要新建分支进行修改, 合并主分支, 再删除原有的tag, 再创建tag进行推送

> 新建分支 -> 合并主分支 -> 删除需要修改的tag -> 新建这个tag -> 推送远端
