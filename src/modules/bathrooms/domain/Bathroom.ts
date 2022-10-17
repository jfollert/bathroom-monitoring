export type BathroomPrimitives = {
	id: string,
	building: string,
	floor: number,
}

export class Bathroom {
	readonly id: string;
	readonly building: string;
	readonly floor: number;

	constructor({ id, building, floor }: BathroomPrimitives) {
		this.id = id;
		this.building = building;
		this.floor = floor;
	}

	toPrimitives(): BathroomPrimitives {
		return {
			id: this.id,
			building: this.building,
			floor: this.floor
		}
	}

	
}
