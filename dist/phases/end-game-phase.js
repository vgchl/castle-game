"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phase_1 = require("./phase");
const immutable_1 = require("immutable");
class EndGamePhase extends phase_1.Phase {
    actions(game) {
        return immutable_1.List();
    }
    update(game) {
        return game;
    }
}
exports.EndGamePhase = EndGamePhase;
//# sourceMappingURL=end-game-phase.js.map