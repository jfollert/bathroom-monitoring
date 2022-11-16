import  { Handler,
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2
} from "aws-lambda";

import { SensorUpdater } from '@bath-mon/sensors/application/Update/SensorUpdater';
import { DynamoDBSensorRepository } from "@bath-mon/sensors/infrastructure/DynamoDBSensorRepository";
import { UpdateSensorRequest } from "@bath-mon/sensors/application/Update/UpdateSensorRequest";

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
	console.info('==> Update Sensor Handler')
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

	const body = JSON.parse(event.body || '{}');
	const { name } = body;

	const repository = new DynamoDBSensorRepository(TABLE_NAME);
	const updater = new SensorUpdater(repository);

	const request: UpdateSensorRequest = {
		id: sensorId,
		name
	}

	try {
		await updater.run(request);
		return {
			statusCode: 200,
			headers: HEADERS
		}
	} catch (error: any) {
		console.error('error: ', error);
		if (error.name = 'InvalidArgumentError') return {
			statusCode: 400,
			headers: HEADERS,
		}
		return {
			statusCode: 500,
			headers: HEADERS
		}
	}
};
