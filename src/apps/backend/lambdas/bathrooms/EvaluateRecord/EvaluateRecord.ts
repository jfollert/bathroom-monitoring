import { DynamoDBBathroomRepository } from '@bath-mon/bathrooms/infrastructure/DynamoDBBathroomRepository';
import { EventBridgeEvent, EventBridgeHandler } from 'aws-lambda';
import { RecordEvaluator } from '@bath-mon/bathrooms/application/Evaluate/RecordEvaluator';
import { EvaluateRecordRequest } from '@bath-mon/bathrooms/application/Evaluate/EvaluateRecordRequest';

type EBH = EventBridgeHandler<string, any, void>

const {
	TABLE_NAME
} = process.env;

export const handler : EBH = async (event: EventBridgeEvent<string, any>, context: any) => {
	console.info('==> Evaluate Sensor Record Handler')
	console.info('EVENT:', event);
	console.info('CONTEXT:', context);

	// Verify existence of enviroment variables
	if (!TABLE_NAME )
		throw new Error("ENV. VARS. NOT FOUND");

	const { record } = event?.detail?.attributes;
	console.log(record);

	if (!record) throw new Error("NO RECORD FOUND");

	const repository = new DynamoDBBathroomRepository(TABLE_NAME);
	const evaluator = new RecordEvaluator(repository);

	const request: EvaluateRecordRequest = {
		id: record.id,
		ocurredOn: record.ocurredOn,
		sensorId: record.sensorId,
		value: record.value
	}

	try {
		await evaluator.run(request);
	} catch (error) {
		console.error(error);
		throw new Error("EVALUATION FAILED");
	}
};