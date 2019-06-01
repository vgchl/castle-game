"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = require("../../world");
const action_1 = require("./action");
const game_1 = require("../../game");
/**
 * Handles the action of placing a new tile in the world.
 */
class PlaceTileAction extends action_1.Action {
    constructor() {
        super(...arguments);
        /**
         * Lists the possible positions and orientations at which the drawn tile can be placed.
         */
        this.possibleTilePlacements = this.getPossibleTilePlacements();
    }
    /**
     * Places the tile in the world.
     *
     * @param position The position at which the tile will be placed
     * @param orientation The orientation at which the tile will be placed
     * @param game The current game state
     */
    placeTile(position, orientation) {
        let turnPart = this.game.currentTurn.currentTurnPart;
        let world = this.game.world.placeTile(turnPart.tile, position, orientation);
        return this.game
            .set({
            world,
            turns: game_1.Game.setCurrentTurnPart(this.game, {
                tilePlacement: new world_1.PlacedTile(turnPart.tile, position, orientation),
                figurePlacement: undefined,
                gameBeforeTilePlacement: this.game
            })
        });
    }
    getPossibleTilePlacements() {
        let turnPart = this.game.currentTurn.currentTurnPart;
        return this.game.world.getPossibleTilePlacements(turnPart.tile);
    }
}
exports.PlaceTileAction = PlaceTileAction;
//# sourceMappingURL=place-tile-action.js.map