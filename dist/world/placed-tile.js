"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const direction_1 = require("./direction");
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
            .mapKeys(direction => this.tileToWorldDirection(direction))
            .toMap();
    }
    getEdge(direction) {
        return this.tile.edges.get(this.worldToTileDirection(direction));
    }
    tileToWorldDirection(direction) {
        const indexTile = direction_1.Direction.cardinals.indexOf(direction);
        const indexOrientation = direction_1.Direction.cardinals.indexOf(this.orientation);
        const index = (indexOrientation + indexTile) % direction_1.Direction.cardinals.size;
        return direction_1.Direction.cardinals.get(index);
    }
    worldToTileDirection(direction) {
        const indexTile = direction_1.Direction.cardinals.indexOf(direction);
        const indexOrientation = direction_1.Direction.cardinals.indexOf(this.orientation);
        const index = (direction_1.Direction.cardinals.size + indexTile - indexOrientation) % direction_1.Direction.cardinals.size;
        return direction_1.Direction.cardinals.get(index);
    }
    equals(other) {
        return this.tile === other.tile && this.position.equals(other.position) && this.orientation === other.orientation;
    }
}
exports.PlacedTile = PlacedTile;
//# sourceMappingURL=placed-tile.js.map