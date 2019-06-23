import { List } from 'immutable';
import { Game } from '../game';
import { Action } from './actions/action';
import { Phase } from './phase';
export declare class PlaceTilePhase extends Phase {
    update(game: Game): Game;
    actions(game: Game): List<Action>;
    private getPlaceTileAction;
    private getPlaceFigureActions;
    private hasPlacedTile;
}
