import serial
import sys

if(len(sys.argv) == 2):
    asd = serial.Serial(sys.argv[1],115200)
    asd.write(b'R')
    cid = asd.readline()
    cid = cid.translate(None, '.')
    print(cid)
    uid = asd.readline()
    uid = uid.translate(None, '.')
    #sys.stdout = open("//home/pi/ard/TestText/test.txt", "w")
    print(uid)
    #send to server
else:
    print "-1"
 
