import { Player } from '../../player'
import { Game } from '../../game'

export abstract class Action {
  constructor (public readonly game: Game, public readonly player: Player) {}
}
