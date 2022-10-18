import { BathroomId } from "../../domain/BathroomId";
import { BathroomRepository } from "../../domain/BathroomRepository";
import { RemoveBathroomRequest } from "./RemoveBathroomRequest";

export class BathroomRemover {
	constructor(private repository: BathroomRepository) {}

  	async run(request: RemoveBathroomRequest): Promise<void> {
		const id  = new BathroomId(request.id);
		await this.repository.remove(id);
  	}
}