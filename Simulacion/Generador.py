import json
import random
from datetime import datetime
import time
import uuid
import requests

# make a random UUID
#UUID('bd65600d-8669-4903-8a14-af88203add38')
sensor_uuid = uuid.uuid4()

now = datetime.now()
inicio = time.time()
fin = time.time()

# Pueba con un uuid de sensor creado.
#url = "https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev/sensors/36593e9d-f450-4958-bd5f-69b0e15e0765/records/"
url = "https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev/sensors/"+str(sensor_uuid)+"/records/"

while True:
    while(fin - inicio < 60):
        medicion = {
        "value": str(random.randint(0,10)),
        }
        medicion_uuid = uuid.uuid4()
        respuesta = requests.put(url+str(medicion_uuid), json=medicion)
        print(respuesta)
        fin = time.time()
        time.sleep(10)
    time.sleep(3540)
