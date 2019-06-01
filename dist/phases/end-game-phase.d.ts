import { Phase } from './phase';
import { List } from 'immutable';
import { Game } from '../game';
import { Action } from './actions/action';
export declare class EndGamePhase extends Phase {
    actions(game: Game): List<Action>;
    update(game: Game): Game;
}
