import paho.mqtt.client as mqtt
import json
from auth import MiBand3

client = mqtt.Client()

MAC_ADDR = "CC:74:2F:87:DC:17"
print('Attempting to connect to ', MAC_ADDR)

band = MiBand3(MAC_ADDR, debug=True)

def onBpmReading(x):
    print('Realtime heart BPM:', x)
    client.publish("provolosi/bpm", json.dumps({ "bpm": 70, "mac": "CC:74:2F:87:DC:17" }))

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("provolosi/bpm")
    band.start_raw_data_realtime(heart_measure_callback=onBpmReading)


# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload))



client.on_connect = on_connect
client.on_message = on_message

client.username_pw_set("hackathon:dev", "systems123")
client.connect("81.161.233.141", 1883, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
#client.loop_forever()

