"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A part of a turn. When playing with the Builder figure, a turn can have two turn parts.
 * During a single turn part, a tile is drawn and placed, optionally figures are placed, and it is then scored.
 */
class TurnPart {
    constructor(props) {
        this.tile = props.tile;
        this.tilePlacement = props.tilePlacement;
        this.figurePlacement = props.figurePlacement;
        this.gameBeforeTilePlacement = props.gameBeforeTilePlacement;
        this.gameBeforeFigurePlacement = props.gameBeforeFigurePlacement;
        this.gameBeforeDragonMovement = props.gameBeforeDragonMovement;
    }
    set(props) {
        return new TurnPart(Object.assign({ tile: this.tile, tilePlacement: this.tilePlacement, figurePlacement: this.figurePlacement, gameBeforeTilePlacement: this.gameBeforeTilePlacement, gameBeforeFigurePlacement: this.gameBeforeFigurePlacement, gameBeforeDragonMovement: this.gameBeforeDragonMovement }, props));
    }
}
exports.TurnPart = TurnPart;
//# sourceMappingURL=turn-part.js.map