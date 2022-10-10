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

		const bathroom = new Sensor({
			id: request.id
		})

		return await this.repository.save(bathroom);
	}
}