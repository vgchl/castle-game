"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlacedSegment {
    constructor(segment, placedTile) {
        this.segment = segment;
        this.placedTile = placedTile;
    }
    equals(other) {
        if (!other) {
            return false;
        }
        return this.segment.id === other.segment.id && this.placedTile.equals(other.placedTile);
    }
}
exports.PlacedSegment = PlacedSegment;
//# sourceMappingURL=placed-segment.js.map