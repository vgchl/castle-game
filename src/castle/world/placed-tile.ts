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
      .mapKeys(direction => this.tileToWorldDirection(direction!))
      .toMap()
  }

  public getEdge (direction: Direction): TileEdge {
    return this.tile.edges.get(this.worldToTileDirection(direction))
  }

  private tileToWorldDirection (direction: Direction): Direction {
    const indexTile = Direction.cardinals.indexOf(direction)
    const indexOrientation = Direction.cardinals.indexOf(this.orientation)
    const index = (indexOrientation + indexTile) % Direction.cardinals.size
    return Direction.cardinals.get(index)
  }

  private worldToTileDirection (direction: Direction): Direction {
    const indexTile = Direction.cardinals.indexOf(direction)
    const indexOrientation = Direction.cardinals.indexOf(this.orientation)
    const index = (Direction.cardinals.size + indexTile - indexOrientation) % Direction.cardinals.size
    return Direction.cardinals.get(index)
  }

  public equals (other: PlacedTile): boolean {
    return this.tile === other.tile && this.position.equals(other.position) && this.orientation === other.orientation
  }
}
