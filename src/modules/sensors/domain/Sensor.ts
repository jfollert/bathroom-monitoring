import { SensorId } from "./SensorId";
import { SensorName } from "./SensorName";
import { SensorRecords, SensorRecordsPrimitives } from "./SensorRecords";

export type SensorPrimitives = {
	id: string,
	name: string,
	records: SensorRecordsPrimitives,
}

export class Sensor {
	readonly id: SensorId;
	readonly name: SensorName;
	readonly records: SensorRecords;

	constructor({ id, name, records }: { id: SensorId, name: SensorName, records: SensorRecords }) {
		this.id = id;
		this.name = name;
		this.records = records;
	}

	static fromPrimitives(primitives: SensorPrimitives) {
		return new Sensor({
			id: new SensorId(primitives.id),
			name: new SensorName(primitives.name),
			records: SensorRecords.fromPrimitives(primitives.records)
		});
	}

	toPrimitives(): SensorPrimitives {
		return {
			id: this.id.value,
			name: this.name.value,
			records: this.records.toPrimitives()
		};
	}
}
