import { List, Map } from 'immutable'
import { Direction, PlacedTile } from '../../world'
import { Action } from './action'
import { Position } from '../../world/position'
import { Game } from '../../game'

/**
 * Handles the action of placing a new tile in the world.
 */
export class PlaceTileAction extends Action {
  /**
   * Lists the possible positions and orientations at which the drawn tile can be placed.
   */
  public readonly possibleTilePlacements: Map<Position, List<Direction>> = this.getPossibleTilePlacements()

  /**
   * Places the tile in the world.
   *
   * @param position The position at which the tile will be placed
   * @param orientation The orientation at which the tile will be placed
   * @param game The current game state
   */
  public placeTile (position: Position, orientation: Direction): Game {
    let turnPart = this.game.currentTurn.currentTurnPart
    let world = this.game.world.placeTile(turnPart.tile, position, orientation)

    return this.game
      .set({
        world,
        turns: Game.setCurrentTurnPart(this.game, {
          tilePlacement: new PlacedTile(turnPart.tile, position, orientation),
          figurePlacement: undefined,
          gameBeforeTilePlacement: this.game
        })
      })
  }

  private getPossibleTilePlacements (): Map<Position, List<Direction>> {
    let turnPart = this.game.currentTurn.currentTurnPart
    return this.game.world.getPossibleTilePlacements(turnPart.tile)
  }
}
