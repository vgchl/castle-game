import { Player } from './player';
import { World, TileSet } from './world/index';
import { Phase } from './phases/phase';
import { Turn, TurnProps } from './turn';
import { Action } from './phases/actions/action';
import { List } from 'immutable';
import { TurnPartProps } from './turn-part';
/**
 * Represents a single game of Castle.
 */
export declare class Game {
    readonly world: World;
    readonly players: List<Player>;
    readonly turns: List<Turn>;
    readonly phase: Phase;
    readonly tileSet: TileSet;
    private cachedActions?;
    constructor(props?: GameProps);
    readonly currentTurn: Turn;
    static setCurrentTurn(game: Game, turnProps: Partial<TurnProps>): List<Turn>;
    static setCurrentTurnPart(game: Game, turnPartProps: Partial<TurnPartProps>): List<Turn>;
    readonly actions: List<Action>;
    set(props: GameProps): Game;
    private update;
}
export interface GameProps {
    readonly world?: World;
    readonly players?: List<Player>;
    readonly turns?: List<Turn>;
    readonly phase?: Phase;
    readonly tileSet?: TileSet;
}
