import { Segment } from './segment'
import { List } from 'immutable'

export class TileEdge {
  constructor (public readonly segments: List<Segment>) {}

  canConnectTo (otherTileEdge: TileEdge): boolean {
    if (this.segments.size !== otherTileEdge.segments.size) {
      return false
    }
    return this.segments.reverse().every((segment, index) => {
      return segment!.constructor === otherTileEdge.segments.get(index!).constructor
    })
  }

  getSegmentsConnectedTo (segment: Segment, edge: TileEdge): List<Segment> {
    return this.segments.reverse()
      .filter((candidate, index) => edge.segments.get(index!) === segment)
      .toList()
  }

  summary (): string {
    return this.segments.map(segment => segment!.constructor.name.replace('Segment', '')).join(' ')
  }
}
