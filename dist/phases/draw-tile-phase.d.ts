import { Phase } from './phase';
import { Game } from '../game';
import { List } from 'immutable';
import { Action } from './actions/action';
/**
 * In the DrawTilePhase a tile is drawn from the face-down remaining tiles.
 */
export declare class DrawTilePhase extends Phase {
    update(game: Game): Game;
    actions(game: Game): List<Action>;
    private setTileInTurn;
}
