"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./action");
const score_phase_1 = require("../score-phase");
class ConfirmAction extends action_1.Action {
    confirm() {
        return this.game.set({
            phase: new score_phase_1.ScorePhase()
        });
    }
}
exports.ConfirmAction = ConfirmAction;
//# sourceMappingURL=confirm-action.js.map