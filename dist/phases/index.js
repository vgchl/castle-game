"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var draw_tile_phase_1 = require("./draw-tile-phase");
exports.DrawTilePhase = draw_tile_phase_1.DrawTilePhase;
var end_game_phase_1 = require("./end-game-phase");
exports.EndGamePhase = end_game_phase_1.EndGamePhase;
var new_turn_phase_1 = require("./new-turn-phase");
exports.NewTurnPhase = new_turn_phase_1.NewTurnPhase;
var phase_1 = require("./phase");
exports.Phase = phase_1.Phase;
var place_tile_phase_1 = require("./place-tile-phase");
exports.PlaceTilePhase = place_tile_phase_1.PlaceTilePhase;
var score_phase_1 = require("./score-phase");
exports.ScorePhase = score_phase_1.ScorePhase;
__export(require("./actions"));
//# sourceMappingURL=index.js.map