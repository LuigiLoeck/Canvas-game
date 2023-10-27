export class UI {
  constructor(game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'sans-serif'
  }
  draw(context){
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.textAlign = 'left'
    context.fillStyle = this.game.fontColor

    //pontos
    context.fillText(`Score: ${this.game.score}`, 20, 50)
  }
}