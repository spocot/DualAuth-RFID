#!/usr/bin/env/ python
from nanpy import ArduinoApi
from nanpy import SerialManager
connection = SerialManager(device='/dev/ttyACM2')
from time import sleep
a = ArduinoApi(connection=connection)
LED = 10
a.pinMode(LED, a.OUTPUT)

print "Starting"
print "5 blinks"
for i in range(0,5):
    print i
print "Finished"
