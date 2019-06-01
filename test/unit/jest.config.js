var config = require('../jest.config')
config.testRegex = "(/test/unit/.*(\\.|/)(test))\\.(tsx?)$"
module.exports = config
