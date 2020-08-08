# HeartBit - MQTT -> WS

> Main repository: [https://github.com/slavetto/merano-2020-gestionale](https://github.com/slavetto/merano-2020-gestionale)

This repository contains the code that connects to the MiBand 3 devices using BLE and sends the readings to the MQTT Broker.

The code that publishes the MQTT messages is the `main.js` script, which invokes a python script for each band. The Python script connects to a MiBand3 device and writes to stdout the received readings.
