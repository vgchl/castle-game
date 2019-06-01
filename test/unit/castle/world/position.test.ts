import { Direction } from '../../../../src/castle/world/direction'
import { Position } from '../../../../src/castle/world/position'

describe('Position', function () {
  describe('#translate()', function () {
    it('returns a new, translated position', function () {
      let positionA = new Position(1, 2)
      let positionB = positionA.translate(2, -1)

      expect(positionA).not.toEqual(positionB)
      expect(positionB).toEqual(new Position(3, 1))
    })
  })

  describe('#getNeighbours()', function () {
    it('returns the neighbours', function () {
      const position = new Position(0, 0)

      const neighbours = position.getNeighbours(Direction.cardinals)

      expect(neighbours).toContainEqual(new Position(1, 0))
      expect(neighbours).toContainEqual(new Position(0, 1))
      expect(neighbours).toContainEqual(new Position(-1, 0))
      expect(neighbours).toContainEqual(new Position(0, -1))
    })
  })

  describe('#getNeighbour()', function () {
    it('returns the neighbour to the provided orientation', function () {
      const position = new Position(0, 0)
      const north = position.getNeighbour(Direction.north)
      const east = position.getNeighbour(Direction.east)
      const south = position.getNeighbour(Direction.south)
      const west = position.getNeighbour(Direction.west)
      expect(north.equals(new Position(0, 1))).toBe(true)
      expect(east.equals(new Position(1, 0))).toBe(true)
      expect(south.equals(new Position(0, -1))).toBe(true)
      expect(west.equals(new Position(-1, 0))).toBe(true)
    })
  })

  describe('#toString()', function () {
    it('returns a formatted position.', function () {
      let position = new Position(1, 2)
      expect(position.toString()).toEqual('(1,2)')
    })
  })

  describe('#equals()', function () {
    describe('when the coordinates are equal', function () {
      it('returns true', function () {
        const positionA = new Position(1, 2)
        const positionB = new Position(1, 2)
        expect(positionA.equals(positionB)).toBe(true)
      })
    })
    describe('when the coordinates are not equal', function () {
      it('resturns false', function () {
        const positionA = new Position(1, 2)
        const positionB = new Position(2, 1)
        expect(positionA.equals(positionB)).toBe(false)
      })
    })
  })
})
