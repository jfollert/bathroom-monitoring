import  { Handler,
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2
} from "aws-lambda";

import { SensorRecordAggregator } from '@bath-mon/sensors/application/Aggregate/SensorRecordAggregator';
import { DynamoDBSensorRepository } from "@bath-mon/sensors/infrastructure/DynamoDBSensorRepository";
import { AggregateSensorRecordRequest } from "@bath-mon/sensors/application/Aggregate/AggregateSensorRecordRequest";
import { EventBridgeEventBus } from "@bath-mon/shared/infrastructure/EventBridge/EventBridgeEventBus";

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
	const recordId = event.pathParameters?.recordId;

	if (!sensorId || !recordId) return {
		statusCode: 400,
		headers: HEADERS,
	}

	const body = JSON.parse(event.body || '{}');
	const { value } = body;

	const repository = new DynamoDBSensorRepository(TABLE_NAME);
	const eventBus = new EventBridgeEventBus();
	const aggregator = new SensorRecordAggregator(repository, eventBus);

	const request: AggregateSensorRecordRequest = {
		id: recordId,
		ocurredOn: Date.now(),
		sensorId,
		value
	}

	try {
		await aggregator.run(request);
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
		return {
			statusCode: 500,
			headers: HEADERS
		}
	}
};
