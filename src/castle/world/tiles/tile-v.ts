import { Tile } from '../tile'
import { FarmSegment } from '../farm-segment'
import { RoadSegment } from '../road-segment'
import { TileEdge } from '../tile-edge'
import { List } from 'immutable'

export class TileV extends Tile {
  constructor () {
    let farmA = new FarmSegment('farmA')
    let farmB = new FarmSegment('farmB')
    let roadA = new RoadSegment('roadA')

    let edgeN = new TileEdge(List([farmA]))
    let edgeE = new TileEdge(List([farmA]))
    let edgeS = new TileEdge(List([farmA, roadA, farmB]))
    let edgeW = new TileEdge(List([farmB, roadA, farmA]))

    let segments = List([farmA, farmB, roadA])

    super(edgeN, edgeE, edgeS, edgeW, segments)
  }
}
