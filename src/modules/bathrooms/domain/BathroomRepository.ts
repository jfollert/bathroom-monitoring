import { Bathroom } from "./Bathroom";

export interface BathroomRepository {
	save(bathroom: Bathroom): Promise<void>;
}
