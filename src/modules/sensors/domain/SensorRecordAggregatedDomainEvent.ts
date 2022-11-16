import { DomainEvent } from "@bath-mon/shared/domain/DomainEvent";
import { SensorRecordPrimitives } from "./SensorRecord";

type SensorRecordAggregatedEventBody = {
	readonly eventName: string;
	readonly id: string;
	readonly record: SensorRecordPrimitives;
};

export class SensorRecordAggregatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME = 'bath-mon.sensors.1.event.sensor-record.aggregated';
	readonly record: SensorRecordPrimitives;

	constructor({
		record,
		eventId,
		occurredOn
	}: {
		eventId?: string;
		record: SensorRecordPrimitives;
		occurredOn?: Date;
	}) {
		super(SensorRecordAggregatedDomainEvent.EVENT_NAME, record.id, eventId, occurredOn);
		this.record = record;
	}

	toPrimitive(): SensorRecordAggregatedEventBody {
		return {
			eventName: SensorRecordAggregatedDomainEvent.EVENT_NAME,
			id: this.aggregateId,
			record: this.record
		};
	}

	static fromPrimitives(
		body: SensorRecordAggregatedEventBody,
		eventId: string,
		occurredOn: Date
	): DomainEvent {
		return new SensorRecordAggregatedDomainEvent({
			eventId,
			occurredOn,
			record: body.record
		});
	}
}
