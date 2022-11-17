import json
import random
import time
import uuid
import requests
import sys

url = "https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev/sensors/"+ str(sys.argv[1])+"/records/"

valor = 5

while(True):
    if valor <= 0:
        break
    n = random.randint(0,10)
    if n <= 7:
        valor -= 1
    medicion = {
    "value": valor,
    }
    medicion_uuid = uuid.uuid4()
    respuesta = requests.put(url+str(medicion_uuid), json=medicion)
    if valor == 0:
        print("Sensor: " + str(sys.argv[1]), medicion, respuesta )

    time.sleep(5)

    

