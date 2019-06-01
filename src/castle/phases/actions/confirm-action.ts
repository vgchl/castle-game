import { Action } from './action'
import { Game } from '../../game'
import { ScorePhase } from '../score-phase'

export class ConfirmAction extends Action {
  public confirm (): Game {
    return this.game.set({
      phase: new ScorePhase()
    })
  }
}
