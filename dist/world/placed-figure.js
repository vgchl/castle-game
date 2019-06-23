"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlacedFigure {
    constructor(figure, player, placedSegment, placedTile) {
        this.figure = figure;
        this.player = player;
        this.placedSegment = placedSegment;
        this.placedTile = placedTile;
    }
    static placedOnSegment(figure, placedSegment, player) {
        return new PlacedFigure(figure, player, placedSegment);
    }
    static placedOnTile(figure, placedTile, player) {
        return new PlacedFigure(figure, player, undefined, placedTile);
    }
}
exports.PlacedFigure = PlacedFigure;
//# sourceMappingURL=placed-figure.js.map