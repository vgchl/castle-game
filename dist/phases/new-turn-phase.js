"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phase_1 = require("./phase");
const turn_1 = require("../turn");
const draw_tile_phase_1 = require("./draw-tile-phase");
const immutable_1 = require("immutable");
class NewTurnPhase extends phase_1.Phase {
    update(game) {
        let turn = new turn_1.Turn({ player: this.getNextPlayer(game) });
        let turns = game.turns.push(turn);
        let phase = new draw_tile_phase_1.DrawTilePhase();
        return game.set({ phase, turns });
    }
    actions(game) {
        return immutable_1.List();
    }
    getNextPlayer(game) {
        let players = game.players;
        if (game.turns.isEmpty()) {
            return players.first();
        }
        let currentPlayerIndex = players.indexOf(game.currentTurn.player);
        return players.get((currentPlayerIndex + 1) % players.size);
    }
}
exports.NewTurnPhase = NewTurnPhase;
//# sourceMappingURL=new-turn-phase.js.map