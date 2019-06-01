"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./world/index");
const new_turn_phase_1 = require("./phases/new-turn-phase");
const immutable_1 = require("immutable");
/**
 * Represents a single game of Castle.
 */
class Game {
    // TODO: Make updating a manual step
    constructor(props = {}) {
        this.tileSet = props.tileSet || new index_1.TileSetStandard();
        this.world = props.world || new index_1.World();
        this.players = props.players || immutable_1.List();
        this.turns = props.turns || immutable_1.List();
        this.phase = props.phase || new new_turn_phase_1.NewTurnPhase();
        return this.update();
    }
    get currentTurn() {
        return this.turns.last();
    }
    static setCurrentTurn(game, turnProps) {
        const turn = game.turns.last().set(turnProps);
        return game.turns.set(-1, turn);
    }
    static setCurrentTurnPart(game, turnPartProps) {
        const turnPart = game.currentTurn.currentTurnPart.set(turnPartProps);
        const turn = game.currentTurn.setCurrentTurnPart(turnPart);
        return Game.setCurrentTurn(game, turn);
    }
    get actions() {
        if (!this.cachedActions) {
            this.cachedActions = this.phase.actions(this);
        }
        return this.cachedActions;
    }
    set(props) {
        return new Game(Object.assign({ world: this.world, players: this.players, turns: this.turns, phase: this.phase, tileSet: this.tileSet }, props));
    }
    update() {
        return this.phase.update(this);
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map