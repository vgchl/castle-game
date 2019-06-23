"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phase_1 = require("./phase");
const game_1 = require("../game");
const immutable_1 = require("immutable");
const new_turn_phase_1 = require("./new-turn-phase");
class ScorePhase extends phase_1.Phase {
    update(game) {
        const completedProperties = this.getCompletedProperties(game);
        if (!completedProperties.isEmpty()) {
            return this.scoreProperty(game, completedProperties.first());
        }
        else {
            return game.set({ phase: new new_turn_phase_1.NewTurnPhase() });
        }
    }
    actions(game) {
        return immutable_1.List();
    }
    getCompletedProperties(game) {
        return game.world.figures
            .filter(placedFigure => placedFigure.figure.isFollower && placedFigure.placedSegment.segment.isCompletable)
            .map(placedFigure => game.world.getConnectedSegments(placedFigure.placedSegment).toSet())
            .filter(propertySegments => game.world.isCompleted(propertySegments));
    }
    scoreProperty(game, propertySegments) {
        const propertyFigures = this.getFiguresOnProperty(game, propertySegments);
        const scores = this.scoreCity(game, propertySegments);
        const figures = game.world.figures.subtract(propertyFigures);
        return game
            .set({
            world: game.world.set({ figures }),
            turns: game_1.Game.setCurrentTurn(game, {
                scores: game.currentTurn.scores.concat(scores).toList()
            })
        });
    }
    getFiguresOnProperty(game, propertySegments) {
        return game.world.figures
            .filter(figure => !!figure.placedSegment && propertySegments.contains(figure.placedSegment))
            .toSet();
    }
    // TODO: Support cloisters
    // TODO: Move to separate class
    scoreCity(game, propertySegments) {
        const numberOfTiles = propertySegments.map(segment => segment.placedTile).toSet().size;
        const pointsPerTile = this.getPointsPerTile(game, propertySegments);
        const numberOfPennants = 0; // TODO
        const points = pointsPerTile * (numberOfTiles + numberOfPennants);
        const playersWithMajority = this.getPlayersWithMajority(game, propertySegments);
        return playersWithMajority.map(player => ({ player, points })).toList();
    }
    getPointsPerTile(game, propertySegments) {
        // TODO: Check if property is closed
        // TODO: Check for cathedral in property
        // TODO: Check for property type
        return 2;
    }
    getPlayersWithMajority(game, propertySegments) {
        const pointsByPlayer = this.getFiguresOnProperty(game, propertySegments).reduce((pointsByPlayer, placedFigure) => {
            return pointsByPlayer.update(placedFigure.player, 0, points => points + placedFigure.figure.pointsTowardMajority);
        }, immutable_1.Map());
        const maxPoints = pointsByPlayer.max();
        return pointsByPlayer.filter(points => points === maxPoints).keySeq().toSet();
    }
}
exports.ScorePhase = ScorePhase;
//# sourceMappingURL=score-phase.js.map