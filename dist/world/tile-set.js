"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A TileSet contains all remaining tiles that have not been placed in the World yet.
 */
class TileSet {
    /**
     * Creates a tile set.
     *
     * @param tilesFacedDown The remaining, face-down tiles.
     * @param tileFacedUp Optional, the face-up tile to be used next.
     */
    constructor(tilesFacedDown, tileFacedUp) {
        this.tilesFacedDown = tilesFacedDown;
        this.tileFacedUp = tileFacedUp;
    }
    /**
     * Returns the remaining number of tiles (the faced down tiles).
     */
    get tilesRemaining() {
        return this.tilesFacedDown.size;
    }
    /**
     * Shuffles a list of tiles in a random order.
     * For testing purposes, a custom random generator can be provided.
     *
     * @param tiles The tiles to be shuffled.
     * @param random Optional, the random generator to use for shuffling.
     */
    static shuffle(tiles, random = Math.random) {
        let counter = tiles.size - 1;
        while (counter > 1) {
            let index = Math.floor(random() * (counter));
            counter--;
            let temp = tiles.get(counter);
            tiles = tiles.set(counter, tiles.get(index));
            tiles = tiles.set(index, temp);
        }
        return tiles;
    }
    canPickTile() {
        return this.tilesFacedDown.size > 0;
    }
    /**
     * Picks a tile from the remaining face-down tiles.
     *
     * @returns A new TileSet with a new tileFacedUp.
     */
    pickTile() {
        let pickedTile = this.tilesFacedDown.first();
        // tslint:disable-next-line:no-unnecessary-type-assertion
        let remainingTiles = this.tilesFacedDown.slice(1);
        return new TileSet(remainingTiles, pickedTile);
    }
}
exports.TileSet = TileSet;
//# sourceMappingURL=tile-set.js.map