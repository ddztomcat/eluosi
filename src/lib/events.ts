import { EventListener } from '@lib/game'
import { EluosiGame } from '@lib/eluosi'
import { SquareSprite } from '../components/square/index'
import { GameTime } from '@lib/type'
let leftEl: EventListener = {
  name: 'left',
  listener(game: EluosiGame, sprite: SquareSprite, time: GameTime) {
    sprite.eventLastUpdateTime = time
    sprite.position.y--
    let t = sprite.position
    let sum = 0
    for (let i = 0; i < sprite.TYPE_ARR_HEIGHT; i++) {
      for (let j = 0; j < sprite.TYPE_ARR_WEIGHT; j++) {
        if (
          sprite.type[i][j] &&
          t.x + i < game.SQUARE_LENGTH * 2 &&
          t.x + i >= 0 &&
          t.y + j >= 0 &&
          t.y + j < game.SQUARE_LENGTH
        )
          sum = sum + game.squareArr[t.x + i][t.y + j].bold + sprite.type[i][j]
      }
    }
    if (sprite.position.y < 0 || sum > 4) sprite.position.y++
  }
}
let rightEl: EventListener = {
  name: 'right',
  listener(game: EluosiGame, sprite: SquareSprite, time: GameTime) {
    sprite.eventLastUpdateTime = time
    sprite.position.y++
    let t = sprite.position
    let sum = 0
    for (let i = 0; i < sprite.TYPE_ARR_HEIGHT; i++) {
      for (let j = 0; j < sprite.TYPE_ARR_WEIGHT; j++) {
        if (
          sprite.type[i][j] &&
          t.x + i < game.SQUARE_LENGTH * 2 &&
          t.x + i >= 0 &&
          t.y + j >= 0 &&
          t.y + j < game.SQUARE_LENGTH
        )
          sum = sum + game.squareArr[t.x + i][t.y + j].bold + sprite.type[i][j]
      }
    }
    if (sprite.position.y > game.SQUARE_LENGTH - sprite.weight || sum > 4)
      sprite.position.y--
  }
}
let downEl: EventListener = {
  name: 'down',
  listener(game: EluosiGame, sprite: SquareSprite, time: GameTime) {
    sprite.eventLastUpdateTime = time
    sprite.position.x++
    let t = sprite.position
    let sum = 0
    for (let i = 0; i < sprite.TYPE_ARR_HEIGHT; i++) {
      for (let j = 0; j < sprite.TYPE_ARR_WEIGHT; j++) {
        if (
          sprite.type[i][j] &&
          t.x + i < game.SQUARE_LENGTH * 2 &&
          t.y + j < game.SQUARE_LENGTH &&
          t.x + i >= 0 &&
          t.y + j >= 0
        )
          sum = sum + game.squareArr[t.x + i][t.y + j].bold + sprite.type[i][j]
      }
    }
    if (sum > 4 || sprite.position.x > game.SQUARE_LENGTH * 2 - sprite.height) {
      sprite.position.x--
    }
  }
}
let upEl: EventListener = {
  name: 'up',
  listener(game: EluosiGame, sprite: SquareSprite, time: GameTime) {
    let arr: Array<Array<number>> = []
    for (let i = 0; i < sprite.TYPE_ARR_HEIGHT; i++) {
      arr[i] = []
      for (let j = 0; j < sprite.TYPE_ARR_WEIGHT; j++) {
        arr[i][j] = 0
      }
    }
    for (let i = 0; i < sprite.TYPE_ARR_HEIGHT; i++) {
      for (let j = 0; j < sprite.TYPE_ARR_WEIGHT; j++) {
        arr[j][3 - i] = sprite.type[i][j]
      }
    }
    while (true) {
      let flag = false
      for (let i = 0; i < 4; i++) {
        if (arr[0][i]) {
          flag = true
        }
      }
      if (!flag) {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (i + 1 < 4) arr[i][j] = arr[i + 1][j]
            else arr[i][j] = 0
          }
        }
      } else {
        break
      }
    }
    while (true) {
      let flag = false
      for (let i = 0; i < 4; i++) {
        if (arr[i][0]) {
          flag = true
        }
      }
      if (!flag) {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (i + 1 < 4) arr[j][i] = arr[j][i + 1]
            else arr[j][i] = 0
          }
        }
      } else {
        break
      }
    }
    let t = sprite.position
    let sum = 0
    for (let i = 0; i < sprite.TYPE_ARR_HEIGHT; i++) {
      for (let j = 0; j < sprite.TYPE_ARR_WEIGHT; j++) {
        if (
          arr[i][j] &&
          t.x + i < game.SQUARE_LENGTH * 2 &&
          t.y + j < game.SQUARE_LENGTH &&
          t.x + i >= 0 &&
          t.y + j >= 0
        )
          sum = sum + game.squareArr[t.x + i][t.y + j].bold + arr[i][j]
      }
    }
    if (sum === 4) {
      sprite.rotateIndex = (sprite.rotateIndex + 1) % 4
      sprite.type = arr
      sprite.setWH()
    }
    // console.log(sprite.type)
  }
}
let evs = [leftEl, rightEl, downEl, upEl]
export default evs