import { SensorRemover } from "@bath-mon/sensors/application/Remove/SensorRemover";

import  { Handler,
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2
} from "aws-lambda";

import { DynamoDBSensorRepository } from "@bath-mon/sensors/infrastructure/DynamoDBSensorRepository";
import { RemoveSensorRequest } from "@bath-mon/sensors/application/Remove/RemoveSensorRequest";

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
	console.info('==> Remove Sensors Handler')
	console.info('EVENT:', event);
	console.info('CONTEXT:', context);

	if (!TABLE_NAME) return {
		statusCode: 500,
		headers: HEADERS,
	};

	const sensorId = event.pathParameters?.sensorId;

	if (!sensorId) return {
		statusCode: 400,
		headers: HEADERS,
	}

	const repository = new DynamoDBSensorRepository(TABLE_NAME);
	const remover = new SensorRemover(repository);

	const request: RemoveSensorRequest = {
		id: sensorId
	}

	try {
		await remover.run(request);
		return {
			statusCode: 200,
			headers: HEADERS
		}
	} catch (error: any) {
		console.error(error);
		if (error.name === 'NotFoundException') {
			return {
				statusCode: 404,
				headers: HEADERS
			}
		}
		return {
			statusCode: 500,
			headers: HEADERS
		}
	}
};
