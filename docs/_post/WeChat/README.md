---
title: 微信开发
date: 2023-04-29
category: WeChat
---

## 微信开发

记录微信开发中的问题和技巧

### 小程序开发

技巧和问题

#### 问题

1. 设置了 `tabBar.list` 页面未展示?

这个问题属实有点坑~~

我的默认首页是 `pages/index/index`, 我设置的 `tabBar.list` 如下:

```json
{
  ...
  "tabBar": {
    "list": [
      {
        "text": "xxx",
        "pagePath": "pages/main/main",
        "iconPath": "images/xxx.png",
        "selectedIconPath": "images/xxx.png"
      },
      ...
    ]
  }
}
```

其实这个问题就在于, list和当前的路由不匹配

- 当前路由: `/pages/index/index`
- `tabBar.list` 中不包含这个当前路由

2. 图片路径拼接变量

wxml 貌似不支持字符串模板的方式. 只能采用原始的字符串拼接方式

```wxml
<view>
  <image class="box-img" src="{{'../../images/' + foo + '.png'}}" />
</view>
```

3. `bindtap` 事件绑定回调参数只有 `event`, 不能额外进行传参

想要传自定义参就在element上给个自定义属性

```wxml
<view
  class="box"
  wx:for="{{list}}"
  wx:key="index"
  data-index="{{index}}"
  bindtap="onClick"
>{{item.txt}}</view>
```

逻辑层调用:

```ts
Page({
  onClick(e: BaseEvent) {
    const index = e.target.dataset.index
    console.log(index)
    // do something...
  }
})
```

3. TypeScript 事件 event 声明类型

有时候搞不清小程序中的 event 如何去声明类型. 请前往 `项目根目录/typings/types/wx/lib.wx.event.d.ts` 文件下进行查找. 或者也可在线上进行查询: [`wechat-miniprogram/api-typings`](https://github.com/wechat-miniprogram/api-typings/blob/master/types/wx/lib.wx.event.d.ts)

*To Be Continued...*
