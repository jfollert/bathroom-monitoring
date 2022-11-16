import { SensorId } from "./SensorId";
import { SensorName } from "./SensorName";
import { SensorRecordPrimitives } from "./SensorRecord";
import { SensorRecords, SensorRecordsPrimitives } from "./SensorRecords";
import { AggregateRoot } from '@bath-mon/shared/domain/AggregateRoot';
import { SensorRecordAggregatedDomainEvent } from "./SensorRecordAggregatedDomainEvent";

export type SensorPrimitives = {
	id: string,
	name: string,
	records: SensorRecordsPrimitives,
}

export class Sensor extends AggregateRoot {
	readonly id: SensorId;
	readonly name: SensorName;
	readonly records: SensorRecords;

	constructor({ id, name, records }: { id: SensorId, name: SensorName, records: SensorRecords }) {
		super();
		this.id = id;
		this.name = name;
		this.records = records;
	}

	static aggregate(sensorPrimitives: SensorPrimitives, record: SensorRecordPrimitives): Sensor {
		const sensor = Sensor.fromPrimitives({
			...sensorPrimitives,
			records: [
				...sensorPrimitives.records, 
				record
			]
		});

		sensor.record(new SensorRecordAggregatedDomainEvent({
			record,
		}))

		return sensor;
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
