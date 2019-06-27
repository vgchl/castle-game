import { PlacedTile } from '../../../../src/castle/world/placed-tile'
import { Position } from '../../../../src/castle/world/position';
import { Direction } from '../../../../src/castle/world/direction';
import { TileD } from '../../../../src/castle/world/tiles/tile-d';
import * as immutable from 'immutable'

describe('PlacedTile', () => {
  describe('#getEdgesWithSegment()', () => {
    test('returns edges for world directions', () => {
      const tile = new TileD();
      const position = Position.origin
      const segment = tile.segments.find(segment => segment!.id === "farmA");

      const edgesNorth = new PlacedTile(tile, position, Direction.north).getEdgesWithSegment(segment)
      const edgesEast = new PlacedTile(tile, position, Direction.east).getEdgesWithSegment(segment)
      const edgesSouth = new PlacedTile(tile, position, Direction.south).getEdgesWithSegment(segment)
      const edgesWest = new PlacedTile(tile, position, Direction.west).getEdgesWithSegment(segment)

      expect(edgesNorth).toEqual(immutable.Map([
        [Direction.north, tile.edges.get(Direction.north)],
        [Direction.south, tile.edges.get(Direction.south)],
        [Direction.west, tile.edges.get(Direction.west)]
      ]))
      expect(edgesEast).toEqual(immutable.Map([
        [Direction.east, tile.edges.get(Direction.north)],
        [Direction.west, tile.edges.get(Direction.south)],
        [Direction.north, tile.edges.get(Direction.west)]
      ]))
      expect(edgesSouth).toEqual(immutable.Map([
        [Direction.south, tile.edges.get(Direction.north)],
        [Direction.north, tile.edges.get(Direction.south)],
        [Direction.east, tile.edges.get(Direction.west)]
      ]))
      expect(edgesWest).toEqual(immutable.Map([
        [Direction.west, tile.edges.get(Direction.north)],
        [Direction.east, tile.edges.get(Direction.south)],
        [Direction.south, tile.edges.get(Direction.west)]
      ]))
    })
  })

  describe('#getEdge()', () => {
    test('returns edge given its world direction', () => {
      const tile = new TileD()
      const position = Position.origin

      const expectEdge = (orientation: Direction, worldDirection: Direction, tileDirection: Direction) => {
        const edge = new PlacedTile(tile, position, orientation).getEdge(worldDirection)
        expect(edge).toBe(tile.edges.get(tileDirection))
      }

      expectEdge(Direction.north, Direction.north, Direction.north)
      expectEdge(Direction.north, Direction.east, Direction.east)
      expectEdge(Direction.north, Direction.south, Direction.south)
      expectEdge(Direction.north, Direction.west, Direction.west)

      expectEdge(Direction.east, Direction.north, Direction.west)
      expectEdge(Direction.east, Direction.east, Direction.north)
      expectEdge(Direction.east, Direction.south, Direction.east)
      expectEdge(Direction.east, Direction.west, Direction.south)

      expectEdge(Direction.south, Direction.north, Direction.south)
      expectEdge(Direction.south, Direction.east, Direction.west)
      expectEdge(Direction.south, Direction.south, Direction.north)
      expectEdge(Direction.south, Direction.west, Direction.east)

      expectEdge(Direction.west, Direction.north, Direction.east)
      expectEdge(Direction.west, Direction.east, Direction.south)
      expectEdge(Direction.west, Direction.south, Direction.west)
      expectEdge(Direction.west, Direction.west, Direction.north)
    })
  })
})
