import { Action } from './actions/action';
import { Game } from '../game';
import { List } from 'immutable';
export declare abstract class Phase {
    /**
     * Updates the game.
     *
     * @param game The current game state.
     */
    abstract update(game: Game): Game;
    /**
     * Lists the actions that are available given the game state.
     *
     * @param game The current game state.
     */
    abstract actions(game: Game): List<Action>;
}
