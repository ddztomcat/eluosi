import { Game } from './game'
import { GameTime } from './type'
export interface SquarePosition {
  x: number
  y: number
  bold: number
}
export class EluosiGame extends Game {
  translateDelta: number = 0.025
  translateOffset: number = 0
  SUN_TOP: number = 110
  SUN_LEFT: number = 450
  SUN_RADIUS: number = 80
  SQUARE_LENGTH: number = 10
  GAP: number = 6

  SQUARE_WEIGHT: number
  SQUARE_HEIGHT: number
  squareArr: Array<Array<SquarePosition>> = []

  SQUARE_FILL_STYLE: string = '#879372'
  SQUARE_STROKE_STYLE: string = '#9ead86'
  SQUARE_PADDING: number = 4
  SQUARE_BOLD: string = '#000'

  status: string = 'init'
  clearSquareAnimate: number = 0
  ACTIVE_COLOR: Array<string> = ['#dc532a', '#879372', '#dc532a']
  activeColorIndex: number = 0
  clearSquareArr: Array<number> = []
  animateId: number = 0

  endGameAnimate: number = 0
  endAnimateIndex: number

  constructor(name: string, canvasId: string) {
    super(name, canvasId)
    this.GAP = Math.ceil(this.width * 0.0109)
    this.SQUARE_PADDING = Math.ceil(this.GAP * 2 / 3)
    this.SQUARE_WEIGHT =
      (this.width - this.GAP * (this.SQUARE_LENGTH + 1)) / this.SQUARE_LENGTH
    this.SQUARE_HEIGHT =
      (this.height - this.GAP * (this.SQUARE_LENGTH * 2 + 1)) /
      (this.SQUARE_LENGTH * 2)
    for (let i = 0; i < this.SQUARE_LENGTH * 2; i++) {
      this.squareArr[i] = []
      for (let j = 0; j < this.SQUARE_LENGTH; j++) {
        let x = j * this.SQUARE_WEIGHT + (j + 1) * this.GAP,
          y = i * this.SQUARE_HEIGHT + (i + 1) * this.GAP
        this.squareArr[i][j] = {
          x: x,
          y: y,
          bold: 0
        }
      }
    }
    console.log(this.squareArr, this.SQUARE_WEIGHT, this.SQUARE_HEIGHT, this.width, this.height)
    this.endAnimateIndex = this.SQUARE_LENGTH * 2
  }
  scrollBackground() {
    this.translateOffset =
      (this.translateOffset + this.translateDelta) % this.context.canvas.width
    this.context.translate(-this.translateOffset, 0)
  }

  setGameStatus(s: string) {
    this.status = s
  }

  start() {
    this.startTime = this.getNowTime()
    this.setGameStatus('running')
    window.requestAnimationFrame((time: number) => {
      this.animate(time)
    })
  }

  paintFarCloud(context: CanvasRenderingContext2D, x: number, y: number) {
    context.save()
    this.scrollBackground()
    context.lineWidth = 0.5
    context.strokeStyle = 'rgba(100, 140, 230, 0, 0.8)'
    context.fillStyle = 'rgba(255,255,255,0.4)'
    context.beginPath()

    context.moveTo(x + 102, y + 91)
    context.quadraticCurveTo(x + 180, y + 110, x + 250, y + 90)
    context.quadraticCurveTo(x + 312, y + 87, x + 279, y + 60)
    context.quadraticCurveTo(x + 321, y + 20, x + 265, y + 20)
    context.quadraticCurveTo(x + 219, y + 4, x + 171, y + 23)
    context.quadraticCurveTo(x + 137, y + 5, x + 104, y + 18)
    context.quadraticCurveTo(x + 57, y + 23, x + 79, y + 48)
    context.quadraticCurveTo(x + 57, y + 74, x + 104, y + 92)
    context.closePath()
    context.stroke()
    context.fill()
    context.restore()
  }
  paintNearCloud(context: CanvasRenderingContext2D, x: number, y: number) {
    context.save()
    this.scrollBackground()
    this.scrollBackground()
    context.lineWidth = 0.5
    context.strokeStyle = 'rgba(100, 140, 230, 0, 0.8)'
    context.fillStyle = 'rgba(255,255,255,0.4)'
    context.beginPath()

    context.fillStyle = 'rgba(255,255,255,0.7)'

    context.moveTo(x + 364, y + 37)
    context.quadraticCurveTo(x + 426, y + 28, x + 418, y + 72)
    context.quadraticCurveTo(x + 450, y + 123, x + 388, y + 114)
    context.quadraticCurveTo(x + 357, y + 144, x + 303, y + 115)
    context.quadraticCurveTo(x + 251, y + 118, x + 278, y + 83)
    context.quadraticCurveTo(x + 254, y + 46, x + 320, y + 46)
    context.quadraticCurveTo(x + 326, y + 12, x + 362, y + 37)
    context.closePath()
    context.stroke()
    context.fill()
    context.restore()
  }
  paintSun(context: CanvasRenderingContext2D) {
    context.save()

    context.strokeStyle = 'orange'
    context.fillStyle = 'yellow'
    context.strokeStyle = 'orange'
    context.lineWidth = 1

    context.beginPath()
    context.arc(
      this.SUN_LEFT,
      this.SUN_TOP,
      this.SUN_RADIUS,
      0,
      Math.PI * 2,
      true
    )
    context.fill()
    context.stroke()

    context.stroke()
    context.restore()
  }
  paintBackSquare(context: CanvasRenderingContext2D) {
    context.save()
    // context.fillStyle = this.SQUARE_FILL_STYLE
    context.strokeStyle = this.SQUARE_STROKE_STYLE
    context.lineWidth = this.SQUARE_PADDING

    for (let i = 0; i < this.SQUARE_LENGTH * 2; i++) {
      for (let j = 0; j < this.SQUARE_LENGTH; j++) {
        let t = this.squareArr[i][j]
        if (t.bold === 1) {
          context.fillStyle = this.SQUARE_BOLD
        } else {
          context.fillStyle = this.SQUARE_FILL_STYLE
        }
        context.fillRect(t.x, t.y, this.SQUARE_WEIGHT, this.SQUARE_HEIGHT)
        context.strokeRect(
          t.x + this.SQUARE_PADDING,
          t.y + this.SQUARE_PADDING,
          this.SQUARE_WEIGHT - this.SQUARE_PADDING * 2,
          this.SQUARE_HEIGHT - this.SQUARE_PADDING * 2
        )
      }
    }
    context.restore()
  }
  gameOverAnimate() {
    this.endAnimateIndex--
    if (this.endAnimateIndex < -this.SQUARE_LENGTH * 2) {
      this.endGameAnimate = 0
      return
    }
    if (this.endAnimateIndex < 0) {
      for (let i = 0; i < this.SQUARE_LENGTH; i++) {
        this.squareArr[Math.abs(this.endAnimateIndex) - 1][i].bold = 0
      }
    } else {
      for (let i = 0; i < this.SQUARE_LENGTH; i++) {
        this.squareArr[Math.abs(this.endAnimateIndex)][i].bold = 1
      }
    }
  }
  startAnimate() {
    if (!this.animateId) {
      this.animateId = setInterval(() => {
        this.activeColorIndex++
        if (this.activeColorIndex >= 3) {
          this.activeColorIndex = 0
          this.endAnimate()
          clearInterval(this.animateId)
          this.animateId = 0
        }
      }, 100)
    }
  }

  paintAnimate() {
    this.context.save()
    this.context.fillStyle = this.ACTIVE_COLOR[this.activeColorIndex]
    this.context.strokeStyle = this.SQUARE_STROKE_STYLE
    this.context.lineWidth = this.SQUARE_PADDING

    for (let i = 0, len = this.clearSquareArr.length; i < len; i++) {
      for (let j = 0; j < this.SQUARE_LENGTH; j++) {
        let t = this.squareArr[this.clearSquareArr[i]][j]
        this.context.fillRect(t.x, t.y, this.SQUARE_WEIGHT, this.SQUARE_HEIGHT)
        this.context.strokeRect(
          t.x + this.SQUARE_PADDING,
          t.y + this.SQUARE_PADDING,
          this.SQUARE_WEIGHT - this.SQUARE_PADDING * 2,
          this.SQUARE_HEIGHT - this.SQUARE_PADDING * 2
        )
      }
    }
    this.context.restore()
  }

  paintUnderSprites() {}
  paintOverSprites(time: GameTime) {
    this.paintBackSquare(this.context)
  }
  endAnimate() {
    this.clearSquareAnimate = 0
    let arr: Array<Array<SquarePosition>> = []
    for (let i = 0; i < this.SQUARE_LENGTH * 2; i++) {
      arr[i] = []
      for (let j = 0; j < this.SQUARE_LENGTH; j++) {
        arr[i][j] = Object.assign({}, this.squareArr[i][j], { bold: 0 })
      }
    }
    let t = []
    for (let i = this.SQUARE_LENGTH * 2 - 1; i >= 0; i--) {
      let flag = false
      for (let k = 0; k < this.clearSquareArr.length; k++) {
        if (this.clearSquareArr[k] === i) {
          flag = true
          break
        }
      }
      if (!flag) t.push(this.squareArr[i])
    }
    // 消除满行，重新组合
    for (let i = 0, len = this.SQUARE_LENGTH * 2 - 1; i < t.length; i++) {
      for (let j = 0; j < this.SQUARE_LENGTH; j++)
        arr[len - i][j].bold = t[i][j].bold
    }
    this.squareArr = arr
    this.setSource(this.clearSquareArr.length)
    // console.log(this.squareArr)
  }

  setSource(s: number) {
    this.source += s * 10
  }

  restart() {
    this.sprites[0].init(1)
    this.init()
    this.start()
  }

  init() {
    for (let i = 0; i < this.SQUARE_LENGTH * 2; i++) {
      for (let j = 0; j < this.SQUARE_LENGTH; j++) {
        this.squareArr[i][j].bold = 0
      }
    }
    this.status = 'init'
    this.clearSquareAnimate = 0
    this.activeColorIndex = 0
    this.animateId = 0
    this.endGameAnimate = 0
    this.endAnimateIndex = this.SQUARE_LENGTH * 2
  }
  keyPressed(e: any) {
    let key: string = ''
    let res

    switch (e.keyCode) {
      case 37:
        key = 'left'
        break
      case 39:
        key = 'right'
        break
      case 38:
        key = 'up'
        break
      case 40:
        key = 'down'
        break
    }
    // console.log(key)
    res = this.findKeyListener(key)
    if (res) {
      res.listener(this, this.sprites[0], Date.now())
    }
  }

  animate(time: number) {
    if (this.paused) {
      setInterval(() => {
        window.requestAnimationFrame((time: number) => {
          this.animate(time)
        })
      }, 100)
    } else {
      this.updateBase(time)
      this.clearScreen()

      this.paintOverSprites(time)
      if (this.clearSquareAnimate) {
        this.startAnimate()
        this.paintAnimate()
      } else if (this.endGameAnimate) {
        this.gameOverAnimate()
      } else {
        this.paintSprites()
        this.updateSprites(time)
        this.checkSquare()
      }

      this.checkGameStatus()

      if (this.status === 'running' || this.endGameAnimate) {
        window.requestAnimationFrame((time: number) => {
          this.animate(time)
        })
      }
    }
  }

  checkSquare() {
    this.clearSquareArr = []
    for (let i = 0; i < this.SQUARE_LENGTH * 2; i++) {
      let flag = false
      for (let j = 0; j < this.SQUARE_LENGTH; j++) {
        if (this.squareArr[i][j].bold === 0) {
          flag = true
          break
        }
      }
      if (!flag) {
        this.clearSquareArr.push(i)
      }
    }
    if (this.clearSquareArr.length <= 0) this.clearSquareAnimate = 0
    else this.clearSquareAnimate = 1
    // console.log(this.clearSquareArr)
  }

  checkGameStatus() {
    for (let j = 0; j < this.SQUARE_LENGTH; j++) {
      if (this.squareArr[0][j].bold) {
        this.endGameAnimate = 1
        this.setGameStatus('end')
      }
    }
  }
}
