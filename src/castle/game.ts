import { Player } from './player'
import { World, TileSetStandard, TileSet } from './world/index'
import { Phase } from './phases/phase'
import { Turn, TurnProps } from './turn'
import { NewTurnPhase } from './phases/new-turn-phase'
import { Action } from './phases/actions/action'
import { List } from 'immutable'
import { TurnPartProps } from './turn-part'

/**
 * Represents a single game of Castle.
 */
export class Game {
  public readonly world: World
  public readonly players: List<Player>
  public readonly turns: List<Turn>
  public readonly phase: Phase
  public readonly tileSet: TileSet

  private cachedActions?: List<Action>

  // TODO: Make updating a manual step
  constructor (props: GameProps = {}) {
    this.tileSet = props.tileSet || new TileSetStandard()
    this.world = props.world || new World()
    this.players = props.players || List()
    this.turns = props.turns || List()
    this.phase = props.phase || new NewTurnPhase()

    return this.update()
  }

  public get currentTurn (): Turn {
    return this.turns.last()
  }

  public static setCurrentTurn (game: Game, turnProps: Partial<TurnProps>): List<Turn> {
    const turn = game.turns.last().set(turnProps)
    return game.turns.set(-1, turn)
  }

  public static setCurrentTurnPart (game: Game, turnPartProps: Partial<TurnPartProps>): List<Turn> {
    const turnPart = game.currentTurn.currentTurnPart.set(turnPartProps)
    const turn = game.currentTurn.setCurrentTurnPart(turnPart)
    return Game.setCurrentTurn(game, turn)
  }

  public get actions (): List<Action> {
    if (!this.cachedActions) {
      this.cachedActions = this.phase.actions(this)
    }
    return this.cachedActions
  }

  public set (props: GameProps): Game {
    return new Game({
      world: this.world,
      players: this.players,
      turns: this.turns,
      phase: this.phase,
      tileSet: this.tileSet,
      ...props
    })
  }

  private update (): Game {
    return this.phase.update(this)
  }
}

export interface GameProps {
  readonly world?: World
  readonly players?: List<Player>
  readonly turns?: List<Turn>
  readonly phase?: Phase
  readonly tileSet?: TileSet
}
