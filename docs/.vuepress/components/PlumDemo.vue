<template>
  <canvas ref="el" />
</template>

<script>
export default {
  name: 'PlumDemo',
  data() {
    return {
      el: null,
      framesCount: 0,
      pendingTasks: [],
    }
  },
  computed: {
    ctx() {
      return this.el.getContext('2d');
    }
  },
  mounted() {
    this.el = this.$refs.el;
    this.init()
    this.startFrame()
  },
  methods: {
    init() {
      this.ctx.strokeStyle = '#fff5'

      this.step({
        start: { x: 0, y: 150 },
        length:  10,
        theta: -Math.PI / 5,
      })
      
    },
    frame() {
      const tasks = []
      this.pendingTasks = this.pendingTasks.filter(i => {
        if (Math.random() > 0.4) {
          tasks.push(i)
          return false
        }
        return true
      })
      tasks.forEach(fn => fn())
    },
    startFrame() {
      requestAnimationFrame(() => {
        this.framesCount += 1
        if (this.framesCount % 3 === 0) {
          this.frame()
        }
        this.startFrame()
      })
    },
    lineTo(p1, p2) {
      this.ctx.beginPath()
      this.ctx.moveTo(p1.x, p1.y)
      this.ctx.lineTo(p2.x, p2.y)
      this.ctx.stroke()
    },
    getEndPoint(b) {
      return {
        x: b.start.x + b.length * Math.cos(b.theta),
        y: b.start.y + b.length * Math.sin(b.theta)
      }
    },
    drawBranch(b) {
      this.lineTo(b.start, this.getEndPoint(b))
    },
    step(b, depth = 0) {
      const end = this.getEndPoint(b)
      this.drawBranch(b)

      if (depth < 4 || Math.random() < 0.5) {
        this.pendingTasks.push(() => this.step({
          start: end,
          length: b.length + (Math.random() * 2 - 1),
          theta: b.theta - 0.2 * Math.random(),
        }, depth + 1))
      }
      if (depth < 4 || Math.random() < 0.5) {
        this.pendingTasks.push(() => this.step({
          start: end,
          length: b.length + (Math.random() * 2 - 1),
          theta: b.theta + 0.2 * Math.random(),
        }, depth + 1))
      }
    }
  }
}
</script>

<style scoped>
  canvas {
    width: 266px;
    height: 266px;
    background-color: #000;
    border: 1px solid #000;
    transform-origin: top left;
    transform: translateX(0.5) translateY(0.5) translateZ(0);
  }
</style>
