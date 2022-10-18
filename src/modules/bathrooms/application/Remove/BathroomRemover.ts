import { BathroomId } from "../../domain/BathroomId";
import { BathroomRepository } from "../../domain/BathroomRepository";
import { RemoveBathroomRequest } from "./RemoveBathroomRequest";
import { NotFoundException } from "@bath-mon/shared/domain/value-object/NotFoundException";

export class BathroomRemover {
	constructor(private repository: BathroomRepository) {}

  	async run(request: RemoveBathroomRequest): Promise<void> {
		const id  = new BathroomId(request.id);

		const bathroom = await this.repository.findById(id);
		if (!bathroom) throw new NotFoundException(request.id);

		await this.repository.remove(id);
  	}
}