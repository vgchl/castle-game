import { Phase } from './phase'
import { List } from 'immutable'
import { Game } from '../game'
import { Action } from './actions/action'

export class EndGamePhase extends Phase {
  public actions (game: Game): List<Action> {
    return List()
  }

  public update (game: Game): Game {
    return game
  }
}
