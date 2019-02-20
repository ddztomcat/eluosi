export class ProgressBar {
  domElement: HTMLDivElement
  context: CanvasRenderingContext2D
  percentComplete: number
  cornerRadius: number
  background: CanvasRenderingContext2D
  foreground: CanvasRenderingContext2D
  LEFT: number = 0
  TOP: number = 0
  RIGHT: number
  BOTTOM: number
  constructor(
    readonly width: number,
    readonly height: number,
    strokeStyle: string,
    beforFillStyle: string,
    afterFillStyle: string
  ) {
    this.domElement = document.createElement('div')
    let t = <CanvasRenderingContext2D>(
      document.createElement('canvas').getContext('2d')
    )
    this.context = t
    this.cornerRadius = height / 2
    this.RIGHT = this.LEFT + this.cornerRadius * 2 + width
    this.BOTTOM = this.TOP + height
    this.domElement.appendChild(this.context.canvas)
    this.context.canvas.width = width + height
    this.context.canvas.height = height
    this.percentComplete = 0

    this.background = <CanvasRenderingContext2D>(
      document.createElement('canvas').getContext('2d')
    )
    this.foreground = <CanvasRenderingContext2D>(
      document.createElement('canvas').getContext('2d')
    )
    this.background.globalAlpha = 0.3
    this.background.canvas.width = width + height
    this.background.canvas.height = height
    this.foreground.canvas.width = width + height
    this.foreground.canvas.height = height
    this.drawToBuffer(this.background, strokeStyle, afterFillStyle)
    this.drawToBuffer(this.foreground, strokeStyle, beforFillStyle)
  }

  drawToBuffer(
    context: CanvasRenderingContext2D,
    strokeStyle: string,
    fillStyle: string
  ) {
    context.save()
    context.fillStyle = fillStyle
    context.strokeStyle = strokeStyle
    context.beginPath()
    context.moveTo(this.LEFT + this.cornerRadius, this.TOP)
    context.lineTo(this.RIGHT - this.cornerRadius, this.TOP)
    context.arc(
      this.RIGHT - this.cornerRadius,
      this.TOP + this.cornerRadius,
      this.cornerRadius,
      -Math.PI / 2,
      Math.PI / 2
    )
    context.lineTo(
      this.LEFT + this.cornerRadius,
      this.TOP + this.cornerRadius * 2
    )
    context.arc(
      this.LEFT + this.cornerRadius,
      this.TOP + this.cornerRadius,
      this.cornerRadius,
      Math.PI / 2,
      -Math.PI / 2
    )
    context.fill()
    let gradient = context.createLinearGradient(
      this.LEFT,
      this.TOP,
      this.LEFT,
      this.BOTTOM
    )
    gradient.addColorStop(0, 'rgba(255,255,255,0.4)')
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)')
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.5)')
    gradient.addColorStop(1, 'rgba(255,255,255,0.1)')
    context.fillStyle = gradient
    context.fill()
    context.lineWidth = 0.4
    context.stroke()

    context.restore()
  }

  draw(percent: number) {
    this.erase()
    this.context.drawImage(this.background.canvas, 0, 0)
    if (percent > 0) {
      this.context.drawImage(
        this.foreground.canvas,
        0,
        0,
        this.foreground.canvas.width * (percent / 100),
        this.foreground.canvas.height,
        0,
        0,
        this.foreground.canvas.width * (percent / 100),
        this.foreground.canvas.height
      )
    }
  }

  erase() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    )
  }
}
