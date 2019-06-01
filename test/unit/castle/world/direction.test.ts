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

  describe('#relativeTo()', function () {
    it('returns the orientation relative to another orientation', function () {
      expect(Direction.north.relativeTo(Direction.north)).toBe(Direction.north)
      expect(Direction.north.relativeTo(Direction.east)).toBe(Direction.west)
      expect(Direction.north.relativeTo(Direction.south)).toBe(Direction.south)
      expect(Direction.north.relativeTo(Direction.west)).toBe(Direction.east)

      expect(Direction.east.relativeTo(Direction.north)).toBe(Direction.east)
      expect(Direction.east.relativeTo(Direction.east)).toBe(Direction.north)
      expect(Direction.east.relativeTo(Direction.south)).toBe(Direction.west)
      expect(Direction.east.relativeTo(Direction.west)).toBe(Direction.south)

      expect(Direction.south.relativeTo(Direction.north)).toBe(Direction.south)
      expect(Direction.south.relativeTo(Direction.east)).toBe(Direction.east)
      expect(Direction.south.relativeTo(Direction.south)).toBe(Direction.north)
      expect(Direction.south.relativeTo(Direction.west)).toBe(Direction.west)

      expect(Direction.west.relativeTo(Direction.north)).toBe(Direction.west)
      expect(Direction.west.relativeTo(Direction.east)).toBe(Direction.south)
      expect(Direction.west.relativeTo(Direction.south)).toBe(Direction.east)
      expect(Direction.west.relativeTo(Direction.west)).toBe(Direction.north)
    })
  })
})
