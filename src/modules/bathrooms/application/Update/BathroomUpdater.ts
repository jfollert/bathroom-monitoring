import { Bathroom } from "../../domain/Bathroom";
import { BathroomRepository } from "../../domain/BathroomRepository";
import { UpdateBathroomRequest } from "./UpdateBathroomRequest";

export class BathroomUpdater {
	private readonly repository: BathroomRepository;

	constructor(repository: BathroomRepository) {
		this.repository = repository;
	}

	async run(request: UpdateBathroomRequest): Promise<void> {
		console.log('request:', request);

		const bathroom = Bathroom.fromPrimitives({
			...request,
			dispensers: []
		});
		
		return await this.repository.save(bathroom);
	}
}