/**
 * 绘制虚线矩形
 * ------------------ Test ------------------
 * let scene = new Scene(container, {
 *  data: Array.from({ length: 3 }).map(() = Array.from({ length: 20 }).map((_, idx) => ({
 *    storage_no: `Camera_${idx}`,
 *    status: idx,
 *    color: 
 *  })))
 * })
 */
type Options<T> = {
  rows?: number
  columns?: number
  data?: T[][]
}

type Position = {
  x: number
  y: number
}

interface DataTypes {
  storage_no: string
  status: number
  color: string
}

export type SceneReturnType<T  extends DataTypes> = Scene<T>

class Scene<T extends DataTypes> {
  readonly container: HTMLDivElement

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number

  readonly data: T[][]

  private offset: Position = { x: 0, y: 0 } // 拖动偏移
  private curOffset: Position = { x: 0, y: 0 } // 记录上一次的偏移量
  private mousePosition: Position = { x: 0, y: 0 } // 记录鼠标滚轮点击时的坐标位置
  private maxScale = 8
  private minScale = 0.4
  private scaleStep = 0.2
  private scale = 1
  private preScale = 1

  private rows = 20
  private columns = 2
  private spotWidth = 40
  private spotHeight = 100
  private dashLineSegment = [15, 25, 16, 16] // [5, 15, 15, 5] // [8, 9, 8, 9]

  private x = 0 // 记录鼠标点击Canvas时的横坐标
  private y = 0 // 记录鼠标点击Canvas时的纵坐标

  private options: Options<T> = {
    data: [],
    rows: 20,
    columns: 2,
  }

  constructor(
    container: HTMLDivElement,
    options: Options<T>
  ) {
    const defaultOptions = {
      data: [],
      rows: 20,
      columns: 2
    }
    this.container = container
    const { width, height } = container.getBoundingClientRect()
    this.canvas = document.createElement('canvas')
    this.options = {
      ...defaultOptions,
      ...options,
    }

    this.width = width
    this.height = height
    this.setSpotRect()
    this.data = this.options.data!
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')!
    this.container.appendChild(this.canvas)
    this.rows = this.options.rows!
    this.columns = this.options.columns!

    this.onMousedown = this.onMousedown.bind(this)
    this.onMousemove = this.onMousemove.bind(this)
    this.onMouseup = this.onMouseup.bind(this)
    this.onMousewheel = this.onMousewheel.bind(this)
    this.onResize = this.onResize.bind(this)
    this.canvas.addEventListener('wheel', this.onMousewheel)
    this.canvas.addEventListener('mousedown', this.onMousedown)
    window.addEventListener('resize', this.onResize)
  }

  private setSpotRect() {
    this.spotWidth = this.width / this.rows
    this.spotHeight = this.spotWidth * 2 + 5
  }

  private onMousewheel(e: WheelEvent) {
    e.preventDefault()

    this.mousePosition.x = e.offsetX // 记录当前鼠标点击的横坐标
    this.mousePosition.y = e.offsetY // 记录当前鼠标点击的纵坐标
    if (e.deltaY < 0) {
      // 放大
      this.scale = parseFloat((this.scaleStep + this.scale).toFixed(2)) // 解决小数点运算丢失精度的问题
      if (this.scale > this.maxScale) {
        this.scale = this.maxScale
        return
      }
    } else {
      // 缩小
      this.scale = parseFloat((this.scale - this.scaleStep).toFixed(2)) // 解决小数点运算丢失精度的问题
      if (this.scale < this.minScale) {
        this.scale = this.minScale
        return
      }
    }

    this.zoom()
  }

  public zoom() {
    this.offset.x = this.mousePosition.x - (this.mousePosition.x - this.offset.x) * this.scale / this.preScale
    this.offset.y = this.mousePosition.y - (this.mousePosition.y - this.offset.y) * this.scale / this.preScale

    this.paint()
    this.preScale = this.scale
    this.curOffset.x = this.offset.x
    this.curOffset.y = this.offset.y
  }

  private onMousedown(e: MouseEvent) {
    if (e.button === 0) {
      // 鼠标左键
      this.x = e.x
      this.y = e.y
      window.addEventListener('mousemove', this.onMousemove)
      window.addEventListener('mouseup', this.onMouseup)
    }
  }

  private onMousemove(e: MouseEvent) {
    this.offset.x = this.curOffset.x + (e.x - this.x)
    this.offset.y = this.curOffset.y + (e.y - this.y)

    this.paint()
  }

  private onMouseup() {
    this.curOffset.x = this.offset.x
    this.curOffset.y = this.offset.y
    window.removeEventListener('mousemove', this.onMousemove)
    window.removeEventListener('mouseup', this.onMouseup)
  }

  private onResize() {
    const { width, height } = this.container.getBoundingClientRect()
    this.width = width
    this.height = height
    this.canvas.width = width
    this.canvas.height = height
    this.setSpotRect()
    this.ctx.clearRect(0, 0, width, height)
    this.paint()
  }

  public zoomIn() {
    this.scale += this.scaleStep
    if (this.scale > this.maxScale) {
      this.scale = this.maxScale
      return
    }
    this.mousePosition.x = this.width / 2
    this.mousePosition.y = this.height / 2
    this.zoom()
  }

  public zoomOut() {
    this.scale -= this.scaleStep
    if (this.scale < this.minScale) {
      this.scale = this.minScale
      return
    }
    this.mousePosition.x = this.width / 2
    this.mousePosition.y = this.height / 2
    this.zoom()
  }

  // 重置
  public reset () {
    this.clear()
    this.scale = 1 // 当前缩放
    this.preScale = 1 // 上一次缩放
    this.offset = { x: 0, y: 0 } // 拖动偏移
    this.curOffset = { x: 0, y: 0 } // 当前偏移
    this.mousePosition = { x: 0, y: 0 }
    this.draw()
  }

  public draw() {
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.columns; y++) {
        const storage = this.data[y][x]
        this.ctx.strokeStyle = storage.color as string;
        const posX = (x * this.spotWidth)
        const posY = (y * this.spotHeight)
        if (storage.status === 2) {
          this.ctx.setLineDash(this.dashLineSegment)
          this.ctx.lineWidth = 2
          this.ctx.strokeRect(
            posX,
            posY,
            this.spotWidth,
            this.spotHeight,
          )
          this.ctx.font = '24px'
          this.ctx.textAlign = 'center'
          this.ctx.fillStyle = '#000'
          this.ctx.fillText(`${storage.storage_no}`, posX + this.spotWidth / 2, posY + 20)
        } else {
          this.ctx.fillStyle = storage.color
          this.ctx.lineWidth = 2
          this.ctx.fillRect(
            posX + 2,
            posY + 2,
            this.spotWidth - 4,
            this.spotHeight - 4,
          )
          this.ctx.font = '24px'
          this.ctx.textAlign = 'center'
          this.ctx.fillStyle = '#000'
          this.ctx.fillText(`${storage.storage_no}`, posX + this.spotWidth / 2, posY + 20)
        }
      }
    }
  }

  public clear() {
    this.canvas.width = this.width
  }

  private paint() {
    this.clear()
    this.ctx.translate(this.offset.x, this.offset.y)
    this.ctx.scale(this.scale, this.scale)
    this.draw()
  }

  public destory() {
    this.canvas.removeEventListener('wheel', this.onMousewheel)
    this.canvas.removeEventListener('mousedown', this.onMousedown)
    window.removeEventListener('resize', this.onResize)
  }
}

export default Scene
