import { List } from 'immutable'

export function uniqueBy <T, V extends { equals (other: any): boolean }> (prop: (item?: T) => V) {
  return (uniqueItems?: List<T>, item?: T) => {
    if (uniqueItems!.some(anItem => prop(anItem).equals(prop(item)))) {
      return uniqueItems!.push(item!)
    } else {
      return uniqueItems!
    }
  }
}
