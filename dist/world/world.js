"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const placed_tile_1 = require("./placed-tile");
const immutable_1 = require("immutable");
const game_rule_violation_error_1 = require("../game-rule-violation-error");
const direction_1 = require("./direction");
const figure_1 = require("./figure");
const figure_placement_1 = require("./figure-placement");
const placed_segment_1 = require("./placed-segment");
/**
 * Represents the 'board' of the game, consisting of the tiles that make up the farms, roads and cities.
 */
class World {
    /**
     * Create a new World.
     *
     * @param props World properties
     */
    constructor(props = {}) {
        this.tiles = props.tiles || immutable_1.Map();
        this.figures = props.figures || immutable_1.Set();
    }
    /**
     * Expands the world by placing a tile on the board.
     *
     * @param tile The tile to place
     * @param position Where the tile should be placed
     * @param orientation In what orientation the tile should be placed
     */
    placeTile(tile, position, orientation) {
        if (!this.canPlaceTile(tile, position, orientation)) {
            throw new game_rule_violation_error_1.GameRuleViolationError('Tile may not be placed there.');
        }
        let tiles = this.tiles.set(position, new placed_tile_1.PlacedTile(tile, position, orientation));
        return this.set({ tiles });
    }
    /**
     * Checks whether a tile fits a certain position on the board.
     *
     * @param tile The tile to place
     * @param position Where the tile should be placed
     * @param orientation In what orientation the tile should be placed
     * @returns Whether the tile can be placed
     */
    canPlaceTile(tile, position, orientation) {
        return direction_1.Direction.cardinals.every(direction => {
            direction = direction;
            let neighbourTile = this.tiles.get(position.getNeighbour(direction));
            if (!neighbourTile) {
                return true;
            }
            let neighbourEdge = neighbourTile.getEdge(direction.getOpposite());
            return tile.edges.get(direction.relativeTo(orientation)).canConnectTo(neighbourEdge);
        });
    }
    /**
     * Finds all positions and orientations at which the provided tile can be placed.
     *
     * @param tile The tile to place
     * @returns The positions at which the tile can be placed, and what orientations are valid for that position
     */
    getPossibleTilePlacements(tile) {
        let options = immutable_1.Map();
        this.tiles.forEach(placedTile => {
            placedTile.position.getNeighbours(direction_1.Direction.cardinals).forEach(neighbourPosition => {
                if (!this.tiles.has(neighbourPosition) && !options.has(neighbourPosition)) {
                    const orientations = direction_1.Direction.cardinals.filter(orientation => this.canPlaceTile(tile, neighbourPosition, orientation));
                    if (orientations.size > 0) {
                        options = options.set(neighbourPosition, orientations.toList());
                    }
                }
            });
        });
        return options;
    }
    /**
     * Finds all segments connected to the given segment of the given placed tile.
     * The given placed tile does not have to be part of the world yet.
     *
     * @param segment The segment to find all connected segments for
     * @param placedTile The placed tile containing the starting segment
     * @returns All connected segments
     */
    getConnectedSegments(placedSegment) {
        let world = this.placeTile(placedSegment.placedTile.tile, placedSegment.placedTile.position, placedSegment.placedTile.orientation);
        let todo = [placedSegment];
        let placedSegments = [];
        while (todo.length > 0) {
            placedSegment = todo.pop();
            placedSegments.push(placedSegment);
            placedSegment.placedTile.getEdgesWithSegment(placedSegment.segment).forEach((edge, direction) => {
                const neighbourTile = world.tiles.get(placedSegment.placedTile.position.getNeighbour(direction));
                if (neighbourTile) {
                    const neighbourSegments = neighbourTile
                        .getEdge(direction.getOpposite())
                        .getSegmentsConnectedTo(placedSegment.segment, edge)
                        .filter(neighbourSegment => todo.concat(placedSegments).map(placedSegment => placedSegment.segment).indexOf(neighbourSegment) < 0) // TODO: Use Sets instead of filter
                        .map(neighbourSegment => new placed_segment_1.PlacedSegment(neighbourSegment, neighbourTile))
                        .toList();
                    todo = todo.concat(neighbourSegments.toJS());
                }
            });
        }
        return immutable_1.List(placedSegments);
    }
    /**
     * Finds all possible placements for the provided figures.
     *
     * @param figures The figures that the player may be place.
     * @param placedTile The tile that was placed during this turn.
     */
    getPossibleFigurePlacements(figure, placedTile, player) {
        switch (figure) {
            case figure_1.Figure.follower:
            case figure_1.Figure.largeFollower:
                return figure_placement_1.getPossibleFollowerPlacements(this, figure, placedTile, player);
            case figure_1.Figure.builder:
                return figure_placement_1.getPossibleBuilderPlacements(this, placedTile, player);
            case figure_1.Figure.fairy:
                return figure_placement_1.getPossibleFairyPlacements(this, player);
            case figure_1.Figure.dragon:
                return figure_placement_1.getPossibleDragonPlacements(this);
            default:
                throw new Error('Unknown follower type');
        }
    }
    // TODO Support builder
    canPlaceFigure(placedFigure) {
        return this.getConnectedSegments(placedFigure.placedSegment)
            .every(placedSegment => !this.isOccupied(placedSegment));
    }
    placeFigure(placedFigure) {
        if (!this.canPlaceFigure(placedFigure)) {
            throw new game_rule_violation_error_1.GameRuleViolationError('Can not place figure here.');
        }
        return this.set({
            figures: this.figures.add(placedFigure)
        });
    }
    /**
     * Checks whether a segment is occupied. Optionally, it checks only whether the segment is occupied by a given player.
     *
     * @param segment The segment
     * @param player (Optional) By what player the segment is occupied
     */
    isOccupied(placedSegment, player) {
        return this.figures.some(placedFigure => {
            return placedFigure.placedSegment.equals(placedSegment)
                && !placedFigure.figure.isNeutral
                && (!player || placedFigure.player === player);
        });
    }
    // TODO: Support cloisters
    isCompleted(placedSegments) {
        return placedSegments.every(placedSegment => placedSegment.placedTile.getEdgesWithSegment(placedSegment.segment).keySeq()
            .every(direction => this.tiles.has(placedSegment.placedTile.position.getNeighbour(direction))));
    }
    /**
     * Get the PlacedTile where a figure is placed.
     *
     * @param figure The figure
     */
    getPlacedTileFor(figure) {
        return this.figures
            .filter(placedFigure => placedFigure.figure === figure)
            .map(placedFigure => placedFigure.placedTile)
            .first();
    }
    /**
     * Create a new World based on this one with overwritten properties.
     *
     * @param props The properties to overwrite
     */
    set(props) {
        return new World(Object.assign({ tiles: this.tiles, figures: this.figures }, props));
    }
}
exports.World = World;
//# sourceMappingURL=world.js.map