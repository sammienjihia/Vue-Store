'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_KEY: '"a21beb0191424608b9c762eeb64afeba228fb761"'
})
