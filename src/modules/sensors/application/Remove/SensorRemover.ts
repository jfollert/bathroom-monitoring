import { RemoveSensorRequest } from "./RemoveSensorRequest";
import { NotFoundException } from "@bath-mon/shared/domain/value-object/NotFoundException";
import { SensorId } from "../../domain/SensorId";
import { SensorRepository } from "../../domain/SensorRepository";

export class SensorRemover {
	constructor(private repository: SensorRepository) {}

  	async run(request: RemoveSensorRequest): Promise<void> {
		const id  = new SensorId(request.id);

		const sensor = await this.repository.findById(id);
		if (!sensor) throw new NotFoundException(request.id);

		await this.repository.remove(id);
  	}
}