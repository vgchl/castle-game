import { PlacedTile } from './placed-tile'
import { Position } from './position'
import { Map, Set, List } from 'immutable'
import { PlacedFigure } from './placed-figure'
import { GameRuleViolationError } from '../game-rule-violation-error'
import { Tile } from './tile'
import { Direction } from './direction'
import { Figure } from './figure'
import { Player } from '../player'
import { getPossibleFollowerPlacements, getPossibleBuilderPlacements, getPossibleFairyPlacements, getPossibleDragonPlacements } from './figure-placement'
import { PlacedSegment } from './placed-segment'

/**
 * Represents the 'board' of the game, consisting of the tiles that make up the farms, roads and cities.
 */
export class World {
  /**
   * The tiles that make up the world.
   */
  public readonly tiles: Map<Position, PlacedTile>

  /**
   * The figures placed in the world.
   */
  public readonly figures: Set<PlacedFigure>

  /**
   * Create a new World.
   *
   * @param props World properties
   */
  constructor (props: WorldProps = {}) {
    this.tiles = props.tiles || Map<Position, PlacedTile>()
    this.figures = props.figures || Set<PlacedFigure>()
  }

  /**
   * Expands the world by placing a tile on the board.
   *
   * @param tile The tile to place
   * @param position Where the tile should be placed
   * @param orientation In what orientation the tile should be placed
   */
  public placeTile (tile: Tile, position: Position, orientation: Direction): World {
    if (!this.canPlaceTile(tile, position, orientation)) {
      throw new GameRuleViolationError('Tile may not be placed there.')
    }
    let tiles = this.tiles.set(position, new PlacedTile(tile, position, orientation))
    return this.set({ tiles })
  }

  /**
   * Checks whether a tile fits a certain position on the board.
   *
   * @param tile The tile to place
   * @param position Where the tile should be placed
   * @param orientation In what orientation the tile should be placed
   * @returns Whether the tile can be placed
   */
  public canPlaceTile (tile: Tile, position: Position, orientation: Direction): boolean {
    return Direction.cardinals.every(direction => {
      direction = direction!
      let neighbourTile = this.tiles.get(position.getNeighbour(direction))
      if (!neighbourTile) {
        return true
      }
      let neighbourEdge = neighbourTile.getEdge(direction.getOpposite())
      return tile.edges.get(direction.relativeTo(orientation)).canConnectTo(neighbourEdge)
    })
  }

  /**
   * Finds all positions and orientations at which the provided tile can be placed.
   *
   * @param tile The tile to place
   * @returns The positions at which the tile can be placed, and what orientations are valid for that position
   */
  public getPossibleTilePlacements (tile: Tile): Map<Position, List<Direction>> {
    let options = Map<Position, List<Direction>>()
    this.tiles.forEach(placedTile => {
      placedTile!.position.getNeighbours(Direction.cardinals).forEach(neighbourPosition => {
        if (!this.tiles.has(neighbourPosition!) && !options.has(neighbourPosition!)) {
          const orientations = Direction.cardinals.filter(orientation => this.canPlaceTile(tile, neighbourPosition!, orientation!))
          if (orientations.size > 0) {
            options = options.set(neighbourPosition!, orientations.toList())
          }
        }
      })
    })
    return options
  }

  /**
   * Finds all segments connected to the given segment of the given placed tile.
   * The given placed tile does not have to be part of the world yet.
   *
   * @param segment The segment to find all connected segments for
   * @param placedTile The placed tile containing the starting segment
   * @returns All connected segments
   */
  public getConnectedSegments (placedSegment: PlacedSegment): List<PlacedSegment> {
    let world = this.placeTile(placedSegment.placedTile.tile, placedSegment.placedTile.position, placedSegment.placedTile.orientation)
    let todo = [placedSegment]
    let placedSegments: PlacedSegment[] = []
    while (todo.length > 0) {
      placedSegment = todo.pop()!
      placedSegments.push(placedSegment)
      placedSegment.placedTile.getEdgesWithSegment(placedSegment.segment).forEach((edge, direction) => {
        const neighbourTile = world.tiles.get(placedSegment.placedTile.position.getNeighbour(direction!))
        if (neighbourTile) {
          const neighbourSegments = neighbourTile
            .getEdge(direction!.getOpposite())
            .getSegmentsConnectedTo(placedSegment.segment, edge!)
            .filter(neighbourSegment => todo.concat(placedSegments).map(placedSegment => placedSegment.segment).indexOf(neighbourSegment!) < 0) // TODO: Use Sets instead of filter
            .map(neighbourSegment => new PlacedSegment(neighbourSegment!, neighbourTile))
            .toList()
          todo = todo.concat(neighbourSegments.toJS())
        }
      })
    }
    return List(placedSegments)
  }

  /**
   * Finds all possible placements for the provided figures.
   *
   * @param figures The figures that the player may be place.
   * @param placedTile The tile that was placed during this turn.
   */
  public getPossibleFigurePlacements (figure: Figure, placedTile: PlacedTile, player: Player): List<PlacedFigure> {
    switch (figure) {
      case Figure.follower:
      case Figure.largeFollower:
        return getPossibleFollowerPlacements(this, figure, placedTile, player)
      case Figure.builder:
        return getPossibleBuilderPlacements(this, placedTile, player)
      case Figure.fairy:
        return getPossibleFairyPlacements(this, player)
      case Figure.dragon:
        return getPossibleDragonPlacements(this)
      default:
        throw new Error('Unknown follower type')
    }
  }

  // TODO Support builder
  public canPlaceFigure (placedFigure: PlacedFigure): boolean {
    return this.getConnectedSegments(placedFigure.placedSegment!)
      .every(placedSegment => !this.isOccupied(placedSegment!))
  }

  public placeFigure (placedFigure: PlacedFigure): World {
    if (!this.canPlaceFigure(placedFigure)) {
      throw new GameRuleViolationError('Can not place figure here.')
    }
    return this.set({
      figures: this.figures.add(placedFigure)
    })
  }

  /**
   * Checks whether a segment is occupied. Optionally, it checks only whether the segment is occupied by a given player.
   *
   * @param segment The segment
   * @param player (Optional) By what player the segment is occupied
   */
  public isOccupied (placedSegment: PlacedSegment, player?: Player): boolean {
    return this.figures.some(placedFigure => {
      return placedFigure!.placedSegment!.equals(placedSegment) &&
        !placedFigure!.figure.isNeutral &&
        (!player || placedFigure!.player === player)
    })
  }

  // TODO: Support cloisters
  public isCompleted (placedSegments: Set<PlacedSegment>): boolean {
    return placedSegments.every(placedSegment => placedSegment!.placedTile.getEdgesWithSegment(placedSegment!.segment).keySeq()
      .every(direction => this.tiles.has(placedSegment!.placedTile.position.getNeighbour(direction!)))
    )
  }

  /**
   * Get the PlacedTile where a figure is placed.
   *
   * @param figure The figure
   */
  public getPlacedTileFor (figure: Figure): PlacedTile | undefined {
    return this.figures
      .filter(placedFigure => placedFigure!.figure === figure)
      .map(placedFigure => placedFigure!.placedTile)
      .first()
  }

  /**
   * Create a new World based on this one with overwritten properties.
   *
   * @param props The properties to overwrite
   */
  public set (props: WorldProps): World {
    return new World({
      tiles: this.tiles,
      figures: this.figures,
      ...props
    })
  }
}

export interface WorldProps {

  readonly tiles?: Map<Position, PlacedTile>
  readonly figures?: Set<PlacedFigure>

}
