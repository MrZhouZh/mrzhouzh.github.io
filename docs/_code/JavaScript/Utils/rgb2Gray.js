/*
 * refs: https://www.jb51.net/article/106371.htm
 * 灰度算法
 * 1. 浮点算法: Gray = R * 0.299 + G * 0.587 + B * 0.114
 * 2. 整数算法: Gray = (R * 299 + G * 587 + B * 114 + 500) / 1000
 * 3. 移位算法：Gray = (R * 28 + G * 151 + B * 77) >> 8
 * 4. 平均值法：Gray =（ R + G + B）/ 3
 * 5. 仅取绿色：Gray = G
 */
function convertRgb2Gray() {
  let canvas,
    ctx,
    imageData

  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const { data } = imageData
  for (let i = 0; i < data.length; i += 4) {
    const gray = rgb2Gray(data[i], data[i + 1], data[i + 2])
    [data[i], data[i + 1], data[i + 2], data[i + 3]] = [gray, gray, gray, data[i + 3]]
  }
  ctx.putImageData(imageData, 0, 0)
}

// 转化
function rgb2Gray(r, g, b) {
  let gray
  // 浮点算法: Gray = R * 0.299 + G * 0.587 + B * 0.114
  gray = r * 0.299 + g * 0.587 + b * 0.114
  // 整数算法: Gray = (R * 299 + G * 587 + B * 114 + 500) / 1000
  // gray = (r * 299 + g * 587 + b * 114 + 500) / 1000
  // 移位算法：Gray = (R * 28 + G * 151 + B * 77) >> 8
  // gray = (r * 28 + g * 151 + b * 77) >> 8
  // 平均值法：Gray =（ R + G + B）/ 3
  // gray = (r + g + b) / 3
  // 仅取绿色：Gray = G
  // gray = g
  return gray
}
