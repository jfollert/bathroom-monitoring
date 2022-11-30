import { BathroomBuilding } from "./BathroomBuilding";
import { BathroomFloor } from "./BathroomFloor";
import { BathroomId } from "./BathroomId";
import { AggregateRoot } from "@bath-mon/shared/domain/AggregateRoot";
import { BathroomDispenser, BathroomDispenserPrimitives } from "./BathroomDispenser";

export type BathroomPrimitives = {
	id: string,
	building: string,
	floor: number,
	dispensers: BathroomDispenserPrimitives[],
}

export class Bathroom extends AggregateRoot{
	readonly id: BathroomId;
	readonly building: BathroomBuilding;
	readonly floor: BathroomFloor;
	readonly dispensers: BathroomDispenser[];

	constructor({ id, building, floor, dispensers }: {
		id: BathroomId,
		building: BathroomBuilding,
		floor: BathroomFloor,
		dispensers: BathroomDispenser[] 
	}) {
		super();
		this.id = id;
		this.building = building;
		this.floor = floor;
		this.dispensers = dispensers;
	}

	toPrimitives(): BathroomPrimitives {
		return {
			id: this.id.value,
			building: this.building.value,
			floor: this.floor.value,
			dispensers: this.dispensers.map(dispenser => dispenser.toPrimitives())
		}
	}

	static fromPrimitives(primitives: BathroomPrimitives): Bathroom {
		return new Bathroom({
			id: new BathroomId(primitives.id),
			building: new BathroomBuilding(primitives.building),
			floor: new BathroomFloor(primitives.floor),
			dispensers: primitives.dispensers.map(dispenser => BathroomDispenser.fromPrimitives(dispenser))
		});
	}

	
}
