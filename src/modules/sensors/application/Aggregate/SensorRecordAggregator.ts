import { NotFoundException } from "@bath-mon/shared/domain/value-object/NotFoundException";
import { Sensor } from "../../domain/Sensor";
import { SensorId } from "../../domain/SensorId";
import { SensorRepository } from "../../domain/SensorRepository";
import { AggregateSensorRecordRequest } from "./AggregateSensorRecordRequest";

export class SensorRecordAggregator {
	private readonly repository: SensorRepository;

	constructor(repository: SensorRepository) {
		this.repository = repository;
	}

	async run(request: AggregateSensorRecordRequest): Promise<void> {
		const sensorId = new SensorId(request.sensorId);
		const sensor = await this.repository
			.findById(sensorId);

		if (!sensor) {
			throw new NotFoundException(request.sensorId);
		}

		const sensorRecord = {
			id: request.id,
			sensorId: request.sensorId,
			ocurredOn: request.ocurredOn,
			value: request.value,
		};

		const newSensor = Sensor.fromPrimitives({
			...sensor.toPrimitives(),
			records: [
				...sensor.records.toPrimitives(),
				sensorRecord
			]
		})

		await this.repository.save(newSensor);
	}
}