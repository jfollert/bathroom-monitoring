type SensorPrimitives = {
	id: string
}

export class Sensor {
	readonly id: string;

	constructor({id }: SensorPrimitives) {
		this.id = id;
	}
}
