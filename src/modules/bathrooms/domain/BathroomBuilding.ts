import { InvalidArgumentError } from '@bath-mon/shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '@bath-mon/shared/domain/value-object/StringValueObject';

export class BathroomBuilding extends StringValueObject {
	constructor(value: string) {
		if (typeof value !== 'string') throw new InvalidArgumentError();
		super(value);
	}
} 