import { BathroomPrimitives } from "../../domain/Bathroom";
import { BathroomRepository } from "../../domain/BathroomRepository";

export class BathroomsFinder {
	readonly repository: BathroomRepository;
	
	constructor(repository: BathroomRepository) {
		this.repository = repository;
	}
	
	async run(): Promise<BathroomPrimitives[]> {
		const bathrooms = await this.repository.findAll();
		return bathrooms.map(bathroom => bathroom.toPrimitives());
	}
}