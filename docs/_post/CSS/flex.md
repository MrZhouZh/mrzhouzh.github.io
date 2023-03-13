---
title: CSS - flex布局
date: 2023-03-13
category: CSS
---

## flex 布局基本特性

`Flexible Box` 模型(也称为flexbox)是一种一维的布局模型. 因为一个 **flexbox** 一次只能处理一个维度上的元素布局, 一行或者一列. [CSS Grid Layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout) 是另一种二维布局

> 参考: [https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)


### 两根轴线(主轴和交叉轴)

我们在使用 **flexbox** 的所有属性都跟这两根轴线有关, 所以学习和理解它是**非常**有必要的. **flexbox** 的特性是沿着主轴或者交叉轴对齐之中的元素.

#### 主轴

由 `flex-direction` 定义, 可以取四个值:

- `row` 主轴沿 **inline** 方向延伸
- `row-reverse` 主轴沿 **inline** 方向延伸
- `column` 主轴沿 **block** 排列的方向
- `column-reverse`  主轴沿 **block** 排列的方向

**inline** 方向

![flex-inline](/images/CSS/flex-inline.png)

**block** 排列方向

![flex-block](/images/CSS/flex-block.png)

#### 交叉轴

交叉轴垂直于主轴

设置为 `row` 或 `row-reverse`, 交叉轴方向沿着列向下

![cross-axis-row](/images/CSS/flex-cross-axis-row.png)

设置为 `column` 或 `column-reverse`, 交叉轴就是水平方向

![cross-axis-column](/images/CSS/flex-cross-axis-column.png)

### 起始线和终止线

**flexbox** 与 **书写模式** 的关系

如果 `flex-direction: row`, 在我书写英文时, 主轴的起始线是左边, 终止线是右边

![flex-row-start-end-line](/images/CSS/flex-row-start-end-line.png)

而在我书写阿拉伯文时, 主轴的起始线是右边, 终止线是左边

![flex-row-start-end-line-arabic](/images/CSS/flex-row-start-end-line-arabic.png)

在这两种情况下, 交叉轴的起始线是顶部, 终止线是底部.

总而言之, 用起始和终止来描述比左右更为贴切. 这对帮助理解其他相同模式的布局方法(例: CSS Grid Layout)有不小作用

### Flex 容器

文档中使用了 flexbox 的区域就称为 flex 容器. 通过设置 `display`属性值为 `flex` 或 `inline-flex`. 设置后CSS属性都会有初始值:

- 元素排列为一行 (`flex-direction` 初始值是 `row`)
- 元素从主轴起始线开始
- 元素不会在主维度方向拉伸, 但是可以缩小
- 元素被拉伸用来填充交叉轴
- [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis) 初始值是 `auto`
- [`flex-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) 初始值是 `nowrap`

### 简写属性 `flex-flow`

> `flex-flow` = `flex-direction` + `flex-wrap`

### flex 元素上的属性

- [`flex-grow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow) 

  定义元素在flex容器中分配剩余空间的相对比例. 默认值是 `0`, 取值范围 `[0, ∞]`. 以 `flex-basis` 为基础, 沿主轴方向增长尺寸

- [`flex-shrink`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink)

  定义元素的收缩规则. 

- [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)
  
  定义该元素的空间大小. 默认值是 `auto`. 给宽则定宽, 无设定则自动分配大小以充分显示内容

### Flex 属性简写

> `flex` = `flex-grow` + `flex-shrink` + `flex-basis`

大部分情况下可以采用预定义的简写形式:

- `flex: initial` 相当于 `flex: 0 1 auto`
- `flex: auto` 相当于 `flex: 1 1 auto`
- `flex: none` 设置元素不可伸缩, 但元素会按具有 `flex-basis: auto` 进行布局
- `flex: <positive-number>`, 例 `flex: 1` 相当于 `flex: 1 1 0`, `flex: 2` 相当于 `flex: 2 1 0`, 元素在 `flex-basis: 0` 基础上伸缩

### 元素间的对齐和空间分配

> Flexbox 的一个关键特性是能够设置 flex 元素沿主轴方向和交叉轴方向的对齐方式, 以及它们之间的空间分配.

#### align-items

[align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items)使元素在交叉轴方向对齐. 初始值为 `stretch`

- `stretch` 弹性项包含外边距的交叉轴尺寸被拉升至行高
- `flex-start`  元素向侧轴起点对齐
- `flex-end`  元素向侧轴终点对齐
- `center`  元素在侧轴居中

#### justify-content

[justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)使元素在主轴方向对齐. 初始值为 `flex-start`

- `stretch` 
- `flex-start` 从行首开始排列
- `flex-end`  从行尾开始排列
- `center`  向每行中点排列
- `space-around`  每行上均分元素, 每行第一个元素到行首的距离和每行最后一个元素到行尾的距离将会是相邻元素之间距离的一半
- `space-between` 每行上均分元素, 相邻距离相同, 每行第一个元素与行首对齐，每行最后一个元素与行尾对齐
- `space-evenly` 沿主轴均分元素, 相邻间距一致





