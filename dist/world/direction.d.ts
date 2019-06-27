import { List } from 'immutable';
export declare class Direction {
    private label;
    readonly degrees: number;
    static readonly north: Direction;
    static readonly northeast: Direction;
    static readonly east: Direction;
    static readonly southeast: Direction;
    static readonly south: Direction;
    static readonly southwest: Direction;
    static readonly west: Direction;
    static readonly northwest: Direction;
    /**
     * The four primary directions: north, east, south and west.
     */
    static readonly cardinals: List<Direction>;
    static readonly principals: List<Direction>;
    private static readonly all;
    private constructor();
    readonly radians: number;
    getOpposite(): Direction;
    toString(): string;
}
