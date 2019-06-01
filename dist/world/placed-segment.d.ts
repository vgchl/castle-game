import { PlacedTile } from './placed-tile';
import { Segment } from './segment';
export declare class PlacedSegment {
    readonly segment: Segment;
    readonly placedTile: PlacedTile;
    constructor(segment: Segment, placedTile: PlacedTile);
    equals(other: PlacedSegment): boolean;
}
