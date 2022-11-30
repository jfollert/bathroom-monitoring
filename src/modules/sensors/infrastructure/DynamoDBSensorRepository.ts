import { SensorRepository } from "../domain/SensorRepository";
import { DynamoDB } from "aws-sdk";
import { Sensor, SensorPrimitives } from "../domain/Sensor";
import { SensorId } from "../domain/SensorId";

const dynamo = new DynamoDB.DocumentClient();

export class DynamoDBSensorRepository implements SensorRepository {
	private readonly tableName : string;

	constructor(tableName : string){
		this.tableName = tableName;
	}

	async save(sensor: Sensor): Promise<void> {
		console.log('Save sensor:', sensor);

		const persistedPatient = {
			PK 		: 	`SENSOR`,
			SK 		: 	`SENSOR#${sensor.id}`,
			...sensor.toPrimitives()
		};

		const response = await dynamo.put({
			TableName: this.tableName,
			Item: persistedPatient
		}).promise();

		console.log('response:', response);
	

		console.log('Sensor saved!')
	}

	async findById(id: SensorId): Promise<Sensor | null> {
		console.log('Find sensor by id:', id.value);
		
		const response = await dynamo.query({
			TableName: this.tableName,
			KeyConditionExpression: 'PK = :pk AND SK = :sk',
			ExpressionAttributeValues: {
				':pk': 'SENSOR',
				':sk': `SENSOR#${id.value}`
			}
		}).promise();
		console.log('response:', response);

		if (!response.Items || response.Items.length === 0) return null;

		const sensor = Sensor.fromPrimitives(response.Items[0] as SensorPrimitives);
		console.log('sensor:', sensor);

		return sensor;

	}

	async findAll(): Promise<Sensor[]> {
		console.log('Find all sensors');

		const response = await dynamo.query({
			TableName: this.tableName,
			KeyConditionExpression: 'PK = :pk',
			ExpressionAttributeValues: {
				':pk': 'SENSOR'
			}
		}).promise();

		console.log('response:', response);

		if (!response.Items) {
			return [];
		}

		const sensors = response?.Items
			.map(item => Sensor.fromPrimitives(item as SensorPrimitives));

		console.log('sensors:', sensors);

		return sensors;
	}

	async remove(id: SensorId): Promise<void> {
		console.log('Remove sensor:', id);

		const response = await dynamo.delete({
			TableName: this.tableName,
			Key: {
				PK: 'SENSOR',
				SK: `SENSOR#${id}`
			}
		}).promise();

		console.log('response:', response);
	}

}
