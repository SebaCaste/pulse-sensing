import sys
from auth import MiBand3
from cursesmenu import *
from cursesmenu.items import *
from constants import ALERT_TYPES
import time
import json

MAC_ADDR = "CC:74:2F:87:DC:17"

def onBpmReading(x):
    print('Realtime-heart-BPM:' + json.dumps({ "mac": MAC_ADDR, "bpm": x }), flush=True)

def heart_beat():
    band.start_raw_data_realtime(heart_measure_callback=onBpmReading)
    input('Press Enter to continue')


print('Attempting to connect to ', MAC_ADDR)

band = MiBand3(MAC_ADDR, debug=True)
band.setSecurityLevel(level = "medium")

# Authenticate the MiBand
if len(sys.argv) > 2:
    if band.initialize():
        print("Initialized...")
    band.disconnect()
    sys.exit(0)
else:
    band.authenticate()

heart_beat()


