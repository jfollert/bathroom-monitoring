import { DynamoDBSensorRepository } from "@bath-mon/sensors/infrastructure/DynamoDBSensorRepository";
import { SensorsFinder } from "@bath-mon/sensors/application/Find/SensorsFinder";

import  { Handler,
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2
} from "aws-lambda";

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
	console.info('==> Find Sensors Handler')
	console.info('EVENT:', event);
	console.info('CONTEXT:', context);

	if (!TABLE_NAME) return {
		statusCode: 500,
		headers: HEADERS,
	};

	const repository = new DynamoDBSensorRepository(TABLE_NAME);
	const finder = new SensorsFinder(repository);

	try {
		const sensors = await finder.run();
		return {
			statusCode: 200,
			headers: HEADERS,
			body: JSON.stringify(sensors)
		}
	} catch (error: unknown) {
		console.error(error);
		return {
			statusCode: 500,
			headers: HEADERS
		}
	}
};
