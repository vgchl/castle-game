"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phase_1 = require("./phase");
const immutable_1 = require("immutable");
const place_tile_action_1 = require("./actions/place-tile-action");
const place_figure_action_1 = require("./actions/place-figure-action");
const figure_1 = require("../world/figure");
const confirm_action_1 = require("./actions/confirm-action");
class PlaceTilePhase extends phase_1.Phase {
    update(game) {
        return game;
    }
    actions(game) {
        let actions = immutable_1.List();
        actions = actions.push(this.getPlaceTileAction(game));
        if (this.hasPlacedTile(game)) {
            actions = actions
                .concat(this.getPlaceFigureActions(game))
                .concat(new confirm_action_1.ConfirmAction(game, game.currentTurn.player)).toList();
        }
        return actions;
    }
    getPlaceTileAction(game) {
        let gameBeforeTilePlacement = game.currentTurn.currentTurnPart.gameBeforeTilePlacement || game;
        return new place_tile_action_1.PlaceTileAction(gameBeforeTilePlacement, game.currentTurn.player);
    }
    getPlaceFigureActions(game) {
        let gameBeforeFigurePlacement = game.currentTurn.currentTurnPart.gameBeforeFigurePlacement || game;
        return figure_1.Figure.all
            // TODO filter figures from enabled extensions
            // TODO filter figures still available to the player
            .map(figure => new place_figure_action_1.PlaceFigureAction(gameBeforeFigurePlacement, game.currentTurn.player, figure))
            .filter(action => action.possiblePlacements.size > 0).toList();
    }
    hasPlacedTile(game) {
        return !!game.currentTurn.currentTurnPart.tilePlacement;
    }
}
exports.PlaceTilePhase = PlaceTilePhase;
//# sourceMappingURL=place-tile-phase.js.map