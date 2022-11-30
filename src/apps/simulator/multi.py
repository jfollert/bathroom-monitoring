import subprocess
import requests
import os

base_url = os.environ.get('API_URL')
sensors_url = '{base_url}/sensors'.format(base_url=base_url)

r = requests.get(sensors_url)
uuids = r.json()
procesos = [subprocess.Popen(["python3","Generador.py" ,str(uuid["id"])]) for uuid in tuple(uuids)]

for proceso in procesos:
    proceso.wait()

