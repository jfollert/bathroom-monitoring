import { SensorRepository } from "../domain/SensorRepository";
import { Sensor } from "../domain/Sensor";
import { DynamoDB } from "aws-sdk";

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
			SK 		: 	`SENSOR#${sensor.id}`
		};

		const response = await dynamo.put({
			TableName: this.tableName,
			Item: persistedPatient
		}).promise();

		console.log('response:', response);
	

		console.log('Sensor saved!')
	}

}
