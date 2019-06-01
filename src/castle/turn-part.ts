import { Tile } from './world/tile'
import { PlacedTile } from './world/placed-tile'
import { PlacedFigure } from './world/placed-figure'
import { Game } from './game'

/**
 * A part of a turn. When playing with the Builder figure, a turn can have two turn parts.
 * During a single turn part, a tile is drawn and placed, optionally figures are placed, and it is then scored.
 */
export class TurnPart {
  public readonly tile: Tile

  public readonly tilePlacement?: PlacedTile
  public readonly figurePlacement?: PlacedFigure

  public readonly gameBeforeTilePlacement?: Game
  public readonly gameBeforeFigurePlacement?: Game
  public readonly gameBeforeDragonMovement?: Game

  constructor (props: TurnPartProps) {
    this.tile = props.tile
    this.tilePlacement = props.tilePlacement
    this.figurePlacement = props.figurePlacement
    this.gameBeforeTilePlacement = props.gameBeforeTilePlacement
    this.gameBeforeFigurePlacement = props.gameBeforeFigurePlacement
    this.gameBeforeDragonMovement = props.gameBeforeDragonMovement
  }

  public set (props: Partial<TurnPartProps>): TurnPart {
    return new TurnPart({
      tile: this.tile,
      tilePlacement: this.tilePlacement,
      figurePlacement: this.figurePlacement,
      gameBeforeTilePlacement: this.gameBeforeTilePlacement,
      gameBeforeFigurePlacement: this.gameBeforeFigurePlacement,
      gameBeforeDragonMovement: this.gameBeforeDragonMovement,
      ...props
    })
  }
}

export interface TurnPartProps {

  readonly tile: Tile

  readonly tilePlacement?: PlacedTile
  readonly figurePlacement?: PlacedFigure

  readonly gameBeforeTilePlacement?: Game
  readonly gameBeforeFigurePlacement?: Game
  readonly gameBeforeDragonMovement?: Game

}
