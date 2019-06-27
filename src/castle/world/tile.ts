import { TileEdge } from './tile-edge'
import { Segment } from './segment'
import { Direction } from './direction'
import { Map, List } from 'immutable'

export abstract class Tile {
  public readonly edges: Map<Direction, TileEdge>

  constructor (
    edgeN: TileEdge,
    edgeE: TileEdge,
    edgeS: TileEdge,
    edgeW: TileEdge,
    public readonly segments: List<Segment>
  ) {
    this.edges = Map([
      [Direction.north, edgeN],
      [Direction.east, edgeE],
      [Direction.south, edgeS],
      [Direction.west, edgeW]
    ])
  }

  public getEdgesWithSegment (segment: Segment): Map<Direction, TileEdge> {
    return this.edges.filter(edge => edge!.segments.indexOf(segment) >= 0).toMap()
  }
}
