import { Tile } from './world/tile';
import { PlacedTile } from './world/placed-tile';
import { PlacedFigure } from './world/placed-figure';
import { Game } from './game';
/**
 * A part of a turn. When playing with the Builder figure, a turn can have two turn parts.
 * During a single turn part, a tile is drawn and placed, optionally figures are placed, and it is then scored.
 */
export declare class TurnPart {
    readonly tile: Tile;
    readonly tilePlacement?: PlacedTile;
    readonly figurePlacement?: PlacedFigure;
    readonly gameBeforeTilePlacement?: Game;
    readonly gameBeforeFigurePlacement?: Game;
    readonly gameBeforeDragonMovement?: Game;
    constructor(props: TurnPartProps);
    set(props: Partial<TurnPartProps>): TurnPart;
}
export interface TurnPartProps {
    readonly tile: Tile;
    readonly tilePlacement?: PlacedTile;
    readonly figurePlacement?: PlacedFigure;
    readonly gameBeforeTilePlacement?: Game;
    readonly gameBeforeFigurePlacement?: Game;
    readonly gameBeforeDragonMovement?: Game;
}
