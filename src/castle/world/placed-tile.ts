import { Direction } from './direction'
import { TileEdge } from './tile-edge'
import { Segment } from './segment'
import { Tile } from './tile'
import { Position } from './position'
import { Map, List } from 'immutable'
import { PlacedSegment } from './placed-segment'

export class PlacedTile {
  constructor (public readonly tile: Tile,
               public readonly position: Position,
               public readonly orientation: Direction) {}

  public get placedSegments (): List<PlacedSegment> {
    return this.tile.segments.map(segment => new PlacedSegment(segment!, this)).toList()
  }

  public getEdgesWithSegment (segment: Segment): Map<Direction, TileEdge> {
    return this.tile.getEdgesWithSegment(segment)
      .mapKeys(direction => direction!.relativeTo(this.orientation))
      .toMap()
  }

  public getEdge (direction: Direction): TileEdge {
    return this.tile.edges.get(direction.relativeTo(this.orientation))
  }

  public equals (other: PlacedTile): boolean {
    return this.tile === other.tile && this.position.equals(other.position) && this.orientation === other.orientation
  }
}
