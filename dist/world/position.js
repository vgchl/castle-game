"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const direction_1 = require("./direction");
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.key = `(${this.x},${this.y})`;
    }
    translate(dx, dy) {
        return new Position(this.x + dx, this.y + dy);
    }
    getNeighbours(directions) {
        return directions.map(direction => this.getNeighbour(direction)).toList();
    }
    getNeighbour(direction) {
        switch (direction) {
            case direction_1.Direction.north:
                return this.translate(0, 1);
            case direction_1.Direction.northeast:
                return this.translate(1, 1);
            case direction_1.Direction.east:
                return this.translate(1, 0);
            case direction_1.Direction.southeast:
                return this.translate(1, -1);
            case direction_1.Direction.south:
                return this.translate(0, -1);
            case direction_1.Direction.southwest:
                return this.translate(-1, -1);
            case direction_1.Direction.west:
                return this.translate(-1, 0);
            case direction_1.Direction.northwest:
                return this.translate(-1, 1);
            default:
                throw new Error('No neighbour know for this direction.');
        }
    }
    equals(position) {
        if (!position) {
            return false;
        }
        return this.x === position.x && this.y === position.y;
    }
    hashCode() {
        let { x, y } = this;
        const a = x >= 0 ? 2 * x : -2 * x - 1;
        const b = y >= 0 ? 2 * y : -2 * y - 1;
        return a >= b ? a * a + a + b : a + b * b;
    }
    toString() {
        return this.key;
    }
}
Position.origin = new Position(0, 0);
exports.Position = Position;
//# sourceMappingURL=position.js.map