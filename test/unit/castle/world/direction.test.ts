import { Direction } from './../../../../src/castle/world/direction'

describe('Direction', function () {
  describe('#getOpposite()', function () {
    it('returns the opposite orientation', function () {
      expect(Direction.north.getOpposite()).toBe(Direction.south)
      expect(Direction.east.getOpposite()).toBe(Direction.west)
      expect(Direction.south.getOpposite()).toBe(Direction.north)
      expect(Direction.west.getOpposite()).toBe(Direction.east)
    })
  })
})
