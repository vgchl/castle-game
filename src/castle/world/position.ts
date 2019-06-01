import { List } from 'immutable'
import { Direction } from './direction'

export class Position {
  public static readonly origin: Position = new Position(0, 0)

  private readonly key: string

  constructor (public readonly x: number,
               public readonly y: number) {
    this.key = `(${this.x},${this.y})`
  }

  public translate (dx: number, dy: number): Position {
    return new Position(this.x + dx, this.y + dy)
  }

  public getNeighbours (directions: List<Direction>): List<Position> {
    return directions.map(direction => this.getNeighbour(direction!)).toList()
  }

  public getNeighbour (direction: Direction): Position {
    switch (direction) {
      case Direction.north:
        return this.translate(0, 1)
      case Direction.northeast:
        return this.translate(1, 1)
      case Direction.east:
        return this.translate(1, 0)
      case Direction.southeast:
        return this.translate(1, -1)
      case Direction.south:
        return this.translate(0, -1)
      case Direction.southwest:
        return this.translate(-1, -1)
      case Direction.west:
        return this.translate(-1, 0)
      case Direction.northwest:
        return this.translate(-1, 1)
      default:
        throw new Error('No neighbour know for this direction.')
    }
  }

  public equals (position: Position): boolean {
    if (!position) {
      return false
    }
    return this.x === position.x && this.y === position.y
  }

  public hashCode (): number {
    let { x, y } = this
    const a = x >= 0 ? 2 * x : -2 * x - 1
    const b = y >= 0 ? 2 * y : -2 * y - 1
    return a >= b ? a * a + a + b : a + b * b
  }

  public toString (): string {
    return this.key
  }
}
