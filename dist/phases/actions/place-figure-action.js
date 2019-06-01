"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./action");
const game_1 = require("../../game");
const game_rule_violation_error_1 = require("../../game-rule-violation-error");
class PlaceFigureAction extends action_1.Action {
    constructor(game, player, figure) {
        super(game, player);
        this.figure = figure;
        this.possiblePlacements = this.getPossiblePlacements();
    }
    placeFigure(placedFigure) {
        if (!this.game.world.canPlaceFigure(placedFigure)) {
            throw new game_rule_violation_error_1.GameRuleViolationError('Can not place figure there.');
        }
        let world = this.game.world.placeFigure(placedFigure);
        return this.game
            .set({
            world,
            turns: game_1.Game.setCurrentTurnPart(this.game, {
                figurePlacement: placedFigure,
                gameBeforeFigurePlacement: this.game
            })
        });
    }
    getPossiblePlacements() {
        let turn = this.game.currentTurn;
        let turnPart = turn.currentTurnPart;
        return this.game.world.getPossibleFigurePlacements(this.figure, turnPart.tilePlacement, turn.player);
    }
}
exports.PlaceFigureAction = PlaceFigureAction;
//# sourceMappingURL=place-figure-action.js.map