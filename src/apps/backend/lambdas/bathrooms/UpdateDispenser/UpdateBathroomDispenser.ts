import  { Handler,
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2
} from "aws-lambda";

import { DynamoDBBathroomRepository } from '@bath-mon/bathrooms/infrastructure/DynamoDBBathroomRepository';
import { UpdateBathroomDispenserRequest } from '@bath-mon/bathrooms/application/UpdateDispenser/UpdateBathroomDispenserRequest';
import { BathroomDispenserUpdater } from '@bath-mon/bathrooms/application/UpdateDispenser/BathroomDispenserUpdater';

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
	console.info('==> Update Bathroom Dispenser Handler')
	console.info('EVENT:', event);
	console.info('CONTEXT:', context);

	if (!TABLE_NAME) return {
		statusCode: 500,
		headers: HEADERS,
	};

	const bathroomId = event.pathParameters?.bathroomId;
	const dispenserId = event.pathParameters?.dispenserId;

	if (!bathroomId || !dispenserId) return {
		statusCode: 400,
		headers: HEADERS,
	}

	const body = JSON.parse(event.body || '{}');
	const { sensorId, status } = body;

	const repository = new DynamoDBBathroomRepository(TABLE_NAME);
	const updater = new BathroomDispenserUpdater(repository);

	const request: UpdateBathroomDispenserRequest = {
		id: dispenserId,
		bathroomId,
		sensorId,
		status
	}

	try {
		await updater.run(request);
		return {
			statusCode: 200,
			headers: HEADERS
		}
	} catch (error: any) {
		console.error('error: ', error);
		if (error.name == 'InvalidArgumentError') return {
			statusCode: 400,
			headers: HEADERS,
		}
		if (error.name == 'NotFoundException') return {
			statusCode: 404,
			headers: HEADERS,
		}
	}

	return {
		statusCode: 500,
		headers: HEADERS
	}
};
