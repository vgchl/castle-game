import { PlacedTile } from './placed-tile';
import { Position } from './position';
import { Map, Set, List } from 'immutable';
import { PlacedFigure } from './placed-figure';
import { Tile } from './tile';
import { Direction } from './direction';
import { Figure } from './figure';
import { Player } from '../player';
import { PlacedSegment } from './placed-segment';
/**
 * Represents the 'board' of the game, consisting of the tiles that make up the farms, roads and cities.
 */
export declare class World {
    /**
     * The tiles that make up the world.
     */
    readonly tiles: Map<Position, PlacedTile>;
    /**
     * The figures placed in the world.
     */
    readonly figures: Set<PlacedFigure>;
    /**
     * Create a new World.
     *
     * @param props World properties
     */
    constructor(props?: WorldProps);
    /**
     * Expands the world by placing a tile on the board.
     *
     * @param tile The tile to place
     * @param position Where the tile should be placed
     * @param orientation In what orientation the tile should be placed
     */
    placeTile(tile: Tile, position: Position, orientation: Direction): World;
    /**
     * Checks whether a tile fits a certain position on the board.
     *
     * @param tile The tile to place
     * @param position Where the tile should be placed
     * @param orientation In what orientation the tile should be placed
     * @returns Whether the tile can be placed
     */
    canPlaceTile(tile: Tile, position: Position, orientation: Direction): boolean;
    /**
     * Finds all positions and orientations at which the provided tile can be placed.
     *
     * @param tile The tile to place
     * @returns The positions at which the tile can be placed, and what orientations are valid for that position
     */
    getPossibleTilePlacements(tile: Tile): Map<Position, List<Direction>>;
    /**
     * Finds all segments connected to the given segment of the given placed tile.
     * The given placed tile does not have to be part of the world yet.
     *
     * @param segment The segment to find all connected segments for
     * @param placedTile The placed tile containing the starting segment
     * @returns All connected segments
     */
    getConnectedSegments(placedSegment: PlacedSegment): List<PlacedSegment>;
    /**
     * Finds all possible placements for the provided figures.
     *
     * @param figures The figures that the player may be place.
     * @param placedTile The tile that was placed during this turn.
     */
    getPossibleFigurePlacements(figure: Figure, placedTile: PlacedTile, player: Player): List<PlacedFigure>;
    canPlaceFigure(placedFigure: PlacedFigure): boolean;
    placeFigure(placedFigure: PlacedFigure): World;
    /**
     * Checks whether a segment is occupied. Optionally, it checks only whether the segment is occupied by a given player.
     *
     * @param segment The segment
     * @param player (Optional) By what player the segment is occupied
     */
    isOccupied(placedSegment: PlacedSegment, player?: Player): boolean;
    isCompleted(placedSegments: Set<PlacedSegment>): boolean;
    /**
     * Get the PlacedTile where a figure is placed.
     *
     * @param figure The figure
     */
    getPlacedTileFor(figure: Figure): PlacedTile | undefined;
    /**
     * Create a new World based on this one with overwritten properties.
     *
     * @param props The properties to overwrite
     */
    set(props: WorldProps): World;
}
export interface WorldProps {
    readonly tiles?: Map<Position, PlacedTile>;
    readonly figures?: Set<PlacedFigure>;
}
