import uuid
import requests
import random

bathrooms = 3
dispensers_per_bathroom = 2

base_url = "https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev"
sensors_url = '{base_url}/sensors'.format(base_url=base_url)
bathrooms_url = '{base_url}/bathrooms'.format(base_url=base_url)

for bathroom in range(bathrooms):
	print("Creating bathroom...")
	bathroom_id = uuid.uuid4()
	url = '{bathrooms_url}/{bathroom_id}'.format(
		bathrooms_url=bathrooms_url,
		bathroom_id=bathroom_id
		)
	body = {
		'building': 'A',
		'floor': random.randint(0, 3),
	}
	res = requests.put(url, json=body)
	print(res)

	# Create sensor
	print("Creating sensor...")
	for dispenser in range(dispensers_per_bathroom):
		sensors_id = uuid.uuid4()
		url = '{sensors_url}/{sensors_id}'.format(
			sensors_url=sensors_url,
			sensors_id=sensors_id
			)
		body = {
			'name': 'Sensor {} in Bathroom {}'.format(dispenser, bathroom)
		}
		res = requests.put(url, json=body)
		print(res)

		# Associate sensor to dispenser
		print("Associating sensor to dispenser...")
		dispenser_id = uuid.uuid4()
		url = '{bathrooms_url}/{bathroom_id}/dispensers/{dispenser_id}'.format(
			bathrooms_url=bathrooms_url,
			bathroom_id=bathroom_id,
			dispenser_id=dispenser_id
			)
		body = {
			'sensorId': str(sensors_id),
			'status': 'UNKNOWN'
		}
		res = requests.put(url, json=body)
		print(res)

	
