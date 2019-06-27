import { Direction } from './direction';
import { TileEdge } from './tile-edge';
import { Segment } from './segment';
import { Tile } from './tile';
import { Position } from './position';
import { Map, List } from 'immutable';
import { PlacedSegment } from './placed-segment';
export declare class PlacedTile {
    readonly tile: Tile;
    readonly position: Position;
    readonly orientation: Direction;
    constructor(tile: Tile, position: Position, orientation: Direction);
    readonly placedSegments: List<PlacedSegment>;
    getEdgesWithSegment(segment: Segment): Map<Direction, TileEdge>;
    getEdge(direction: Direction): TileEdge;
    private tileToWorldDirection;
    private worldToTileDirection;
    equals(other: PlacedTile): boolean;
}
