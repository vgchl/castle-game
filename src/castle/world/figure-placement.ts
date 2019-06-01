import { PlacedFigure } from './placed-figure'
import { List } from 'immutable'
import { Figure } from './figure'
import { PlacedTile } from './placed-tile'
import { Player } from '../player'
import { World } from './world'
import { Direction } from './direction'
import { uniqueBy } from '../utils/collection-util'

export function getPossibleFollowerPlacements (world: World, figure: Figure, placedTile: PlacedTile, player: Player): List<PlacedFigure> {
  return placedTile.placedSegments
    .filter(segment => world.getConnectedSegments(segment!).every(segment => !world.isOccupied(segment!)))
    .map(segment => ({ figure, placedSegment: segment!, player })).toList()
}

export function getPossibleBuilderPlacements (world: World, placedTile: PlacedTile, player: Player): List<PlacedFigure> {
  return placedTile.placedSegments
    .filter(segment => world.getConnectedSegments(segment!).some(segment => world.isOccupied(segment!, player)))
    .map(placedSegment => ({ figure: Figure.builder, placedSegment } as PlacedFigure))
    .toList()
}

export function getPossibleFairyPlacements (world: World, player: Player): List<PlacedFigure> {
  let fairyPlacedTile = world.getPlacedTileFor(Figure.fairy)

  return world.figures
    .filter(placedFigure => placedFigure!.player === player && placedFigure!.placedTile !== fairyPlacedTile)
    .map(placedFigure => placedFigure!.placedTile)
    .reduce(uniqueBy(placedTile => placedTile!.position), List<PlacedTile>())
    .map(placedTile => ({ figure: Figure.fairy, placedTile: placedTile! } as PlacedFigure)).toList()
}

export function getPossibleDragonPlacements (world: World): List<PlacedFigure> {
  let dragonPlacedTile = world.getPlacedTileFor(Figure.dragon)

  if (!dragonPlacedTile) {
    return List()
  }

  let fairyPlacedTile = world.getPlacedTileFor(Figure.fairy)

  return dragonPlacedTile.position.getNeighbours(Direction.cardinals)
    .filter(position => world.tiles.has(position!) && (!fairyPlacedTile || !position!.equals(fairyPlacedTile.position)))
    .map(position => ({ figure: Figure.dragon, placedTile: world.tiles.get(position!) } as PlacedFigure))
    .toList()
}
