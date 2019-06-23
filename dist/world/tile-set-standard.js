"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const tile_set_1 = require("./tile-set");
const tile_d_1 = require("./tiles/tile-d");
const tile_v_1 = require("./tiles/tile-v");
class TileSetStandard extends tile_set_1.TileSet {
    constructor() {
        const tiles = immutable_1.List([
            new tile_d_1.TileD(),
            new tile_d_1.TileD(),
            new tile_d_1.TileD(),
            new tile_v_1.TileV(),
            new tile_d_1.TileD(),
            new tile_d_1.TileD(),
            new tile_v_1.TileV(),
            new tile_d_1.TileD(),
            new tile_d_1.TileD(),
            new tile_v_1.TileV(),
            new tile_d_1.TileD(),
            new tile_d_1.TileD(),
            new tile_v_1.TileV(),
            new tile_d_1.TileD(),
            new tile_d_1.TileD(),
            new tile_v_1.TileV(),
            new tile_d_1.TileD(),
            new tile_d_1.TileD(),
            new tile_v_1.TileV(),
            new tile_d_1.TileD(),
            new tile_d_1.TileD(),
            new tile_v_1.TileV()
        ]);
        super(tiles, new tile_d_1.TileD());
    }
}
exports.TileSetStandard = TileSetStandard;
//# sourceMappingURL=tile-set-standard.js.map