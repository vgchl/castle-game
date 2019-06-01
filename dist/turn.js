"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
class Turn {
    constructor(props) {
        this.player = props.player;
        this.turnParts = props.turnParts || immutable_1.List();
        this.scores = props.scores || immutable_1.List();
    }
    get currentTurnPart() {
        return this.turnParts.last();
    }
    setCurrentTurnPart(turnPartProps) {
        const turnPart = this.currentTurnPart.set(turnPartProps);
        const turnParts = this.turnParts.set(-1, turnPart);
        return this.set({ turnParts });
    }
    set(props) {
        return new Turn(Object.assign({ player: this.player, turnParts: this.turnParts, scores: this.scores }, props));
    }
}
exports.Turn = Turn;
//# sourceMappingURL=turn.js.map