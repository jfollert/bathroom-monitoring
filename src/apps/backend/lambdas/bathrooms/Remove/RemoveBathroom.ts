import { DynamoDBBathroomRepository } from "@bath-mon/bathrooms/infrastructure/DynamoDBBathroomRepository";
import { BathroomRemover } from "@bath-mon/bathrooms/application/Remove/BathroomRemover";

import  { Handler,
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2
} from "aws-lambda";
import { RemoveBathroomRequest } from "@bath-mon/bathrooms/application/Remove/RemoveBathroomRequest";

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
	console.info('==> Remove Bathroom Handler')
	console.info('EVENT:', event);
	console.info('CONTEXT:', context);

	if (!TABLE_NAME) return {
		statusCode: 500,
		headers: HEADERS,
	};

	const bathroomId = event.pathParameters?.bathroomId;

	if (!bathroomId) return {
		statusCode: 400,
		headers: HEADERS,
	}

	const repository = new DynamoDBBathroomRepository(TABLE_NAME);
	const remover = new BathroomRemover(repository);

	const request: RemoveBathroomRequest = {
		id: bathroomId
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
