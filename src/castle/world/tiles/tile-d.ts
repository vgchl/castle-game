import { Tile } from '../tile'
import { CitySegment } from '../city-segment'
import { FarmSegment } from '../farm-segment'
import { RoadSegment } from '../road-segment'
import { TileEdge } from '../tile-edge'
import { List } from 'immutable'

export class TileD extends Tile {
  constructor () {
    let cityA = new CitySegment('cityA')
    let farmA = new FarmSegment('farmA')
    let farmB = new FarmSegment('farmB')
    let roadA = new RoadSegment('roadA')

    let edgeN = new TileEdge(List([farmA, roadA, farmB]))
    let edgeE = new TileEdge(List([cityA]))
    let edgeS = new TileEdge(List([farmB, roadA, farmA]))
    let edgeW = new TileEdge(List([farmA]))

    let segments = List([cityA, farmA, farmB, roadA])

    super(edgeN, edgeE, edgeS, edgeW, segments)
  }
}
