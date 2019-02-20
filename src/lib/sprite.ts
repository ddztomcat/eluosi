import { GameTime } from './type'
import { Game } from './game'
export interface Painter {
  paint(sprite: Sprite, context: CanvasRenderingContext2D, game: Game): void
}
export interface Behavior {
  [key: string]: any;
  execute(
    sprite: Sprite,
    context: CanvasRenderingContext2D,
    time: GameTime,
    game: Game
  ): void
}
export class Sprite {
  painter: Painter
  behaviors: Behavior[]
  visible: boolean = true
  game: Game
  constructor(
    private readonly name: string,
    painter: Painter,
    behaviors: Behavior[],
    game: Game
  ) {
    this.behaviors = behaviors
    this.painter = painter
    this.game = game
  }
  paint(context: CanvasRenderingContext2D) {
    this.painter.paint(this, context, this.game)
  }
  update(context: CanvasRenderingContext2D, time: GameTime) {
    for (let i = this.behaviors.length - 1; i >= 0; i--) {
      this.behaviors[i].execute(this, context, time, this.game)
    }
  }
  init(n: any) {

  }
  getName() {
    return this.name
  }
}
