import { Phase } from './phase'
import { Game } from '../game'
import { Action } from './actions/action'
import { List, Set, Map } from 'immutable'
import { PlacedSegment } from '../world/placed-segment'
import { PlacedFigure } from '../world/placed-figure'
import { Score } from '../score'
import { Player } from '../player'
import { NewTurnPhase } from './new-turn-phase'

export class ScorePhase extends Phase {
  public update (game: Game): Game {
    const completedProperties = this.getCompletedProperties(game)

    if (!completedProperties.isEmpty()) {
      return this.scoreProperty(game, completedProperties.first())
    } else {
      return game.set({ phase: new NewTurnPhase() })
    }
  }

  public actions (game: Game): List<Action> {
    return List()
  }

  private getCompletedProperties (game: Game) {
    return game.world.figures
      .filter(placedFigure => placedFigure!.figure.isFollower)
      .filter(placedFigure => placedFigure!.placedSegment!.segment.isCompletable)
      .map(placedFigure => game.world.getConnectedSegments(placedFigure!.placedSegment!).toSet())
      .filter(propertySegments => game.world.isCompleted(propertySegments!))
  }

  private scoreProperty (game: Game, propertySegments: Set<PlacedSegment>): Game {
    const propertyFigures = this.getFiguresOnProperty(game, propertySegments)
    const scores = this.scoreCity(game, propertySegments)
    const figures = game.world.figures.subtract(propertyFigures)

    return game
      .set({
        world: game.world.set({ figures }),
        turns: Game.setCurrentTurn(game, {
          scores: game.currentTurn.scores.concat(scores).toList()
        })
      })
  }

  private getFiguresOnProperty (game: Game, propertySegments: Set<PlacedSegment>): Set<PlacedFigure> {
    return game.world.figures
      .filter(figure => !!figure!.placedSegment && propertySegments.contains(figure!.placedSegment))
      .toSet()
  }

  // TODO: Support cloisters
  // TODO: Move to separate class
  private scoreCity (game: Game, propertySegments: Set<PlacedSegment>): List<Score> {
    const numberOfTiles = propertySegments.map(segment => segment!.placedTile).toSet().size
    const pointsPerTile = this.getPointsPerTile(game, propertySegments)
    const numberOfPennants = 0 // TODO
    const points = pointsPerTile * (numberOfTiles + numberOfPennants)
    const playersWithMajority = this.getPlayersWithMajority(game, propertySegments)
    return playersWithMajority.map(player => ({ player, points } as Score)).toList()
  }

  private getPointsPerTile (game: Game, propertySegments: Set<PlacedSegment>): number {
    // TODO: Check if property is closed
    // TODO: Check for cathedral in property
    // TODO: Check for property type
    return 2
  }

  private getPlayersWithMajority (game: Game, propertySegments: Set<PlacedSegment>): Set<Player> {
    const pointsByPlayer = this.getFiguresOnProperty(game, propertySegments).reduce(
      (pointsByPlayer, placedFigure) => {
        return pointsByPlayer!.update(placedFigure!.player, 0, points => points + placedFigure!.figure.pointsTowardMajority)
      },
      Map<Player, number>()
    )

    const maxPoints = pointsByPlayer.max()
    return pointsByPlayer.filter(points => points === maxPoints).keySeq().toSet()
  }
}
