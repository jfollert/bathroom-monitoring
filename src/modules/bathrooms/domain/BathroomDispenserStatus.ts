import { EnumValueObject } from '@bath-mon/shared/domain/value-object/EnumValueObject';

const validValues = [
	'EMPTY', 'NOT_EMPTY', 'UNKNOWN'
]

export class BathroomDispenserStatus extends EnumValueObject<string> {
	constructor(value: string){
		super(value, validValues);
	}

	protected throwErrorForInvalidValue(value: string): void {
		throw new Error("Invalid BathroomDispenserStatus: " + value);

	}

	public static initialize(): BathroomDispenserStatus {
		return new BathroomDispenserStatus(validValues[0]);
	}

}