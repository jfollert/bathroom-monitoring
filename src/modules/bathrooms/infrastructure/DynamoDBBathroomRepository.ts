import { BathroomRepository } from "../domain/BathroomRepository";
import { Bathroom } from "../domain/Bathroom";
import { DynamoDB } from "aws-sdk";

const dynamo = new DynamoDB.DocumentClient();

export class DynamoDBBathroomRepository implements BathroomRepository {
	private readonly tableName : string;

	constructor(tableName : string){
		this.tableName = tableName;
	}

	async save(bathroom: Bathroom): Promise<void> {
		console.log('Save bathroom:', bathroom);

		const persistedPatient = {
			PK 		: 	`BATHROOM`,
			SK 		: 	`BATHROOM#${bathroom.id}`,
			floor: bathroom.floor,
		};

		const response = await dynamo.put({
			TableName: this.tableName,
			Item: persistedPatient
		}).promise();

		console.log('response:', response);
	

		console.log('Bathroom saved!')
	}

}
