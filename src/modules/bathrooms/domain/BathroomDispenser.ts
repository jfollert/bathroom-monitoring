import { BathroomDispenserId } from "./BathroomDispenserId";
import { BathroomDispenserSensorId } from "./BathroomDispenserSensorId";
import { BathroomDispenserStatus } from "./BathroomDispenserStatus";

export type BathroomDispenserPrimitives = {
	id: string,
	sensorId: string,
	status: string,
}

export class BathroomDispenser {
	readonly id: BathroomDispenserId;
	readonly sensorId: BathroomDispenserSensorId;
	readonly status: BathroomDispenserStatus;

	constructor({ id, sensorId, status }: { 
		id: BathroomDispenserId,
		sensorId: BathroomDispenserSensorId,
		status: BathroomDispenserStatus 
	}) {
		this.id = id;
		this.sensorId = sensorId;
		this.status = status;
	}

	toPrimitives(): BathroomDispenserPrimitives {
		return {
			id: this.id.value,
			sensorId: this.sensorId.value,
			status: this.status.value
		}
	}

	static fromPrimitives(primitives: BathroomDispenserPrimitives): BathroomDispenser {
		return new BathroomDispenser({
			id: new BathroomDispenserId(primitives.id),
			sensorId: new BathroomDispenserSensorId(primitives.sensorId),
			status: new BathroomDispenserStatus(primitives.status)
		});
	}
}