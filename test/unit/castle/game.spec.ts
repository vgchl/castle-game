import 'mocha'
import { Game } from '../../../src/castle'

describe('Game', () => {
  let game: Game

  beforeEach(() => {
    game = new Game()
  })

  describe('#constructor()', () => {
    it('starts the first turn', () => {
      expect(game.turns.toArray()).toHaveLength(1)
    })
  })
})
