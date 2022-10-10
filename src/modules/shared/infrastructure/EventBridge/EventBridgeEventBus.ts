import { DomainEvent } from "../../domain/DomainEvent";
import { DomainEventSubscriber } from "../../domain/DomainEventSubscriber";
import { EventBus } from "../../domain/EventBus";
import { DomainEventMapping } from "../DomainEventMapping";

import * as AWS from 'aws-sdk';

const {
	STAGE
} = process.env;


export class EventBridgeEventBus implements EventBus {
	private client: AWS.EventBridge;
	// private detailType: string;

	constructor() {
		// this.detailType = detailType;
		this.client = new AWS.EventBridge({
			region: 'sa-east-1'
		})
	}

	
	async start(): Promise<void> {
		return Promise.resolve();
	}

	async publish(events: Array<DomainEvent>): Promise<void> {
		const procesedEvents = events.map(event => {
			const data = {
				type: event.eventName,
				occurred_on: event.occurredOn,
				id: event.eventId,
				attributes: event.toPrimitive()
			}
			return {
				Detail: JSON.stringify(data),
				DetailType: STAGE,
				Source: event.eventName,
			}
		});

		const command = {
			Entries: procesedEvents
		};

		try {
			const data = await this.client.putEvents(command).promise();
			console.log("Success, event sent:", data);
		} catch (err) {
			console.log("Error", err);
		}
	}

	addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void {
		// Do nothing
	}

	setDomainEventMapping(domainEventMapping: DomainEventMapping): void {
		// Do nothing
	}
}
