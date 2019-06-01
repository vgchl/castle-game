import { Player } from './player';
import { Score } from './score';
import { List } from 'immutable';
import { TurnPart, TurnPartProps } from './turn-part';
export declare class Turn {
    readonly player: Player;
    readonly turnParts: List<TurnPart>;
    readonly scores: List<Score>;
    constructor(props: TurnProps);
    readonly currentTurnPart: TurnPart;
    setCurrentTurnPart(turnPartProps: TurnPartProps): Turn;
    set(props: Partial<TurnProps>): Turn;
}
export interface TurnProps {
    readonly player: Player;
    readonly turnParts?: List<TurnPart>;
    readonly scores?: List<Score>;
}
