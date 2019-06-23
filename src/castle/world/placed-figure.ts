import { Figure } from './figure'
import { PlacedSegment } from './placed-segment'
import { PlacedTile } from './placed-tile'
import { Player } from '../player'

export class PlacedFigure {

  public static placedOnSegment (
    figure: Figure,
    placedSegment: PlacedSegment,
    player: Player
  ): PlacedFigure {
    return new PlacedFigure(figure, player, placedSegment)
  }

  public static placedOnTile (
    figure: Figure,
    placedTile: PlacedTile,
    player: Player
  ): PlacedFigure {
    return new PlacedFigure(figure, player, undefined, placedTile)
  }

  private constructor (
    public readonly figure: Figure,
    public readonly player: Player,
    public readonly placedSegment?: PlacedSegment,
    public readonly placedTile?: PlacedTile
  ) {}

}
