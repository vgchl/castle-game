"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TileEdge {
    constructor(segments) {
        this.segments = segments;
    }
    canConnectTo(otherTileEdge) {
        if (this.segments.size !== otherTileEdge.segments.size) {
            return false;
        }
        return this.segments.reverse().every((segment, index) => {
            return segment.constructor === otherTileEdge.segments.get(index).constructor;
        });
    }
    getSegmentsConnectedTo(segment, edge) {
        return this.segments.reverse()
            .filter((candidate, index) => edge.segments.get(index) === segment)
            .toList();
    }
    summary() {
        return this.segments.map(segment => segment.constructor.name.replace('Segment', '')).join(' ');
    }
}
exports.TileEdge = TileEdge;
//# sourceMappingURL=tile-edge.js.map