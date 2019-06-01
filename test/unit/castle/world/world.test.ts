import { World } from '../../../../src/castle/world/world'
import { PlacedSegment } from '../../../../src/castle/world/placed-segment'
import { PlacedTile, TileD, Position, Direction, Tile, FarmSegment, RoadSegment, TileEdge } from '../../../../src/castle'
import { Map, List } from 'immutable'

// TODO: Move to production sources
class TileX extends Tile {
  constructor () {
    let farmA = new FarmSegment('farmX')
    let roadA = new RoadSegment('roadA')

    let edgeN = new TileEdge(List([farmA, roadA, farmA]))
    let edgeE = new TileEdge(List([farmA]))
    let edgeS = new TileEdge(List([farmA]))
    let edgeW = new TileEdge(List([farmA]))

    let segments = List([farmA, roadA])

    super(edgeN, edgeE, edgeS, edgeW, segments)
  }
}

describe('World', function () {
  describe('#getConnectedSegments', function () {
    /**
     * Scenario:
     *
     *   +----+-+----+
     *   |    | |   /|
     *   |    | |  + |
     *   | G  |R| G|C|
     *   |    | |  + |
     *   |    | |   \|
     *   +----+-+----+
     *   |    |R|    |
     *   |    +-+    |
     *   |           |
     *   |     G     |
     *   |           |
     *   O-----------+
     */
    it('returns a list of connected segments', () => {
      const world = new World({
        tiles: Map<Position, PlacedTile>([
          [
            new Position(0, 0),
            new PlacedTile(
              new TileX(),
              new Position(0, 0),
              Direction.north
            )
          ]
        ])
      })
      const tile = new TileD()
      const segment = tile.segments.get(2)
      const placedSegment = new PlacedSegment(
        segment,
        new PlacedTile(
          tile,
          new Position(0, 1),
          Direction.north
        )
      )

      const segments = world.getConnectedSegments(placedSegment)

      const segmentIds = segments.map(segment => segment!.segment.id).toJS()
      expect(segmentIds).toEqual(['farmB', 'farmX', 'farmA'])
    })
  })
})
