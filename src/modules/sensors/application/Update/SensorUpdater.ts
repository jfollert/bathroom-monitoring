import { Sensor } from "../../domain/Sensor";
import { SensorRepository } from "../../domain/SensorRepository";
import { UpdateSensorRequest } from "./UpdateSensorRequest";

export class SensorUpdater {
	private readonly repository: SensorRepository;

	constructor(repository: SensorRepository) {
		this.repository = repository;
	}

	async run(request: UpdateSensorRequest): Promise<void> {
		console.log('request:', request);
		const sensor = Sensor.fromPrimitives(request);
		return await this.repository.save(sensor);
	}
}