import random
import time
import uuid
import requests
import sys
import os

base_url = os.environ.get('API_URL')
sensor_url = '{base_url}/sensors/{sensor_id}/'.format(
	base_url=base_url,
	sensor_id=sys.argv[1]
	)

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
    respuesta = requests.put(sensor_url+str(medicion_uuid), json=medicion)
    if valor == 0:
        print("Sensor: " + str(sys.argv[1]), medicion, respuesta )

    time.sleep(5)

    

