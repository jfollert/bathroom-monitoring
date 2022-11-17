import { NotFoundException } from "@bath-mon/shared/domain/value-object/NotFoundException";
import { Bathroom } from "../../domain/Bathroom";
import { BathroomDispenser } from "../../domain/BathroomDispenser";
import { BathroomRepository } from "../../domain/BathroomRepository";
import { EvaluateRecordRequest } from "./EvaluateRecordRequest";

export class RecordEvaluator {
	private readonly repository: BathroomRepository;

	constructor(repository: BathroomRepository) {
		this.repository = repository;
	}

	async run(request: EvaluateRecordRequest): Promise<void> {
		console.log('request:', request);
		const bathrooms = await this.repository.findAll();
		const bathroom = bathrooms.find(bathroom => bathroom.dispensers.some(dispenser => dispenser.sensorId.value === request.sensorId));
		console.log('bathroom:', bathroom);

		if (!bathroom) throw new NotFoundException(request.sensorId);

		const dispenser = bathroom.dispensers.find(dispenser => dispenser.sensorId.value === request.sensorId);

		if (!dispenser) throw new NotFoundException(request.sensorId);

		// Evaluate record
		const newStatus = request.value === 0 ? 'EMPTY' : 'NOT_EMPTY';

		const updatedDispenser = BathroomDispenser.fromPrimitives({
			...dispenser.toPrimitives(),
			status: newStatus
		});

		const filteredDispensers = bathroom.dispensers.filter(dispenser => dispenser.sensorId.value !== request.sensorId);

		const updatedBathroom = Bathroom.fromPrimitives({
			...bathroom.toPrimitives(),
			dispensers: [
				...filteredDispensers.map(dispenser => dispenser.toPrimitives()),
				updatedDispenser.toPrimitives()
			]
		});

		return await this.repository.save(updatedBathroom);
	}
}