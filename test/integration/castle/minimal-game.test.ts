import { List, Map } from 'immutable'
import { Direction, Game, PlacedTile, Player, TileD, World, Color } from '../../../src/castle'
import { ConfirmAction } from '../../../src/castle/phases/actions/confirm-action'
import { PlaceFigureAction } from '../../../src/castle/phases/actions/place-figure-action'
import { PlaceTileAction } from '../../../src/castle/phases/actions/place-tile-action'
import { Figure } from '../../../src/castle/world/figure'
import { Position } from '../../../src/castle/world/position'

// TODO:
// - Limit the tileset
// - Check the number of remaining tiles

describe('A minimal game', () => {
  let game: Game
  let playerAlice: Player = new Player('Alice', Color.Red)
  let playerBob: Player = new Player('Bob', Color.Blue)

  describe('when the game starts', () => {
    beforeEach(() => {
      game = new Game({
        world: new World({
          tiles: Map<Position, PlacedTile>([[
            Position.origin,
            new PlacedTile(new TileD(), Position.origin, Direction.north)
          ]])
        }),
        players: List([playerAlice, playerBob])
      })
    })

    it('then the world contains 1 tiles', () => {
      expect(game.world.tiles.size).toBe(1)
    })

    it(`it is Alice's turn`, () => {
      expect(game.currentTurn.player).toBe(playerAlice)
    })

    it('a tile has been drawn', () => {
      expect(game.currentTurn.currentTurnPart.tile).toBeInstanceOf(TileD)
    })

    it('no player has scored any points', () => {
      expectPlayerToHaveScoredPoints(game, playerAlice, 0)
      expectPlayerToHaveScoredPoints(game, playerBob, 0)
    })

    describe('the place tile action', () => {
      let action: PlaceTileAction

      beforeEach(() => {
        action = game.actions.find(action => action instanceof PlaceTileAction) as PlaceTileAction
      })

      it('is the only available action', () => {
        expect(game.actions.size).toBe(1)
      })

      it('has four possible positions', () => {
        expect(action.possibleTilePlacements.size).toBe(4)
        expect(action.possibleTilePlacements.has(new Position(0, 1))).toBeTruthy()
        expect(action.possibleTilePlacements.has(new Position(1, 0))).toBeTruthy()
        expect(action.possibleTilePlacements.has(new Position(-1, 0))).toBeTruthy()
        expect(action.possibleTilePlacements.has(new Position(0, -1))).toBeTruthy()
      })
    })

    describe('when Alice places the tile', () => {
      beforeEach(() => {
        let action = (game.actions.find(action => action instanceof PlaceTileAction) as PlaceTileAction)
        game = action.placeTile(new Position(1, 0), Direction.south)
        expect(game.world.tiles.size).toBe(2)
        expect(game.currentTurn.currentTurnPart.gameBeforeTilePlacement!.world.tiles.size).toBe(1)
      })

      it('then the world contains 2 tiles', () => {
        expect(game.world.tiles.size).toBe(2)
      })

      it('the place tile, place figure, and confirm actions are available', () => {
        expect(game.actions.find(action => action instanceof PlaceTileAction)).toBeTruthy()
        expect(game.actions.find(action => action instanceof PlaceFigureAction && action.figure === Figure.follower)).toBeTruthy()
        expect(game.actions.find(action => action instanceof PlaceFigureAction && action.figure === Figure.largeFollower)).toBeTruthy()
        expect(game.actions.find(action => action instanceof ConfirmAction)).toBeTruthy()
        expect(game.actions.size).toBe(4)
        expect(game.actions.map(action => action!.player).every(player => player === playerAlice)).toBeTruthy()
      })

      describe('the place tile action', () => {
        let action: PlaceTileAction

        beforeEach(() => {
          action = game.actions.find(action => action instanceof PlaceTileAction) as PlaceTileAction
        })

        it('has four possible positions', () => {
          expect(game.currentTurn.currentTurnPart.gameBeforeTilePlacement!.world.tiles.size).toBe(1)
          expect(action.possibleTilePlacements.size).toBe(4)
          expect(action.possibleTilePlacements.has(new Position(0, 1))).toBeTruthy()
          expect(action.possibleTilePlacements.has(new Position(1, 0))).toBeTruthy()
          expect(action.possibleTilePlacements.has(new Position(-1, 0))).toBeTruthy()
          expect(action.possibleTilePlacements.has(new Position(0, -1))).toBeTruthy()
        })
      })

      describe('the place figure action', () => {
        let action: PlaceFigureAction

        beforeEach(() => {
          action = game.actions.find(action => action instanceof PlaceFigureAction && action.figure === Figure.follower) as PlaceFigureAction
        })

        it('has four possible figure placements', () => {
          expect(action.possiblePlacements.size).toBe(4)
          expect(action.possiblePlacements.every(placedFigure => placedFigure!.figure === Figure.follower)).toBeTruthy()
          const segmentIds = action.possiblePlacements.map(placedFigure => placedFigure!.placedSegment!.segment.id).toArray()
          expect(segmentIds).toContain('cityA')
          expect(segmentIds).toContain('farmA')
          expect(segmentIds).toContain('farmB')
          expect(segmentIds).toContain('roadA')
        })
      })

      describe('when Alice places the tile in a different position', () => {
        beforeEach(() => {
          let action = (game.actions.find(action => action instanceof PlaceTileAction) as PlaceTileAction)
          game = action.placeTile(new Position(-1, 0), Direction.south)
        })

        it('the tile is moved to the new position', () => {
          expect(game.world.tiles.has(new Position(-1, 0))).toBeTruthy()
          expect(game.world.tiles.has(new Position(0, 0))).toBeTruthy()
          expect(game.world.tiles.size).toBe(2)
        })
      })

      describe('when Alice places a follower on the city', () => {
        beforeEach(() => {
          let action = game.actions.find(action => action instanceof PlaceFigureAction) as PlaceFigureAction
          let placedFigure = action.possiblePlacements.find(placedFigure => placedFigure!.placedSegment!.segment.id === 'cityA')
          game = action.placeFigure(placedFigure)
        })

        it('then the world contains 2 tiles', () => {
          expect(game.world.tiles.size).toBe(2)
        })

        it('the follower is placed on the segment', () => {
          expect(game.world.figures.size).toBe(1)
          const figure = game.world.figures.first()
          expect(figure.player).toBe(playerAlice)
          expect(figure.placedSegment!.segment.id).toBe('cityA')
          expect(figure.placedSegment!.placedTile.position).toEqual(new Position(1, 0))
        })

        it('the place tile, place figure, and confirm actions are available', () => {
          expect(game.actions.find(action => action instanceof PlaceTileAction)).toBeTruthy()
          expect(game.actions.find(action => action instanceof PlaceFigureAction && action.figure === Figure.follower)).toBeTruthy()
          expect(game.actions.find(action => action instanceof PlaceFigureAction && action.figure === Figure.largeFollower)).toBeTruthy()
          expect(game.actions.find(action => action instanceof ConfirmAction)).toBeTruthy()
          expect(game.actions.size).toBe(4)
          expect(game.actions.map(action => action!.player).every(player => player === playerAlice)).toBeTruthy()
        })

        describe('when placing the tile again', () => {
          beforeEach(() => {
            let action = (game.actions.find(action => action instanceof PlaceTileAction) as PlaceTileAction)
            game = action.placeTile(new Position(0, 1), Direction.south)
          })

          it('the tile is moved to the new position', () => {
            expect(game.world.tiles.has(new Position(0, 1))).toBeTruthy()
            expect(game.world.tiles.has(new Position(0, 0))).toBeTruthy()
            expect(game.world.tiles.size).toBe(2)
          })

          it('the placed follower is removed from the world', () => {
            expect(game.world.figures.isEmpty()).toBeTruthy()
          })
        })

        describe('when Alice confirms her tile and figure placements', () => {
          beforeEach(() => {
            let action = game.actions.find(action => action instanceof ConfirmAction) as ConfirmAction
            game = action.confirm()
          })

          it('Alice\'s follower is returned', () => {
            expect(game.world.figures.isEmpty()).toBeTruthy()
          })

          it('Alice has scored 4 points', () => {
            expectPlayerToHaveScoredPoints(game, playerAlice, 4)
          })

          it('Bob has scored 0 points', () => {
            expectPlayerToHaveScoredPoints(game, playerBob, 0)
          })

          it('it is now Bob\'s turn', () => {
            expect(game.currentTurn.player).toBe(playerBob)
            expect(game.turns.size).toBe(2)
          })

          describe('when Bob places the tile', () => {
            beforeEach(() => {
              let action = (game.actions.find(action => action instanceof PlaceTileAction) as PlaceTileAction)
              game = action.placeTile(new Position(0, 1), Direction.south)
            })

            it('then the world contains 3 tiles', () => {
              expect(game.world.tiles.size).toBe(3)
            })

            describe('when confirming the placement', () => {
              beforeEach(() => {
                let action = game.actions.find(action => action instanceof ConfirmAction) as ConfirmAction
                game = action.confirm()
              })

              it.skip('the game is over', () => {})

              it.skip('Alice has won the game', () => {})
            })
          })
        })
      })
    })
  })
})

function expectPlayerToHaveScoredPoints (game: Game, player: Player, expectedPoints: number) {
  const points = game.turns
    .flatMap(turn => turn!.scores)
    .filter(score => score!.player === player)
    .reduce((sum, score) => sum! + score!.points, 0)
  expect(points).toBe(expectedPoints)
}
