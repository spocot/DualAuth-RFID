import serial
import sys
import subprocess

if(len(sys.argv) == 2):
    asd = serial.Serial(sys.argv[1],115200)
    print("===[" + sys.argv[1] + "]===")
    while(1):
        cid = asd.readline().strip()
        subprocess.Popen(["java", "Main", cid])
else:
    print("-1")
