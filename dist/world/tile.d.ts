import { TileEdge } from './tile-edge';
import { Segment } from './segment';
import { Direction } from './direction';
import { Map, List } from 'immutable';
export declare class Tile {
    readonly segments: List<Segment>;
    readonly edges: Map<Direction, TileEdge>;
    constructor(edgeN: TileEdge, edgeE: TileEdge, edgeS: TileEdge, edgeW: TileEdge, segments: List<Segment>);
    getEdgesWithSegment(segment: Segment): Map<Direction, TileEdge>;
}
