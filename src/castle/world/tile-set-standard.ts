import { List } from 'immutable'
import { TileSet } from './tile-set'
import { TileD } from './tiles/tile-d'
import { TileV } from './tiles/tile-v'

export class TileSetStandard extends TileSet {
  constructor () {
    const tiles = List([
      new TileD(),
      new TileD(),
      new TileD(),
      new TileV(),
      new TileD(),
      new TileD(),
      new TileV(),
      new TileD(),
      new TileD(),
      new TileV(),
      new TileD(),
      new TileD(),
      new TileV(),
      new TileD(),
      new TileD(),
      new TileV(),
      new TileD(),
      new TileD(),
      new TileV(),
      new TileD(),
      new TileD(),
      new TileV()
    ])
    super(tiles, new TileD())
  }
}
