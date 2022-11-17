import subprocess
import requests
import random

url = "https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev/sensors"


r = requests.get(url)
uuids = r.json()
procesos = [subprocess.Popen(["python3","Generador.py" ,str(uuid["id"])]) for uuid in tuple(uuids)]

for proceso in procesos:
    proceso.wait()

