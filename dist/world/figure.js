"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
/**
 * A figure is a character that can be placed on a tile.
 */
class Figure {
    constructor(canBeEatenByDragon, isNeutral, pointsTowardMajority) {
        this.canBeEatenByDragon = canBeEatenByDragon;
        this.isNeutral = isNeutral;
        this.pointsTowardMajority = pointsTowardMajority;
    }
    get isFollower() {
        return Figure.followers.contains(this);
    }
}
Figure.follower = new Figure(true, false, 1);
Figure.largeFollower = new Figure(true, false, 2);
Figure.builder = new Figure(true, false, 0);
Figure.fairy = new Figure(false, true, 0);
Figure.dragon = new Figure(false, true, 0);
Figure.all = immutable_1.List([
    Figure.follower,
    Figure.largeFollower,
    Figure.builder,
    Figure.fairy,
    Figure.dragon
]);
Figure.followers = immutable_1.List([
    Figure.follower,
    Figure.largeFollower,
    Figure.builder
]);
exports.Figure = Figure;
//# sourceMappingURL=figure.js.map