import { BathroomRepository } from "../domain/BathroomRepository";
import { Bathroom, BathroomPrimitives } from "../domain/Bathroom";
import { DynamoDB } from "aws-sdk";
import { BathroomId } from "../domain/BathroomId";

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

	async findById(id: BathroomId): Promise<Bathroom | null> {
		console.log('Find bathroom by id:', id.value);
		
		const response = await dynamo.query({
			TableName: this.tableName,
			KeyConditionExpression: 'PK = :pk AND SK = :sk',
			ExpressionAttributeValues: {
				':pk': 'BATHROOM',
				':sk': `BATHROOM#${id.value}`
			}
		}).promise();
		console.log('response:', response);

		if (!response.Items || response.Items.length === 0) return null;

		const bathroom = Bathroom.fromPrimitives(response.Items[0] as BathroomPrimitives);
		console.log('bathroom:', bathroom);

		return bathroom;

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

	async remove(id: BathroomId): Promise<void> {
		console.log('Remove bathroom:', id);

		const response = await dynamo.delete({
			TableName: this.tableName,
			Key: {
				PK: 'BATHROOM',
				SK: `BATHROOM#${id}`
			}
		}).promise();

		console.log('response:', response);
	}

}
