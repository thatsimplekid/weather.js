const config    = require('./config.json');
const meta      = require('./package.json');
const util      = require('./funcs.js');

const express   = require('express'),
      serial    = require('serialport');
      app       = express(),
      port      = config.REST_LISTEN_PORT | (config.REST_LISTEN_PORT + 1);

const META_NAME = "Weather.js",
      META_VER  = "0.1.0",
      META_OS   = "";

    /**
     *     _    _            _   _                 _     
     *    | |  | |          | | | |               (_)    
     *    | |  | | ___  __ _| |_| |__   ___ _ __   _ ___ 
     *    | |/\| |/ _ \/ _` | __| '_ \ / _ \ '__| | / __|
     *    \  /\  /  __/ (_| | |_| | | |  __/ |  _ | \__ \
     *     \/  \/ \___|\__,_|\__|_| |_|\___|_| (_)| |___/
     *                                           _/ |    
     *                                          |__/     
     *      
     *      Weather.JS is a node.js application that reads serial data from 
     *          the Davis Vantage Pro2 and presents it in a JSON format,
     *          served by a REST API.
     */

function log(message) {
    var date = new Date().toISOString().replace('/T/', ' ').replace('/\..+/','');
    console.log('[' + date + '] ' + message);
}

function serialWakeUp(port) {
    port.write('\n');           port.drain();
    port.write('TEST\n');       port.drain();
}

app.listen(port);
util.log('REST server started successfully');
util.log('Attempting to open serial port \'COM' + config.SERIAL_COM_NUMBER + '\'');

var serialPort = new SerialPort('\\\\.\\COM' + (config.SERIAL_COM_NUMBER | '1'), {baudRate: 9600});

serialPort.on('open', function () {
    util.log('Successfully opened connection to \'COM' + config.SERIAL_COM_NUMBER + '\'');
});

app.get('/overview', function (res, req) {

});

