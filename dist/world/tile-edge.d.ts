import { Segment } from './segment';
import { List } from 'immutable';
export declare class TileEdge {
    readonly segments: List<Segment>;
    constructor(segments: List<Segment>);
    canConnectTo(otherTileEdge: TileEdge): boolean;
    getSegmentsConnectedTo(segment: Segment, edge: TileEdge): List<Segment>;
    summary(): string;
}
