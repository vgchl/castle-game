"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phase_1 = require("./phase");
const place_tile_phase_1 = require("./place-tile-phase");
const turn_part_1 = require("../turn-part");
const immutable_1 = require("immutable");
const end_game_phase_1 = require("./end-game-phase");
/**
 * In the DrawTilePhase a tile is drawn from the face-down remaining tiles.
 */
class DrawTilePhase extends phase_1.Phase {
    update(game) {
        let tileSet = game.tileSet;
        let tile;
        do {
            if (tileSet.canPickTile()) {
                tileSet = tileSet.pickTile();
                tile = tileSet.tileFacedUp;
            }
            else {
                return game.set({ phase: new end_game_phase_1.EndGamePhase() });
            }
        } while (game.world.getPossibleTilePlacements(tile).size < 1);
        const turn = this.setTileInTurn(tile, game.currentTurn, game);
        const turns = game.turns.set(-1, turn);
        const phase = new place_tile_phase_1.PlaceTilePhase();
        return game.set({ tileSet, turns, phase });
    }
    actions(game) {
        return immutable_1.List();
    }
    setTileInTurn(tile, turn, game) {
        let turnPart = new turn_part_1.TurnPart({ tile });
        let turnParts = turn.turnParts.push(turnPart);
        return turn.set({ turnParts });
    }
}
exports.DrawTilePhase = DrawTilePhase;
//# sourceMappingURL=draw-tile-phase.js.map