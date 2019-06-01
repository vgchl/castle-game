import { List } from 'immutable'
import { Tile } from './tile'

/**
 * A TileSet contains all remaining tiles that have not been placed in the World yet.
 */
export class TileSet {
  /**
   * Creates a tile set.
   *
   * @param tilesFacedDown The remaining, face-down tiles.
   * @param tileFacedUp Optional, the face-up tile to be used next.
   */
  constructor (private readonly tilesFacedDown: List<Tile>, public readonly tileFacedUp?: Tile) {}

  /**
   * Returns the remaining number of tiles (the faced down tiles).
   */
  public get tilesRemaining (): number {
    return this.tilesFacedDown.size
  }

  /**
   * Shuffles a list of tiles in a random order.
   * For testing purposes, a custom random generator can be provided.
   *
   * @param tiles The tiles to be shuffled.
   * @param random Optional, the random generator to use for shuffling.
   */
  public static shuffle (tiles: List<Tile>, random: () => number = Math.random): List<Tile> {
    let counter = tiles.size - 1
    while (counter > 1) {
      let index = Math.floor(random() * (counter))
      counter--
      let temp = tiles.get(counter)
      tiles = tiles.set(counter, tiles.get(index))
      tiles = tiles.set(index, temp)
    }
    return tiles
  }

  public canPickTile (): boolean {
    return this.tilesFacedDown.size > 0
  }

  /**
   * Picks a tile from the remaining face-down tiles.
   *
   * @returns A new TileSet with a new tileFacedUp.
   */
  public pickTile (): TileSet {
    let pickedTile = this.tilesFacedDown.first()
    // tslint:disable-next-line:no-unnecessary-type-assertion
    let remainingTiles = this.tilesFacedDown.slice(1) as List<Tile>
    return new TileSet(remainingTiles, pickedTile)
  }
}
