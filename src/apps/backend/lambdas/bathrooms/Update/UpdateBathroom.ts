import  { Handler,
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2
} from "aws-lambda";

import { DynamoDBBathroomRepository } from '@bath-mon/bathrooms/infrastructure/DynamoDBBathroomRepository';
import { UpdateBathroomRequest } from '@bath-mon/bathrooms/application/Update/UpdateBathroomRequest';
import { BathroomUpdater } from '@bath-mon/bathrooms/application/Update/BathroomUpdater';

const {
	TABLE_NAME
} = process.env;

const HEADERS = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Headers" : "*",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "*"
};

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>

export const handler : ProxyHandler = async (event, context) => {
	console.info('==> Update Bathroom Handler')
	console.info('EVENT:', event);
	console.info('CONTEXT:', context);

	if (!TABLE_NAME) return {
		statusCode: 500,
		headers: HEADERS,
	};

	const id = event.pathParameters?.id;

	if (!id) return {
		statusCode: 400,
		headers: HEADERS,
	}

	const body = JSON.parse(event.body || '{}');
	const { floor, building } = body;

	const repository = new DynamoDBBathroomRepository(TABLE_NAME);
	const updater = new BathroomUpdater(repository);

	const request: UpdateBathroomRequest = {
		id,
		floor,
		building,
	}

	try {
		await updater.run(request);
		return {
			statusCode: 200,
			headers: HEADERS
		}
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			headers: HEADERS
		}
	}
};
