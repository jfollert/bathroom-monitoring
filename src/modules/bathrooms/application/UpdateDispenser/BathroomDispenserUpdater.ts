import { NotFoundException } from "@bath-mon/shared/domain/value-object/NotFoundException";
import { Bathroom } from "../../domain/Bathroom";
import { BathroomDispenser } from "../../domain/BathroomDispenser";
import { BathroomId } from "../../domain/BathroomId";
import { BathroomRepository } from "../../domain/BathroomRepository";
import { UpdateBathroomDispenserRequest } from "./UpdateBathroomDispenserRequest";

export class BathroomDispenserUpdater {
	private readonly repository: BathroomRepository;

	constructor(repository: BathroomRepository) {
		this.repository = repository;
	}

	async run(request: UpdateBathroomDispenserRequest): Promise<void> {
		console.log('request:', request);

		const bathroomId = new BathroomId(request.bathroomId);
		const bathroom = await this.repository.findById(bathroomId);

		if (!bathroom) throw new NotFoundException(request.bathroomId)
		
		const dispenser = BathroomDispenser.fromPrimitives({...request});

		const newBathroom = Bathroom.fromPrimitives({
			...bathroom.toPrimitives(),
			dispensers: [
				...bathroom.dispensers.map(dispenser => dispenser.toPrimitives()),
				dispenser.toPrimitives()
			]
		});

		return await this.repository.save(newBathroom);
	}
}