---
title: Three.js 基础
date: 2023-06-30
category: WebGL
---

## Three.js 基础

**three.js 中的大小单位是米, 这是一种约定. 如果你不遵循, 那么除了物理上精确的照明以外的一切都仍然有效.** 假设你想让一个百瓦的灯泡等效真实房间中的等效灯泡相同的方式照亮房间, 则必须使用米将房间建造成正确的比例.

> 1单位 = 1米

three.js 中的灯光类分为两种类型, **默认情况下禁用阴影**:

- 直接光照, 模拟直接光照
  
  1. `DirectionalLight` => 阳光
  2. `PointLight` => 灯泡
  3. `RectAreaLight` => 条形照明或明亮的窗户
  4. `SpotLight` => 聚光灯
  
- 环境光, 这是一种廉价且可信间接照明方式

核心共四种直接光源类型


`MeshStandardMaterial` 这是一种高质量/通用/物理精确的材料, 可以使用真实世界的物理方程对光做出反应. 也就是说它应该是几乎所有情况下的首选"标准"材料.

### 三个基本转换

**平移**, **旋转**和**缩放**. `Object3D` 基类, 将派生自 `Object3D` 的类称之为*场景对象*.

### 坐标系

3D空间使用**3D 笛卡尔坐标系**来描述, 由 `X`,`Y`,`Z`轴组成, 三轴交叉于点(0,0,0)(原点). 这里最重要的两个**世界空间**和**局部空间**

**世界空间**: 当我们直接将一个对象添加到场景中, 然后平移, 缩放或旋转它时, 该对象将相对于世界空间移动--即相对于场景的中心.

**局部空间**: 添加到场景中的每个对象都有一个局部坐标系

向量: (x,y,z)有序的数字列表称之为**向量**, 因为有三个数字, 所以它是一个**3D向量**

**平移**:

```js
// translate one axis at a time
mesh.position.x = 1
mesh.position.y = 2
mesh.position.z = 3

// translate all three axis at once
mesh.position.set(1, 2, 3)

// (0,0,0) -> (1,2,3)
```

看到这里还是没有一个具象的认知, 下面来介绍坐标系相对屏幕的方向

![方向感](/images/WebGL/coordinate_system.svg)

假设没有旋转相机, 以下方向成立:

::: tip 方向具象化

- X 轴正向指向屏幕 **右侧**
- Y 轴正向指向屏幕 **上方**, 即屏幕顶部
- Z 轴正向指向屏幕 **外面**, 即指向屏幕前的你

:::

当然, 也可以旋转相机, 这种情况下, 可以将降级位置作为默认视图, 并以此推断方向.

向量可以代表各种实物, 而不仅仅是平移. 向量的数据类型分为三类:

1. 空间中的一个点
2. **坐标系内的长度和方向**
3. 没有更深的数学含义的数字列表

**缩放**:

> 并非所有对象都可以缩放. 例如, **相机和灯光**(除了`RectAreaLight`)没有大小

- **均匀缩放**: 每个轴的缩放值相同

- **非均匀缩放**: 每个轴的缩放值不同

- **负比例值镜像对象**: 小于零的缩放值除了使对象变小或变大之外, 还会镜像对象.

- **统一缩放和镜像**: 要保持起缩放比例的同时镜像对象, 对三个轴使用相同的值, 但将其中一个设为负值.

  ```js
  const mesh = new Mesh
  mesh.scale = new Vector3(1, 1, 1)
  // 缩放并在Y轴镜像
  mesh.scale.set(2, -2, 2)
  ```

**旋转**:

使用**旋转**要更加小心, 主要是因为**旋转顺序**, 这是不同于**平移**或**缩放**. three.js 使用两个数学类用于存储旋转数据. **`欧拉角(Euler)`**

**Euler**类

在 three.js 中, 创建一个新的场景对象时, 会自动创建一个 `Euler` 实例并为其赋予默认值

```js
const mesh = new Mesh()
mesh.rotation = new Euler()

mesh.rotation.x = 2
mesh.rotation.y = 2
mesh.rotation.z = 2
// or
// mesh.rotation.set(2, 2, 2)
```

`Euler.order` 来旋转顺序, 默认顺序是 `XYZ`

旋转单位是弧度, 通过`.degToRad`将读书转换为弧度

```js
import { MathUtils } from 'three'
const rads = MathUtils.degToRad(90) // 1.57079... = π/2
```

缺点:

在创建动画或进行设计旋转的数学时, 特别是我们不能将两个欧拉角相加(更著名的是存在一种叫`万向锁`的问题)

**四元数Quaternions**类

比欧拉角更难使用, 所以还是推荐坚持使用更为简单的 `Euler`类

```js
const mesh = new Mesh()
mesh.rotation = new Euler()
mesh.quaternion = new Quaternion()
```

**转换矩阵**

<!-- 
  在markdown中表示矩阵
:https://zhuanlan.zhihu.com/p/269245898

  pmatrix：小括号边框
  bmatrix：中括号边框
  Bmatrix：大括号边框
  vmatrix：单竖线边框
  Vmatrix：双竖线边框
 -->

$$\begin{pmatrix}

1 & 0 & 0 & 0 \\

0 & 1 & 0 & 0 \\

0 & 0 & 1 & 0 \\

0 & 0 & 0 & 1 \\

\end{pmatrix}$$

四行四列表示是一个 `4x4`矩阵, three.js 中处理这种类型的数学对象称为 `Matrix4`, `3x3`矩阵则称为`Matrix3`, 当矩阵在**`主对角线`**上全为1而其他地方都为0时, 称其为**`单位矩阵 I`**

**局部矩阵**

```js
const mesh = new Mesh()
mesh.matrix = new Matrix4()
mesh.position.x = 2
mesh.position.y = 4
mesh.position.z = 6
mesh.updateMatrix()
```
**平移**后存储在矩阵的前三行的最后一列中:

$$\begin{pmatrix}

1 & 0 & 0 & 2 \\

0 & 1 & 0 & 4 \\

0 & 0 & 1 & 6 \\

0 & 0 & 0 & 1 \\

\end{pmatrix}$$

**缩放**

```js
mesh.scale.x = 5
mesh.scale.y = 7
mesh.scale.z = 9
mesh.updateMatrix()
```

这时候缩放比例值存储在主对角线上

$$\begin{pmatrix}

5 & 0 & 0 & 2 \\

0 & 7 & 0 & 4 \\

0 & 0 & 9 & 6 \\

0 & 0 & 0 & 1 \\

\end{pmatrix}$$

公式表示则是:

$$\begin{pmatrix}

Sx & 0 & 0 & Tx \\

0 & Sy & 0 & Ty \\

0 & 0 & Sz & Tz \\

0 & 0 & 0 & 1 \\

\end{pmatrix}$$

重置位置和缩放

```js
mesh.position.set(0,0,0)
mesh.scale.set(0,0,0)
mesh.updateMatrix()
```

尝试围绕 X 轴旋转 30°

```js
mesh.rotation.x = MathUtils.degToRad(30)
mesh.updateMatrix()
```

$$

\begin{pmatrix}

1 & 0 & 0 & 0 \\

0 & 0.866... & 0.5... & 0 \\

0 & -0.5... & 0.866... & 0 \\

0 & 0 & 0 & 1 \\

\end{pmatrix}

$$

其中的一些数字可以做数学等式:

$$

\begin{aligned}

& \cos(30)=0.866...\\

& \sin(30)=0.5\\

\end{aligned}

$$

原生JS计算公式:

```js
const toRadians = (deg) => deg * (Math.PI / 180)
Math.cos(toRadians(30)) 
```

实际上:

$$

X-Rotation=

\begin{pmatrix}

1 & 0 & 0 & 0 \\

0 & cos(30) & sin(30) & 0 \\

0 & -sin(30) & cos(30) & 0 \\

0 & 0 & 0 & 1 \\

\end{pmatrix}

$$

总结各轴的旋转公式为:

::: details 折叠

$$

X-Rotation=

\begin{pmatrix}

1 & 0 & 0 & 0 \\

0 & cos(Rx) & sin(Rx) & 0 \\

0 & -sin(Rx) & cos(Rx) & 0 \\

0 & 0 & 0 & 1 \\

\end{pmatrix}
$$

$$

Y-Rotation=

\begin{pmatrix}

cos(Ry) & 0 & sin(Ry) & 0 \\

0 & 1 & 0 & 0 \\

-sin(Ry) & 0 & cos(Ry) & 0 \\

0 & 0 & 0 & 1 \\

\end{pmatrix}
$$

$$

Z-Rotation=

\begin{pmatrix}

cos(Rz) & -sin(Rz) & 0 & 0 \\

sin(Rz) & cos(Rz) & 0 & 0 \\

0 & 0 & 1 & 0 \\

0 & 0 & 0 & 1 \\

\end{pmatrix}

$$

:::


### 纹理

**UV映射**

将二维纹理映射到三维几何体的一种方法. 公式如下

$$

(u, v) -> (x, y, z)

$$

`(u,v)` 表示纹理上的一个点, 而`(x,y,z)`表示几何体上的一个点, 在局部空间中定义. 从技术上讲, 几何体上的一个点称为定点`vertex`.

![uv映射示意图](/images/WebGL/geometry_uv_map.svg)

如图:

> 请注意, 点(0.5,0.5)没有映射, 纹理的中心. 只有纹理的角落被映射到立方体的八个角上, 其余的点是从中'猜测'出来的. three.js 中几何体都内置了UV映射.

$$

(0,1) -> (-1,1,1)

$$

<!-- TODO: Vuepress 支持数学公式 -->
