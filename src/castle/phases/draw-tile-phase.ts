import { Phase } from './phase'
import { Game } from '../game'
import { PlaceTilePhase } from './place-tile-phase'
import { Turn } from '../turn'
import { TurnPart } from '../turn-part'
import { Tile } from '../world/tile'
import { List } from 'immutable'
import { Action } from './actions/action'
import { EndGamePhase } from './end-game-phase'

/**
 * In the DrawTilePhase a tile is drawn from the face-down remaining tiles.
 */
export class DrawTilePhase extends Phase {
  public update (game: Game): Game {
    let tileSet = game.tileSet
    let tile: Tile
    do {
      if (tileSet.canPickTile()) {
        tileSet = tileSet.pickTile()
        tile = tileSet.tileFacedUp!
      } else {
        return game.set({ phase: new EndGamePhase() })
      }
    } while (game.world.getPossibleTilePlacements(tile).size < 1)

    const turn = this.setTileInTurn(tile, game.currentTurn, game)
    const turns = game.turns.set(-1, turn)
    const phase = new PlaceTilePhase()
    return game.set({ tileSet, turns, phase })
  }

  public actions (game: Game): List<Action> {
    return List()
  }

  private setTileInTurn (tile: Tile, turn: Turn, game: Game): Turn {
    let turnPart = new TurnPart({ tile })
    let turnParts = turn.turnParts.push(turnPart)
    return turn.set({ turnParts })
  }
}
