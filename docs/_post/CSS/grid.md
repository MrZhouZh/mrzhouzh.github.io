---
title: CSS - grid 布局
date: 2023-05-19
category: CSS
---

## CSS - grid 布局

> 基本概念: 网格是一组相交的水平线和垂直线，它定义了网格的列和行. 将网格元素放置在与这些行和列相关的位置上, 这就是 grid 布局.

具体的用法可以参考下方链接. 这里我将列举一些常见的基础布局

- 九宫格布局

<iframe
  src="https://codesandbox.io/embed/css-grid-layout-ist5dd?autoresize=1&fontsize=14&hidenavigation=1&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="CSS-Grid-Layout"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

::: details 点击查看代码
```html
<div class="wrapper">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
  <div class="box">6</div>
  <div class="box">7</div>
  <div class="box">8</div>
  <div class="box">9</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2px 2px;
}
```

:::

- 三列响应式布局

<iframe src="https://codesandbox.io/embed/css-grid-layout-ist5dd?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Fresponsive-three-columns.html&module=%2Fresponsive-three-columns.html&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="CSS-Grid-Layout"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

::: details 点击查看代码
```css
.header {
  grid-area: header;
}

.content {
  grid-area: content;
}

.nav {
  grid-area: nav;
}

.sidebar {
  grid-area: sidebar;
}

.ad {
  grid-area: ad;
}

.footer {
  grid-area: footer;
}

.container {
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    "header"
    "nav"
    "content"
    "sidebar"
    "ad"
    "footer";
}
```

:::

- 仿 [dribble](https://dribbble.com/) 网站的图片响应布局

<iframe src="https://codesandbox.io/embed/css-grid-layout-ist5dd?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Ffake-dribble-responsible.html&module=%2Ffake-dribble-responsible.html&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="CSS-Grid-Layout"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>


::: details 点击查看代码

```css
.shot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-gap: 32px;
}
```

:::

### 参考资料

- [阮一峰 - CSS Grid 网格布局教程](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
- [MDN - 网格布局的基本概念](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
