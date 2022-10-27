import { SensorId } from "./SensorId";
import { SensorName } from "./SensorName";

export type SensorPrimitives = {
	id: string,
	name: string,
}

export class Sensor {
	readonly id: SensorId;
	readonly name: SensorName;

	constructor({ id, name }: { id: SensorId, name: SensorName }) {
		this.id = id;
		this.name = name;
	}

	static fromPrimitives(primitives: SensorPrimitives) {
		return new Sensor({
			id: new SensorId(primitives.id),
			name: new SensorName(primitives.name),
		});
	}

	toPrimitives(): SensorPrimitives {
		return {
			id: this.id.value,
			name: this.name.value,
		};
	}
}
