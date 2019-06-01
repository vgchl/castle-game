import { Player } from './player'
import { Score } from './score'
import { List } from 'immutable'
import { TurnPart, TurnPartProps } from './turn-part'

export class Turn {
  readonly player: Player
  readonly turnParts: List<TurnPart>
  readonly scores: List<Score>

  constructor (props: TurnProps) {
    this.player = props.player
    this.turnParts = props.turnParts || List()
    this.scores = props.scores || List()
  }

  public get currentTurnPart (): TurnPart {
    return this.turnParts.last()
  }

  public setCurrentTurnPart (turnPartProps: TurnPartProps) {
    const turnPart = this.currentTurnPart.set(turnPartProps)
    const turnParts = this.turnParts.set(-1, turnPart)
    return this.set({ turnParts })
  }

  public set (props: Partial<TurnProps>): Turn {
    return new Turn({
      player: this.player,
      turnParts: this.turnParts,
      scores: this.scores,
      ...props
    })
  }
}

export interface TurnProps {

  readonly player: Player
  readonly turnParts?: List<TurnPart>
  readonly scores?: List<Score>

}
