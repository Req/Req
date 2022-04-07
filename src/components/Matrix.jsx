import { useRef, useEffect } from "react"

const set = "Potatotomato"
let pointer = -1
const getChar = () => {
  pointer++
  if (pointer >= set.length) {
    pointer = 0
  }
  return set[pointer]
}

const drawChar = (color, x, y, char, maxWidth, ctx) => {
  ctx.fillStyle = color
  ctx.fillText(char, x, y, maxWidth)
}

class Worm {
  constructor(x, ctx, canvas) {
    this.ctx = ctx
    this.canvas = canvas
    this.x = x
    this.init(Math.random())
  }

  // This reuses random just as a micro-optimization
  init(random) {
    this.y = Math.ceil(random * this.canvas.height) - 100
    this.fontSize = 3 + Math.ceil(random * 45)
    this.chars = []

    const charCount = 2 + Math.ceil(random * 10)
    for (let i = 0; i < charCount; i++) {
      this.chars.push(getChar())
    }
  }

  drawChars() {
    this.ctx.font = this.fontSize + "px monospace" // default 10px sans-serif
    this.ctx.beginPath()
    const random = Math.random()
    let y = (this.y += this.fontSize)
    if (y > window.innerHeight + 500) {
      this.init(random)
      this.y = -400
      y = this.y
    }
    this.chars.forEach((char, i) => {
      let localY = y + this.fontSize * i
      if (i === 0) {
        drawChar("#002200", this.x, localY, char, this.fontSize, this.ctx)
      } else if (i === 1) {
        drawChar("#005500", this.x, localY, char, this.fontSize, this.ctx)
      } else if (i === this.chars.length - 1) {
        drawChar("#99FF99", this.x, localY, char, this.fontSize, this.ctx)
      } else {
        drawChar("#00CC00", this.x, localY, char, this.fontSize, this.ctx)
      }
    })
    this.chars = this.chars.slice(1)
    this.chars.push(getChar())
  }
}

function Matrix() {
  const canvasElement = useRef()

  useEffect(() => {
    /** @type {HTMLCanvasElement} */
    const canvas = canvasElement.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    /** @type {CanvasRenderingContext2d} */
    const ctx = canvas.getContext("2d")

    // setup lanes
    const laneSpacing = canvas.width / 10
    const halfLaneSpacing = laneSpacing / 2
    const lanes = []
    for (let i = 0; i < 10; i++) {
      const x = laneSpacing * i + halfLaneSpacing
      lanes.push({ worm: new Worm(x, ctx, canvas) })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      lanes.forEach(lane => lane.worm.drawChars())
      setTimeout(() => requestAnimationFrame(animate), 50)
    }
    animate()
  })

  return <canvas ref={canvasElement} id="target"></canvas>
}

export default Matrix
