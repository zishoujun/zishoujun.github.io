const canvas = document.createElement('canvas')

canvas.style = `
  border:1px solid #333;
`
document.body.appendChild(canvas)



const ctx = canvas.getContext('2d', {
  willReadFrequently: true
})


function init() {
  const img = new Image()
  img.src = "xin.png"
  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
  }
}
init()


canvas.addEventListener('click', (e) => {
  const x = e.offsetX, y = e.offsetY;
  // 去除点击图片周围的颜色
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  console.log('imgData', imgData)

  const clickColor = getColor(x, y, imgData.data)
  const greenColor = [0, 255, 0, 255]

  // 用一个栈来保存需要改变颜色的坐标
  const stack = []
  stack.push([x, y])

  while (stack.length > 0) {
    const [x, y] = stack.pop()
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
      continue
    }
    const color = getColor(x, y, imgData.data)
    if (!diff(color, clickColor)) {
      continue
    }
    if (diff(color, greenColor) === 0) {
      continue
    }
    const i = point2Index(x, y)
    imgData.data.set(greenColor, i)
    stack.push([x + 1, y])
    stack.push([x - 1, y])
    stack.push([x, y + 1])
    stack.push([x, y - 1])
  }

  // 更新图片数据
  ctx.putImageData(imgData, 0, 0)
})

function point2Index(x, y) {
  const index = (y * canvas.width + x) * 4
  return index
}

function getColor(x, y, imgData) {
  const i = point2Index(x, y)
  return [
    imgData[i],
    imgData[i + 1],
    imgData[i + 2],
    imgData[i + 3],
  ]
}


function diff(clr1, clr2) {
  if (Math.abs(clr1[0] - clr2[0]) > 20) {
    return false
  }
  if (Math.abs(clr1[1] - clr2[1]) > 20) {
    return false
  }
  if (Math.abs(clr1[2] - clr2[2]) > 20) {
    return false
  }
  if (Math.abs(clr1[3] - clr2[3]) > 20) {
    return false
  }
  return true
}