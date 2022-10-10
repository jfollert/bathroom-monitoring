export abstract class EnumValueObject<T> {
	readonly value: T;

	constructor(value: T, public readonly validValues: T[]) {
		this.value = value;
		this.checkValueIsValid(value);
	}

	public checkValueIsValid(value: T): void {
		if (!this.validValues.includes(value))
			this.throwErrorForInvalidValue(value);

	}

	public random(): T {
		const randomIndex = Math.floor(Math.random() * this.validValues.length);
		const randomValue = this.validValues[randomIndex];
		return randomValue
	}

	protected abstract throwErrorForInvalidValue(value: T): void;
}
