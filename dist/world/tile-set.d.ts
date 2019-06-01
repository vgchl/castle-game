import { List } from 'immutable';
import { Tile } from './tile';
/**
 * A TileSet contains all remaining tiles that have not been placed in the World yet.
 */
export declare class TileSet {
    private readonly tilesFacedDown;
    readonly tileFacedUp?: Tile | undefined;
    /**
     * Creates a tile set.
     *
     * @param tilesFacedDown The remaining, face-down tiles.
     * @param tileFacedUp Optional, the face-up tile to be used next.
     */
    constructor(tilesFacedDown: List<Tile>, tileFacedUp?: Tile | undefined);
    /**
     * Returns the remaining number of tiles (the faced down tiles).
     */
    readonly tilesRemaining: number;
    /**
     * Shuffles a list of tiles in a random order.
     * For testing purposes, a custom random generator can be provided.
     *
     * @param tiles The tiles to be shuffled.
     * @param random Optional, the random generator to use for shuffling.
     */
    static shuffle(tiles: List<Tile>, random?: () => number): List<Tile>;
    canPickTile(): boolean;
    /**
     * Picks a tile from the remaining face-down tiles.
     *
     * @returns A new TileSet with a new tileFacedUp.
     */
    pickTile(): TileSet;
}
