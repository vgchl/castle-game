import { List, Map } from 'immutable';
import { Direction } from '../../world';
import { Action } from './action';
import { Position } from '../../world/position';
import { Game } from '../../game';
/**
 * Handles the action of placing a new tile in the world.
 */
export declare class PlaceTileAction extends Action {
    /**
     * Lists the possible positions and orientations at which the drawn tile can be placed.
     */
    readonly possibleTilePlacements: Map<Position, List<Direction>>;
    /**
     * Places the tile in the world.
     *
     * @param position The position at which the tile will be placed
     * @param orientation The orientation at which the tile will be placed
     * @param game The current game state
     */
    placeTile(position: Position, orientation: Direction): Game;
    private getPossibleTilePlacements;
}
