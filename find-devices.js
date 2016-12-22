'use strict'
/**
 * Simple tool to find device on network
 */

const Wemo = require('wemo-client')
let wemo = new Wemo()

wemo.discover((deviceInfo) => {
  console.log('Wemo Device Found: %s ', deviceInfo.friendlyName)
  console.log('Setup Url: http://%s:%s/setup.xml', deviceInfo.host, deviceInfo.port)
})
