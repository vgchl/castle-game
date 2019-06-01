import { List } from 'immutable'
import { PlaceFigureAction } from '../../../../../src/castle/phases/actions/place-figure-action'
import { Game, Turn, World } from '../../../../../src/castle'
import { TurnPart } from '../../../../../src/castle/turn-part'
import { Figure } from '../../../../../src/castle/world/figure'

describe('PlaceFigureAction', () => {
  let game: any

  beforeEach(() => {
    let world: World | any = {
      canPlaceFigure: jest.fn(),
      getPossibleFigurePlacements: jest.fn(),
      placeTile: jest.fn(),
      placeFigure: jest.fn()
    }

    let phase: any = {
      update: (game: Game) => game
    }

    let turns = List([
      new Turn({
        turnParts: List([
          new TurnPart({} as any)
        ])
      } as any)
    ])

    game = new Game({ world, phase, turns })
  })

  describe('#possiblePlacements', () => {
    //
  })

  describe('#placeFigure', () => {
    describe('when the figure may be placed there', () => {
      it('adds the figure to the turn part.', () => {
        game.world.canPlaceFigure.mockReturnValue(true)
        const player: any = {}
        const action = new PlaceFigureAction(game, player, Figure.follower)
        const placedFigure: any = {}

        const gameAfterAction = action.placeFigure(placedFigure)

        const turnPart = gameAfterAction.currentTurn.currentTurnPart
        expect(turnPart.figurePlacement).toBe(placedFigure)
      })
    })

    describe('when the figure may not be placed there', () => {
      it('throws an error.', () => {
        let player: any = {}
        let figure: any = {}
        let action = new PlaceFigureAction(game, player, figure)
        let placedFigure: any = {}

        expect(() => action.placeFigure(placedFigure)).toThrow('Can not place figure there.')
      })
    })
  })
})
