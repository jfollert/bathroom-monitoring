import { SensorRecord, SensorRecordPrimitives } from './SensorRecord';

export type SensorRecordsPrimitives = SensorRecordPrimitives[];

export class SensorRecords {
	readonly records: SensorRecord[];

	constructor(records: SensorRecord[]) {
		this.records = records;
	}

	static fromPrimitives(records: SensorRecordsPrimitives): SensorRecords {
		return new SensorRecords(records.map(record => SensorRecord.fromPrimitives(record)));
	}

	toPrimitives(): SensorRecordsPrimitives {
		return this.records.map(record => record.toPrimitives());
	}

	static none(): SensorRecords {
		return new SensorRecords([]);
	}
}
