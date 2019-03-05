import { EluosiGame } from '@lib/eluosi'
import { Sprite, Painter, Behavior } from '@lib/sprite'
let SquareSpritePainter: Painter = {
  paint(
    sprite: SquareSprite,
    context: CanvasRenderingContext2D,
    game: EluosiGame
  ) {
    context.save()
    context.fillStyle = game.SQUARE_BOLD
    context.strokeStyle = game.SQUARE_STROKE_STYLE
    context.lineWidth = game.SQUARE_PADDING
    let sp = sprite.position
    for (let i = 0; i < sprite.TYPE_ARR_HEIGHT; i++) {
      for (let j = 0; j < sprite.TYPE_ARR_WEIGHT; j++) {
        if (sprite.type[i][j]) {
          let t = game.squareArr[sp.x + i][sp.y + j]
          context.fillRect(t.x, t.y, game.SQUARE_WEIGHT, game.SQUARE_HEIGHT)
          context.strokeRect(
            t.x + game.SQUARE_PADDING,
            t.y + game.SQUARE_PADDING,
            game.SQUARE_WEIGHT - game.SQUARE_PADDING * 2,
            game.SQUARE_HEIGHT - game.SQUARE_PADDING * 2
          )
        }
      }
    }
    context.restore()
  }
}
let SquareSpriteBehavior: Behavior = {
  execute(sprite: SquareSprite, context, time, game: EluosiGame) {
    if (sprite.eventing) return
    if (time - sprite.lastUpdateTime > 500) {
      let t = sprite.position
      sprite.position.x++
      let sum = 0
      for (let i = 0; i < sprite.TYPE_ARR_HEIGHT; i++) {
        for (let j = 0; j < sprite.TYPE_ARR_WEIGHT; j++) {
          if (
            t.x + i >= 0 &&
            t.y + j >= 0 &&
            sprite.type[i][j] &&
            t.x + i < game.SQUARE_LENGTH * 2 &&
            t.y + j < game.SQUARE_LENGTH
          )
            sum =
              sum + game.squareArr[t.x + i][t.y + j].bold + sprite.type[i][j]
        }
      }
      if (
        sum > 4 ||
        sprite.position.x > game.SQUARE_LENGTH * 2 - sprite.height
      ) {
        for (let i = 0; i < sprite.TYPE_ARR_HEIGHT; i++) {
          for (let j = 0; j < sprite.TYPE_ARR_WEIGHT; j++) {
            if (sprite.type[i][j]) {
              game.squareArr[t.x + i - 1][t.y + j].bold = 1
            }
          }
        }
        sprite.generateSprite()
      }

      sprite.lastUpdateTime = time
    }
  }
}
export interface Position {
  x: number
  y: number
}
export class SquareSprite extends Sprite {
  type: Array<Array<number>> = []
  typeId: number = 1
  position: Position
  height: number
  weight: number
  eventing: boolean = false
  lastUpdateTime: number = 0
  eventLastUpdateTime: number = 0
  TYPE_COUNT: number = 5
  TYPE_ARR_WEIGHT: number = 4
  TYPE_ARR_HEIGHT: number = 4

  rotateIndex: number = 0
  CONST_TYPE: Array<Array<any>> = [[{weight: 2,height: 2},{weight: 2,height: 2}],
  [{weight: 2,height: 3},{weight: 3,height: 2}],
  [{weight: 2,height: 3},{weight: 3,height: 2}],
  [{weight: 1,height: 4},{weight: 4,height: 1}],
  [{weight: 3,height: 2},{weight: 2,height: 3}],
]
  constructor(
    name: string,
    sp: Painter,
    barr: Behavior[],
    game: EluosiGame,
    ty: number,
    po: Position
  ) {
    super(name, sp, barr, game)
    for (let i = 0; i < this.TYPE_ARR_HEIGHT; i++) {
      this.type[i] = []
      for (let j = 0; j < this.TYPE_ARR_WEIGHT; j++) {
        this.type[i][j] = 0
      }
    }
    this.position = po
    this.height = this.CONST_TYPE[ty - 1][this.rotateIndex % 2].height
    this.weight = this.CONST_TYPE[ty - 1][this.rotateIndex % 2].weight
    this.init(ty)
  }

  setWH() {
    this.weight = this.CONST_TYPE[this.typeId - 1][this.rotateIndex % 2].weight
    this.height = this.CONST_TYPE[this.typeId - 1][this.rotateIndex % 2].height
  }

  setPosition(x: number, y: number) {
    this.position.x = x
    this.position.y = y
  }

  setRotate(r: number) {
    this.rotateIndex = r
  }

  init(ty: number) {
    this.typeId = ty
    if (ty === 1) { // 正方形
      for (let i = 0; i < this.TYPE_ARR_HEIGHT; i++) {
        for (let j = 0; j < this.TYPE_ARR_WEIGHT; j++) {
          if (i < 2 && j < 2) this.type[i][j] = 1
          else this.type[i][j] = 0
        }
      }
    } else if (ty === 2) { // 闪电
      for (let i = 0; i < this.TYPE_ARR_HEIGHT; i++) {
        for (let j = 0; j < this.TYPE_ARR_WEIGHT; j++) {
          if (!i && !j) this.type[i][j] = 1
          else if (i === 1 && j < 2) this.type[i][j] = 1
          else if (i === 2 && j === 1) this.type[i][j] = 1
          else this.type[i][j] = 0
        }
      }
    }else if (ty === 3) { // 7
      for (let i = 0; i < this.TYPE_ARR_HEIGHT; i++) {
        for (let j = 0; j < this.TYPE_ARR_WEIGHT; j++) {
          if (!i && j < 2) this.type[i][j] = 1
          else if (i === 1 && j === 1) this.type[i][j] = 1
          else if (i === 2 && j === 1) this.type[i][j] = 1
          else this.type[i][j] = 0
        }
      }
    }else if (ty === 4) { // 1
      for (let i = 0; i < this.TYPE_ARR_HEIGHT; i++) {
        for (let j = 0; j < this.TYPE_ARR_WEIGHT; j++) {
          if (!j) this.type[i][j] = 1
          else this.type[i][j] = 0
        }
      }
    }else if (ty === 5) { // 土
      for (let i = 0; i < this.TYPE_ARR_HEIGHT; i++) {
        for (let j = 0; j < this.TYPE_ARR_WEIGHT; j++) {
          if (!i && j === 1) this.type[i][j] = 1
          else if (i === 1 && j < 3) this.type[i][j] = 1
          else this.type[i][j] = 0
        }
      }
    }
  }
  generateSprite() {
    let type = Math.ceil(Math.random() * 100) % this.TYPE_COUNT + 1
    console.log(type)
    this.setRotate(0)
    this.setPosition(0, 4)
    this.init(type)
    this.setWH()
  }
}
export { SquareSpritePainter, SquareSpriteBehavior }
