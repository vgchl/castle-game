import { Action } from './actions/action'
import { Game } from '../game'
import { List } from 'immutable'

export abstract class Phase {
  /**
   * Updates the game.
   *
   * @param game The current game state.
   */
  public abstract update (game: Game): Game

  /**
   * Lists the actions that are available given the game state.
   *
   * @param game The current game state.
   */
  public abstract actions (game: Game): List<Action>
}
