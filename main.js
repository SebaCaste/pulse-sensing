const mqtt = require('mqtt');
const settings = require('./settings');
const {connectToBand} = require('./bandReceiver');

const clientMqtt = mqtt.connect('mqtt://81.161.233.141', {
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

settings.BANDS.forEach(bandMac => {
    connectToBand(bandMac, (bpm) => {
        if (bpm.bpm > 0) {
            const json = JSON.stringify({
                ...bpm,
                timestamp: new Date().getTime()
            });
            console.log("[MAIN] Publishing message to MQTT",);
            clientMqtt.publish(settings.TOPIC, json);
        } else {
            console.log(`[MAIN] Ignore message since mpb <= 0`);
        }
    });

});
