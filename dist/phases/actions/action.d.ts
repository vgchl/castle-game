import { Player } from '../../player';
import { Game } from '../../game';
export declare abstract class Action {
    readonly game: Game;
    readonly player: Player;
    constructor(game: Game, player: Player);
}
