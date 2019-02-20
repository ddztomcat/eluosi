import { Sprite } from './sprite'
import { GameTime, PixelsPerSecond, ImgDom } from './type'
export interface EventListener {
  listener(game: any, sprite: any, time: GameTime): void
  name: string
}
export abstract class Game {
  context: CanvasRenderingContext2D
  sprites: Sprite[] = []
  static CONST_FPS = 60

  source: number = 0
  paused: boolean = false
  startTime: GameTime = 0
  lastFrameTime: GameTime = 0
  fps: number = 0
  gameTime: GameTime = 0
  lastPauseTime: GameTime = 0
  pauseAllTime: GameTime = 0

  imgs: string[] = []
  imgsDom: ImgDom = {}
  imgsLoadSuccess: number = 0
  imgsLoadFail: number = 0
  imgIndex: number = 0

  dom: HTMLCanvasElement
  width: number = 0
  height: number = 0

  eventListeners: Array<EventListener> = []

  constructor(
    private readonly name: string,
    private readonly canvasId: string
  ) {
    this.dom = <HTMLCanvasElement>document.getElementById(canvasId)
    let t = <CanvasRenderingContext2D>this.dom.getContext('2d')
    this.context = t
    this.width = t.canvas.width
    this.height = t.canvas.height
    window.onkeypress = e => {
      // console.log(e)
      this.keyPressed(e)
    }
    window.onkeydown = e => {
      // console.log(e)
      this.keyPressed(e)
    }
  }

  findKeyListener(key: string) {
    let t: any
    this.eventListeners.forEach(item => {
      if (item.name === key) {
        t = item
      }
    })
    return t
  }

  addEventListener(el: EventListener[]) {
    this.eventListeners.push(...el)
  }

  queueImage(url: string) {
    this.imgs.push(url)
  }

  imgLoadedCallBack(e: Event) {
    this.imgsLoadSuccess++
  }

  imgLoadedFailCallBack(e: Event) {
    this.imgsLoadFail++
  }

  loadImg(url: string) {
    let img = new Image()
    img.src = url
    img.addEventListener('load', (e: Event) => {
      this.imgLoadedCallBack(e)
    })
    img.addEventListener('error', (e: Event) => {
      this.imgLoadedFailCallBack(e)
    })
    this.imgsDom[url] = img
  }

  loadImgs() {
    if (this.imgIndex < this.imgs.length) {
      this.loadImg(this.imgs[this.imgIndex])
      this.imgIndex++
    }
    return this.imgs.length <= 0 ? 100 : ((this.imgsLoadSuccess + this.imgsLoadFail) / this.imgs.length) * 100
  }

  getNowTime() {
    return +new Date()
  }

  start() {
    this.startTime = this.getNowTime()
    window.requestAnimationFrame((time: number) => {
      this.animate(time)
    })
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

      this.startAnimate()
      this.paintUnderSprites()
      this.updateSprites(time)
      this.paintSprites()
      this.paintOverSprites(time)
      this.endAnimate()
      window.requestAnimationFrame((time: number) => {
        this.animate(time)
      })
    }
  }

  updateBase(time: GameTime) {
    this.updateFrameRate(time)
    this.gameTime = this.getNowTime() - Number(this.startTime)
    this.lastFrameTime = time
  }

  updateFrameRate(time: GameTime) {
    if (this.lastFrameTime === 0) {
      this.fps = Game.CONST_FPS
    } else {
      this.fps = 1000 / (Number(time) - Number(this.lastFrameTime))
    }
  }

  clearScreen() {
    if (this.context !== null) {
      this.context.clearRect(
        0,
        0,
        this.context.canvas.width,
        this.context.canvas.height
      )
    }
  }

  addSprite(sprite: Sprite) {
    this.sprites.push(sprite)
  }

  getSprite(name: string) {
    for (let i = 0; i < this.sprites.length; i++) {
      if (this.sprites[i].getName() === name) {
        return this.sprites[i]
      }
    }
    return null
  }

  updateSprites(time: GameTime) {
    for (let i = 0; i < this.sprites.length; i++) {
      let sp = this.sprites[i]
      if (sp.visible) {
        sp.update(this.context, time)
      }
    }
  }

  paintSprites() {
    for (let i = 0; i < this.sprites.length; i++) {
      let sp = this.sprites[i]
      if (sp.visible) {
        sp.paint(this.context)
      }
    }
  }

  togglePaused() {
    this.paused = !this.paused
    let now = this.getNowTime()
    if (this.paused) {
      this.lastPauseTime = now
    } else {
      if (this.lastPauseTime !== 0) {
        this.pauseAllTime += now - this.lastPauseTime
      }
    }
  }

  getGameAllTime() {
    return this.getNowTime() - this.startTime - this.pauseAllTime
  }

  getPixelsPerFrame(velocity: PixelsPerSecond) {
    return velocity / this.fps
  }

  abstract startAnimate(): void
  abstract paintUnderSprites(): void
  abstract paintOverSprites(time: GameTime): void
  abstract endAnimate(): void
  abstract keyPressed(e: KeyboardEvent): void
}
