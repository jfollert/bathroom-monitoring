import { NumberValueObject } from "./NumberValueObject";

export class Timestamp extends NumberValueObject {
	static random(): Timestamp {
		const start = new Date(2012, 0, 1);
		const end = new Date();
		const dateRange = end.getTime() - start.getTime()
		const randomFactor = Math.random()
		const randomDate = new Date(start.getTime() +  randomFactor * dateRange)
		return new Timestamp(randomDate.getTime());
	}
}
