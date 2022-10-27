import { SensorPrimitives } from "../../domain/Sensor";
import { SensorRepository } from "../../domain/SensorRepository";


export class SensorsFinder {
	readonly repository: SensorRepository;
	
	constructor(repository: SensorRepository) {
		this.repository = repository;
	}
	
	async run(): Promise<SensorPrimitives[]> {
		const sensors = await this.repository.findAll();
		return sensors.map(bathroom => bathroom.toPrimitives());
	}
}