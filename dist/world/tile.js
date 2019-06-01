"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const direction_1 = require("./direction");
const immutable_1 = require("immutable");
class Tile {
    constructor(edgeN, edgeE, edgeS, edgeW, segments) {
        this.segments = segments;
        this.edges = immutable_1.Map([
            [direction_1.Direction.north, edgeN],
            [direction_1.Direction.east, edgeE],
            [direction_1.Direction.south, edgeS],
            [direction_1.Direction.west, edgeW]
        ]);
    }
    getEdgesWithSegment(segment) {
        return this.edges.filter(edge => edge.segments.indexOf(segment) >= 0).toMap();
    }
}
exports.Tile = Tile;
//# sourceMappingURL=tile.js.map