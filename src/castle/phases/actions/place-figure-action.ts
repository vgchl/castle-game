import { List } from 'immutable'
import { Action } from './action'
import { Game } from '../../game'
import { Figure } from '../../world/figure'
import { Player } from '../../player'
import { PlacedFigure } from '../../world/placed-figure'
import { GameRuleViolationError } from '../../game-rule-violation-error'

export class PlaceFigureAction extends Action {
  public readonly possiblePlacements: List<PlacedFigure>

  public constructor (game: Game, player: Player, public readonly figure: Figure) {
    super(game, player)
    this.possiblePlacements = this.getPossiblePlacements()
  }

  public placeFigure (placedFigure: PlacedFigure): Game {
    if (!this.game.world.canPlaceFigure(placedFigure)) {
      throw new GameRuleViolationError('Can not place figure there.')
    }

    let world = this.game.world.placeFigure(placedFigure)

    return this.game
      .set({
        world,
        turns: Game.setCurrentTurnPart(this.game, {
          figurePlacement: placedFigure,
          gameBeforeFigurePlacement: this.game
        })
      })
  }

  private getPossiblePlacements (): List<PlacedFigure> {
    let turn = this.game.currentTurn
    let turnPart = turn.currentTurnPart
    return this.game.world.getPossibleFigurePlacements(this.figure, turnPart.tilePlacement!, turn.player)
  }
}
