"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const DEG_TO_RAD = Math.PI / 180;
class Direction {
    constructor(label, degrees) {
        this.label = label;
        this.degrees = degrees;
    }
    get radians() {
        return this.degrees * DEG_TO_RAD;
    }
    getOpposite() {
        const index = Direction.all.indexOf(this) + (Direction.all.size / 2);
        return Direction.all.get(index % Direction.all.size);
    }
    toString() {
        return this.label;
    }
}
Direction.north = new Direction('north', 0);
Direction.northeast = new Direction('northeast', 45);
Direction.east = new Direction('east', 90);
Direction.southeast = new Direction('southeast', 135);
Direction.south = new Direction('south', 180);
Direction.southwest = new Direction('southwest', 225);
Direction.west = new Direction('west', 270);
Direction.northwest = new Direction('northwest', 315);
/**
 * The four primary directions: north, east, south and west.
 */
Direction.cardinals = immutable_1.List([
    Direction.north,
    Direction.east,
    Direction.south,
    Direction.west
]);
Direction.principals = immutable_1.List([
    Direction.north,
    Direction.northeast,
    Direction.east,
    Direction.southeast,
    Direction.south,
    Direction.southwest,
    Direction.west,
    Direction.northwest
]);
Direction.all = Direction.principals;
exports.Direction = Direction;
//# sourceMappingURL=direction.js.map