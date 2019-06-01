import { Phase } from './phase';
import { Game } from '../game';
import { List } from 'immutable';
import { Action } from './actions/action';
export declare class NewTurnPhase extends Phase {
    update(game: Game): Game;
    actions(game: Game): List<Action>;
    private getNextPlayer;
}
