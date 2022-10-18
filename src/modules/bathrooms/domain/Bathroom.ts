import { BathroomBuilding } from "./BathroomBuilding";
import { BathroomFloor } from "./BathroomFloor";
import { BathroomId } from "./BathroomId";
import { AggregateRoot } from "@bath-mon/shared/domain/AggregateRoot";

export type BathroomPrimitives = {
	id: string,
	building: string,
	floor: number,
}

export class Bathroom extends AggregateRoot{
	readonly id: BathroomId;
	readonly building: BathroomBuilding;
	readonly floor: BathroomFloor;

	constructor({ id, building, floor }: { id: BathroomId, building: BathroomBuilding, floor: BathroomFloor }) {
		super();
		this.id = id;
		this.building = building;
		this.floor = floor;
	}

	toPrimitives(): BathroomPrimitives {
		return {
			id: this.id.value,
			building: this.building.value,
			floor: this.floor.value
		}
	}

	static fromPrimitives({ id, building, floor }: BathroomPrimitives): Bathroom {
		return new Bathroom({
			id: new BathroomId(id),
			building: new BathroomBuilding(building),
			floor: new BathroomFloor(floor),
		});
	}

	
}
