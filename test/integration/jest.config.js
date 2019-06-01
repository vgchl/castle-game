var config = require('../jest.config')
config.testRegex = "(/test/integration/.*(\\.|/)(test))\\.(tsx?)$"
module.exports = config
