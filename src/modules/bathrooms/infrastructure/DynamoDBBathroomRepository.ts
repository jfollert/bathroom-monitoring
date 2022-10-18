import { BathroomRepository } from "../domain/BathroomRepository";
import { Bathroom, BathroomPrimitives } from "../domain/Bathroom";
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
			...bathroom.toPrimitives()
		};

		const response = await dynamo.put({
			TableName: this.tableName,
			Item: persistedPatient
		}).promise();

		console.log('response:', response);
	

		console.log('Bathroom saved!')
	}

	async findAll(): Promise<Bathroom[]> {
		console.log('Find all bathrooms');

		const response = await dynamo.query({
			TableName: this.tableName,
			KeyConditionExpression: 'PK = :pk',
			ExpressionAttributeValues: {
				':pk': 'BATHROOM'
			}
		}).promise();

		console.log('response:', response);

		if (!response.Items) {
			return [];
		}

		const bathrooms = response?.Items
			.map(item => Bathroom.fromPrimitives(item as BathroomPrimitives));

		console.log('bathrooms:', bathrooms);

		return bathrooms;
	}


}
