import { InvalidArgumentError } from '@bath-mon/shared/domain/value-object/InvalidArgumentError';
import { NumberValueObject } from '@bath-mon/shared/domain/value-object/NumberValueObject';

const ensureIsInteger = (value: number) => {
	if (!Number.isInteger(value)) throw new InvalidArgumentError();
}

export class BathroomFloor extends NumberValueObject {
	constructor(value: number) {
		ensureIsInteger(value);
		super(value);
	}
}