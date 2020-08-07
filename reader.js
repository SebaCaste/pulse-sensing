/*
Test script that reads MQTT messages and prints them to stdout
 */

const mqtt = require('mqtt');
const settings = require('./settings');

let clientMqtt = mqtt.connect('mqtt://81.161.233.141', {
    'username': 'hackathon:dev',
    'password': 'systems123'
});

clientMqtt.on('connect', function () {
    clientMqtt.subscribe(settings.TOPIC, function (err) {
        if (err) {
            console.log('ERROR SUBSCRIPTION: ' + err);
        } else {
            console.log('SUBSCRIBED');
        }
    });
});

clientMqtt.on('message', function (topic, message) {
    console.log('Received: ' + message.toString());
});
