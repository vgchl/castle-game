import { List } from 'immutable'

/**
 * A figure is a character that can be placed on a tile.
 */
export class Figure {
  public static follower = new Figure(true, false, 1)
  public static largeFollower = new Figure(true, false, 2)
  public static builder = new Figure(true, false, 0)
  public static fairy = new Figure(false, true, 0)
  public static dragon = new Figure(false, true, 0)

  public static all = List([
    Figure.follower,
    Figure.largeFollower,
    Figure.builder,
    Figure.fairy,
    Figure.dragon
  ])

  public static followers = List([
    Figure.follower,
    Figure.largeFollower,
    Figure.builder
  ])

  private constructor (public readonly canBeEatenByDragon: boolean,
                       public readonly isNeutral: boolean,
                       public readonly pointsTowardMajority: number) {}

  public get isFollower (): boolean {
    return Figure.followers.contains(this)
  }
}
