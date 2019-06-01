import { PlacedTile } from './placed-tile'
import { Segment } from './segment'

export class PlacedSegment {
  public constructor (public readonly segment: Segment,
                      public readonly placedTile: PlacedTile) {}

  public equals (other: PlacedSegment): boolean {
    if (!other) {
      return false
    }
    return this.segment === other.segment && this.placedTile.equals(other.placedTile)
  }
}
