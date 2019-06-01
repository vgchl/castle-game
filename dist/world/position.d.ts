import { List } from 'immutable';
import { Direction } from './direction';
export declare class Position {
    readonly x: number;
    readonly y: number;
    static readonly origin: Position;
    private readonly key;
    constructor(x: number, y: number);
    translate(dx: number, dy: number): Position;
    getNeighbours(directions: List<Direction>): List<Position>;
    getNeighbour(direction: Direction): Position;
    equals(position: Position): boolean;
    hashCode(): number;
    toString(): string;
}
