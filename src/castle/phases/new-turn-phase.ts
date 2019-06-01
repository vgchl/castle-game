import { Phase } from './phase'
import { Game } from '../game'
import { Player } from '../player'
import { Turn } from '../turn'
import { DrawTilePhase } from './draw-tile-phase'
import { List } from 'immutable'
import { Action } from './actions/action'

export class NewTurnPhase extends Phase {
  public update (game: Game): Game {
    let turn = new Turn({ player: this.getNextPlayer(game) })
    let turns = game.turns.push(turn)
    let phase = new DrawTilePhase()
    return game.set({ phase, turns })
  }

  public actions (game: Game): List<Action> {
    return List()
  }

  private getNextPlayer (game: Game): Player {
    let players = game.players
    if (game.turns.isEmpty()) {
      return players.first()
    }
    let currentPlayerIndex = players.indexOf(game.currentTurn.player)
    return players.get((currentPlayerIndex + 1) % players.size)
  }
}
