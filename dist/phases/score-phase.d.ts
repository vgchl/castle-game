import { Phase } from './phase';
import { Game } from '../game';
import { Action } from './actions/action';
import { List } from 'immutable';
export declare class ScorePhase extends Phase {
    update(game: Game): Game;
    actions(game: Game): List<Action>;
    private getCompletedProperties;
    private scoreProperty;
    private getFiguresOnProperty;
    private scoreCity;
    private getPointsPerTile;
    private getPlayersWithMajority;
}
