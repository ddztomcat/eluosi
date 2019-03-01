import { EluosiGame } from '@lib/eluosi'
import { ProgressBar } from '@lib/progressbar'
import Events from '@lib/events'
import {
  SquareSprite,
  SquareSpriteBehavior,
  SquareSpritePainter
} from './components/square/index'
import './styles/index.scss'
import { isPhone, bingEvent } from './utils/index'
interface EventAction {
  target: HTMLElement
  id: number
  action: Function
  interval: number
}
interface OperationArray {
  [index: string]: EventAction
}
let cas = <HTMLCanvasElement>document.getElementById('gameCanvas'),
  pw = 0,
  ph = 0
let acw = <HTMLElement>document.querySelector('.actions')
let loadingToast = <HTMLElement>document.getElementById('loadingToast')
let loadButton = <HTMLElement>document.getElementById('loadButton')
let progressDiv = <HTMLElement>document.getElementById('progressDiv')
let source = <HTMLElement>document.getElementById('source')
let fps = <HTMLElement>document.getElementById('fps')
let gameTime = <HTMLElement>document.getElementById('gameTime')
let restart = <HTMLElement>document.getElementById('restart')
let gameOver = <HTMLElement>document.getElementById('gameOver')
let up = <HTMLElement>document.querySelector('.act-btn.up')
let down = <HTMLElement>document.querySelector('.act-btn.down')
let left = <HTMLElement>document.querySelector('.act-btn.left')
let right = <HTMLElement>document.querySelector('.act-btn.right')
let res = [
  '青铜水平',
  '白银水平',
  '黄金水平',
  '铂金水平',
  '钻石水平',
  '星耀水平',
  '最强王者',
  '荣耀王者'
]
let t = Date.now()

if (isPhone()) {
  cas.width = 275
  cas.height = 375
  pw = 150
  ph = 25
  acw.style.display = 'block'
} else {
  cas.width = 550
  cas.height = 750
  pw = 300
  ph = 25
  acw.style.display = 'none'
}
let progressbar = new ProgressBar(
  pw,
  ph,
  'rgba(0,0,0,0.5)',
  '#ef4510',
  '#00964b'
)
let game = new EluosiGame('俄罗斯方块', 'gameCanvas')
let sp = new SquareSprite(
  'square sprite',
  SquareSpritePainter,
  [SquareSpriteBehavior],
  game,
  1,
  { x: 0, y: 5 }
)
const frep = 50
const ed: OperationArray = {
  up: {
    target: up,
    id: 0,
    interval: frep * 4,
    action: () => {
      game.keyPressed({ keyCode: 38 })
    }
  },
  down: {
    target: down,
    id: 0,
    interval: frep,
    action: () => {
      game.keyPressed({ keyCode: 40 })
    }
  },
  left: {
    target: left,
    id: 0,
    interval: frep * 4,
    action: () => {
      game.keyPressed({ keyCode: 37 })
    }
  },
  right: {
    target: right,
    id: 0,
    interval: frep * 4,
    action: () => {
      game.keyPressed({ keyCode: 39 })
    }
  }
}
gameOver.style.display = 'none'
restart.style.display = 'none'



for (let key in ed) {
  bingEvent(ed[key].target, 'touchstart', () => {
    ed[key].action()
    ed[key].id = setInterval(ed[key].action, ed[key].interval)
  })
  bingEvent(ed[key].target, 'touchend', () => {
    clearInterval(ed[key].id)
  })
}

restart.addEventListener('click', function() {
  setTimeout(() => {
    game.restart()
    gameOver.style.display = 'none'
    restart.style.display = 'none'
  }, 500)
})
loadButton.addEventListener(
  'click',
  function(e) {
    let interval = 0,
      loadingPercentComplete = 0

    e.preventDefault()
    loadButton.style.display = 'none'
    progressDiv.appendChild(progressbar.domElement)

    interval = setInterval(function() {
      loadingPercentComplete += 20
      console.log(loadingPercentComplete)
      if (loadingPercentComplete === 100) {
        clearInterval(interval)
        setTimeout(function() {
          loadingToast.style.display = 'none'
          game.start()
        }, 500)
      }
      progressbar.draw(loadingPercentComplete)
    }, 200)
  },
  false
)

setInterval(() => {
  source.innerText = game.source + ''
  if (Date.now() - t > 500) {
    fps.innerText = Math.ceil(game.fps) + ''
    t = Date.now()
  }
  if (game.status === 'end') {
    if (game.source > 400) gameOver.innerText = 'Game Over, ' + res[7]
    else gameOver.innerText = 'Game Over, ' + res[Math.ceil(game.source / 50)]
    gameOver.style.display = 'block'
    restart.style.display = 'block'
  }
}, 16)
setInterval(() => {
  gameTime.innerText = Math.ceil(game.gameTime / 1000) + 's'
}, 1000)
game.addEventListener(Events)
game.addSprite(sp)
game.paintBackSquare(game.context)
// game.start()
