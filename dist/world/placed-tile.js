"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const placed_segment_1 = require("./placed-segment");
class PlacedTile {
    constructor(tile, position, orientation) {
        this.tile = tile;
        this.position = position;
        this.orientation = orientation;
    }
    get placedSegments() {
        return this.tile.segments.map(segment => new placed_segment_1.PlacedSegment(segment, this)).toList();
    }
    getEdgesWithSegment(segment) {
        return this.tile.getEdgesWithSegment(segment)
            .mapKeys(direction => direction.relativeTo(this.orientation))
            .toMap();
    }
    getEdge(direction) {
        return this.tile.edges.get(direction.relativeTo(this.orientation));
    }
    equals(other) {
        return this.tile === other.tile && this.position.equals(other.position) && this.orientation === other.orientation;
    }
}
exports.PlacedTile = PlacedTile;
//# sourceMappingURL=placed-tile.js.map