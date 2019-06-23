import { Figure } from './figure';
import { PlacedSegment } from './placed-segment';
import { PlacedTile } from './placed-tile';
import { Player } from '../player';
export declare class PlacedFigure {
    readonly figure: Figure;
    readonly player: Player;
    readonly placedSegment?: PlacedSegment | undefined;
    readonly placedTile?: PlacedTile | undefined;
    static placedOnSegment(figure: Figure, placedSegment: PlacedSegment, player: Player): PlacedFigure;
    static placedOnTile(figure: Figure, placedTile: PlacedTile, player: Player): PlacedFigure;
    private constructor();
}
