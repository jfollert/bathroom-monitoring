import subprocess

cantidad = int(input("Cantidad de simulaciones: "))
lista = []
for i in range(cantidad):
    lista.append("Generador.py")
procesos = [subprocess.Popen(["python3", simulacion]) for simulacion in tuple(lista)]


for proceso in procesos:
    proceso.wait()
