import { List } from 'immutable'
import { Tile, TileSet } from '../../../../src/castle/world'

describe('TileSet', () => {
  describe('#pickTile', () => {
    it('picks a tile from the facing down tiles', () => {
      const tileA = {} as Tile
      const tileB = {} as Tile
      const tileC = {} as Tile
      const tiles = List([
        tileB,
        tileC
      ])
      let tileSet = new TileSet(tiles, tileA)

      expect(tileSet.tileFacedUp).toBe(tileA)
      expect(tileSet.tilesRemaining).toBe(2)
      tileSet = tileSet.pickTile()
      expect(tileSet.tileFacedUp).toBe(tileB)
      expect(tileSet.tilesRemaining).toBe(1)
      tileSet = tileSet.pickTile()
      expect(tileSet.tileFacedUp).toBe(tileC)
      expect(tileSet.tilesRemaining).toBe(0)
    })
  })
})
