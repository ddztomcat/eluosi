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
let cas = <HTMLCanvasElement>document.getElementById('gameCanvas'), pw = 0, ph = 0
let acw = <HTMLElement>document.querySelector('.actions')

if(isPhone()) {
  cas.width = 275
  cas.height = 375
  pw = 150
  ph = 25
  acw.style.display = 'block'
}else {
  cas.width = 550
  cas.height = 750
  pw = 300
  ph = 25
  acw.style.display = 'none'
}

let game = new EluosiGame('俄罗斯方块', 'gameCanvas'),
  loadingToast = <HTMLElement>document.getElementById('loadingToast'),
  loadButton = <HTMLElement>document.getElementById('loadButton'),
  progressDiv = <HTMLElement>document.getElementById('progressDiv'),
  progressbar = new ProgressBar(
    pw,
    ph,
    'rgba(0,0,0,0.5)',
    '#ef4510',
    '#00964b'
  ),
  source = <HTMLElement>document.getElementById('source'),
  fps = <HTMLElement>document.getElementById('fps'),
  gameTime = <HTMLElement>document.getElementById('gameTime'),
  restart = <HTMLElement>document.getElementById('restart'),
  gameOver = <HTMLElement>document.getElementById('gameOver')
  gameOver.style.display = 'none'
  restart.style.display = 'none'
  let up = <HTMLElement>document.querySelector('.act-btn.up')
  let down = <HTMLElement>document.querySelector('.act-btn.down')
  let left = <HTMLElement>document.querySelector('.act-btn.left')
  let right = <HTMLElement>document.querySelector('.act-btn.right')

  bingEvent(up, 'click', () => {
    game.keyPressed({keyCode: 38})
  })
 
  bingEvent(down, 'click', () => {
    game.keyPressed({keyCode: 40})
  })
  bingEvent(left, 'click', () => {
    game.keyPressed({keyCode: 37})
  })
  bingEvent(right, 'click', () => {
    game.keyPressed({keyCode: 39})
  })
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
    let interval: number = 0,
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
let sp = new SquareSprite(
  'square sprite',
  SquareSpritePainter,
  [SquareSpriteBehavior],
  game,
  1,
  { x: 0, y: 5 }
)
let res = ['青铜水平','白银水平','黄金水平','铂金水平','钻石水平','星耀水平','最强王者','荣耀王者']
let t = Date.now()
setInterval(() => {
  source.innerText = game.source + ''
  if(Date.now() - t > 500) {
    fps.innerText = Math.ceil(game.fps) + ''
    t = Date.now()
  }
  if(game.status === 'end') {
    if(game.source > 400)  gameOver.innerText = 'Game Over, ' + res[7]
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
