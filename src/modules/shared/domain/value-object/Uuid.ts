import { v4 } from 'uuid';
import { InvalidArgumentError } from './InvalidArgumentError';

export class Uuid {
	readonly value: string;

	constructor(value: string) {
		this.ensureIsValidUuid(value);
		this.value = value;
	}

	static random(): Uuid {
		return new Uuid(v4());
	}

	private ensureIsValidUuid(id: string): void {
		const uuidRegexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
		const isMatch =	uuidRegexExp.test(id);
		if (!isMatch)
			throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
	}

	toString(): string {
		return this.value;
	}
}