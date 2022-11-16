import { NotFoundException } from "@bath-mon/shared/domain/value-object/NotFoundException";
import { EventBus } from "@bath-mon/shared/domain/EventBus";
import { Sensor } from "../../domain/Sensor";
import { SensorId } from "../../domain/SensorId";
import { SensorRepository } from "../../domain/SensorRepository";
import { AggregateSensorRecordRequest } from "./AggregateSensorRecordRequest";

export class SensorRecordAggregator {
	private readonly repository: SensorRepository;
	private readonly eventBus: EventBus;

	constructor(repository: SensorRepository, eventBus: EventBus) {
		this.repository = repository;
		this.eventBus = eventBus;
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

		const sensorAggregated = Sensor.aggregate(
			sensor.toPrimitives(),
			sensorRecord
		);

		await this.eventBus.publish(sensorAggregated.pullDomainEvents());

		await this.repository.save(sensorAggregated);
	}
}