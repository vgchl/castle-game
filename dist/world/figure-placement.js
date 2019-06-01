"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const figure_1 = require("./figure");
const direction_1 = require("./direction");
const collection_util_1 = require("../utils/collection-util");
function getPossibleFollowerPlacements(world, figure, placedTile, player) {
    return placedTile.placedSegments
        .filter(segment => world.getConnectedSegments(segment).every(segment => !world.isOccupied(segment)))
        .map(segment => ({ figure, placedSegment: segment, player })).toList();
}
exports.getPossibleFollowerPlacements = getPossibleFollowerPlacements;
function getPossibleBuilderPlacements(world, placedTile, player) {
    return placedTile.placedSegments
        .filter(segment => world.getConnectedSegments(segment).some(segment => world.isOccupied(segment, player)))
        .map(placedSegment => ({ figure: figure_1.Figure.builder, placedSegment }))
        .toList();
}
exports.getPossibleBuilderPlacements = getPossibleBuilderPlacements;
function getPossibleFairyPlacements(world, player) {
    let fairyPlacedTile = world.getPlacedTileFor(figure_1.Figure.fairy);
    return world.figures
        .filter(placedFigure => placedFigure.player === player && placedFigure.placedTile !== fairyPlacedTile)
        .map(placedFigure => placedFigure.placedTile)
        .reduce(collection_util_1.uniqueBy(placedTile => placedTile.position), immutable_1.List())
        .map(placedTile => ({ figure: figure_1.Figure.fairy, placedTile: placedTile })).toList();
}
exports.getPossibleFairyPlacements = getPossibleFairyPlacements;
function getPossibleDragonPlacements(world) {
    let dragonPlacedTile = world.getPlacedTileFor(figure_1.Figure.dragon);
    if (!dragonPlacedTile) {
        return immutable_1.List();
    }
    let fairyPlacedTile = world.getPlacedTileFor(figure_1.Figure.fairy);
    return dragonPlacedTile.position.getNeighbours(direction_1.Direction.cardinals)
        .filter(position => world.tiles.has(position) && (!fairyPlacedTile || !position.equals(fairyPlacedTile.position)))
        .map(position => ({ figure: figure_1.Figure.dragon, placedTile: world.tiles.get(position) }))
        .toList();
}
exports.getPossibleDragonPlacements = getPossibleDragonPlacements;
//# sourceMappingURL=figure-placement.js.map