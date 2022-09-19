
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dexbr-sdk.cjs.production.min.js')
} else {
  module.exports = require('./dexbr-sdk.cjs.development.js')
}
