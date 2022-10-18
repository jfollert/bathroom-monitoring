import { Bathroom } from "./Bathroom";
import { BathroomId } from "./BathroomId";

export interface BathroomRepository {
	save(bathroom: Bathroom): Promise<void>;
	findAll(): Promise<Bathroom[]>;
	findById(id: BathroomId): Promise<Bathroom | null>;
	remove(id: BathroomId): Promise<void>;
}
