import { SensorId } from "./SensorId";
import { SensorRecordId } from "./SensorRecordId";
import { SensorRecordOcurredOn } from "./SensorRecordOcurredOn";
import { SensorRecordValue } from "./SensorRecordValue";

export type SensorRecordPrimitives = {
	id: string,
	sensorId: string,
	ocurredOn: number,
	value: number,
};

export class SensorRecord {
	private readonly id: SensorRecordId;
	private readonly sensorId: SensorId;
	private readonly ocurredOn: SensorRecordOcurredOn;
	private readonly value: SensorRecordValue;
	
	constructor({ id, sensorId, ocurredOn, value }: {
		id: SensorRecordId,
		sensorId: SensorId,
		ocurredOn: SensorRecordOcurredOn,
		value: SensorRecordValue,
	}) {
		this.id = id;
		this.sensorId = sensorId;
		this.ocurredOn = ocurredOn;
		this.value = value;
	}

	toPrimitives(): SensorRecordPrimitives {
		return {
			id: this.id.value,
			sensorId: this.sensorId.value,
			ocurredOn: this.ocurredOn.value,
			value: this.value.value
		};
	}

	static fromPrimitives(primitives: SensorRecordPrimitives): SensorRecord {
		return new SensorRecord({
			id: new SensorRecordId(primitives.id),
			sensorId: new SensorId(primitives.sensorId),
			ocurredOn: new SensorRecordOcurredOn(primitives.ocurredOn),
			value: new SensorRecordValue(primitives.value),
		});
	}
}