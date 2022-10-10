import  { Handler,
	APIGatewayProxyEventV2,
	APIGatewayProxyResultV2
} from "aws-lambda";

const {
	STAGE
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

	const responseBody = {
		message: 'Hello from Lambda!',
		stage: STAGE,
	}

	return {
		statusCode: 200,
		body: JSON.stringify(responseBody),
		headers: HEADERS
	};
};
