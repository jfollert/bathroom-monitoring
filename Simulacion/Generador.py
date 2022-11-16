import json
import random
from datetime import datetime
import time
import uuid
import requests

sensor_uuid = uuid.uuid4()

now = datetime.now()
inicio = time.time()
fin = time.time()

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
