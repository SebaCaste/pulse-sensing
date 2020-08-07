const {spawn} = require('child_process');

function connectToBand(onBpm) {
    const mqttReader = spawn('python3', ['./MiBand3/server.py']);

    mqttReader.stdout.on('data', data => {
        console.log(`stdout: ${data}`);
        if (data.indexOf("Realtime-heart-BPM:") === 0) {
            try {
                const jsonString = data.toString().substr("Realtime-heart-BPM:".length);
                const json = JSON.parse(jsonString);
                onBpm(json);
            } catch(e) {
                console.error(e)
            }
        }
    });

    mqttReader.stderr.on('data', data => {
        console.log(`stderr: ${data}`);
    });

    mqttReader.on('close', code => {
        console.log(`child process exited with code ${code}`);
        setTimeout(() => {
            console.log("Retrying to connect");
            connectToBand(onBpm);
        }, 1000);

    });
}

module.exports = {
    connectToBand
};
