import { List } from 'immutable';
export declare function uniqueBy<T, V extends {
    equals(other: any): boolean;
}>(prop: (item?: T) => V): (uniqueItems?: List<T> | undefined, item?: T | undefined) => List<T>;
