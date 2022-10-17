import { DynamoDBBathroomRepository } from "@bath-mon/bathrooms/infrastructure/DynamoDBBathroomRepository";
import { BathroomsFinder } from "@bath-mon/bathrooms/application/Find/BathroomsFinder";

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
	console.info('==> Find Bathroom Handler')
	console.info('EVENT:', event);
	console.info('CONTEXT:', context);

	if (!TABLE_NAME) return {
		statusCode: 500,
		headers: HEADERS,
	};

	const repository = new DynamoDBBathroomRepository(TABLE_NAME);
	const finder = new BathroomsFinder(repository);

	try {
		const bathrooms = await finder.run();
		return {
			statusCode: 200,
			headers: HEADERS,
			body: JSON.stringify(bathrooms)
		}
	} catch (error: unknown) {
		console.error(error);
		return {
			statusCode: 500,
			headers: HEADERS
		}
	}
};
