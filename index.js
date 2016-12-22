'use strict'
const Wemo = require('wemo-client')
const Device = require('losant-mqtt').Device

const LOSANT_DEVICE_ID = 'my-device-id'
const LOSANT_DEVICE_KEY = 'my-device-key'
const LOSANT_DEVICE_SECRET = 'my-device-secret'
const WEMO_DEVICE_URL = "http://IPADDRESS:49153/setup.xml"

let wemo = new Wemo()

/**
 * Construct Losant Device
 * @type {Device}
 */
let device = new Device({
    id: LOSANT_DEVICE_ID,
    key: LOSANT_DEVICE_KEY,
    secret: LOSANT_DEVICE_SECRET
})

/**
 * Connect to Losant
 */
device.connect()

wemo.load(WEMO_DEVICE_URL, (deviceInfo) => {
    console.log('Device Found: %s', deviceInfo.friendlyName)
    /**
     * Get the client for the found device
     * @type {Wemo Client}
     */
    var client = wemo.client(deviceInfo)

    /**
     * Listen for commands from Losant
     */
    console.log('Listening for Losant command...')
    device.on('command', function(command) {
        console.log('Command from Losant received: %s', command.name)

        if (command.name == 'wemo-switch') {
            console.log("Setting State to : %s", command.payload.state )
            client.setBinaryState(command.payload.state)
        }
    })
})
