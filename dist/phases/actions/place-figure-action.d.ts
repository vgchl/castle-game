import { List } from 'immutable';
import { Action } from './action';
import { Game } from '../../game';
import { Figure } from '../../world/figure';
import { Player } from '../../player';
import { PlacedFigure } from '../../world/placed-figure';
export declare class PlaceFigureAction extends Action {
    readonly figure: Figure;
    readonly possiblePlacements: List<PlacedFigure>;
    constructor(game: Game, player: Player, figure: Figure);
    placeFigure(placedFigure: PlacedFigure): Game;
    private getPossiblePlacements;
}
