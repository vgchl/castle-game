import { List } from 'immutable';
/**
 * A figure is a character that can be placed on a tile.
 */
export declare class Figure {
    readonly canBeEatenByDragon: boolean;
    readonly isNeutral: boolean;
    readonly pointsTowardMajority: number;
    static follower: Figure;
    static largeFollower: Figure;
    static builder: Figure;
    static fairy: Figure;
    static dragon: Figure;
    static all: List<Figure>;
    static followers: List<Figure>;
    private constructor();
    readonly isFollower: boolean;
}
