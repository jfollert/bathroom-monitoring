type BathroomPrimitives = {
	id: string,
	floor: number,
}

export class Bathroom {
	readonly id: string;
	readonly floor: number;

	constructor({id, floor}: BathroomPrimitives) {
		this.id = id;
		this.floor = floor;
	}
}
