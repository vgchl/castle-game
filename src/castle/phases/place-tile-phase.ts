import { List } from 'immutable'
import { Game } from '../game'
import { Figure } from '../world/figure'
import { Action } from './actions/action'
import { ConfirmAction } from './actions/confirm-action'
import { PlaceFigureAction } from './actions/place-figure-action'
import { PlaceTileAction } from './actions/place-tile-action'
import { Phase } from './phase'

export class PlaceTilePhase extends Phase {
  public update (game: Game): Game {
    return game
  }

  public actions (game: Game): List<Action> {
    let actions = List<Action>()

    actions = actions.push(this.getPlaceTileAction(game))

    if (this.hasPlacedTile(game)) {
      actions = actions
        .concat(this.getPlaceFigureActions(game))
        .concat(new ConfirmAction(game, game.currentTurn.player))
        .toList()
    }

    return actions
  }

  private getPlaceTileAction (game: Game): Action {
    let gameBeforeTilePlacement =
      game.currentTurn.currentTurnPart.gameBeforeTilePlacement || game
    return new PlaceTileAction(gameBeforeTilePlacement, game.currentTurn.player)
  }

  private getPlaceFigureActions (game: Game): List<Action> {
    let gameBeforeFigurePlacement =
      game.currentTurn.currentTurnPart.gameBeforeFigurePlacement || game
    return (
      Figure.all
        // TODO filter figures from enabled extensions
        // TODO filter figures still available to the player
        .map(
          figure =>
            new PlaceFigureAction(
              gameBeforeFigurePlacement,
              game.currentTurn.player,
              figure!
            )
        )
        .filter(action => action!.possiblePlacements.size > 0)
        .toList()
    )
  }

  private hasPlacedTile (game: Game): boolean {
    return !!game.currentTurn.currentTurnPart.tilePlacement
  }
}
