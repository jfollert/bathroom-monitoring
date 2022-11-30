import { Sensor } from "./Sensor";
import { SensorId } from "./SensorId";

export interface SensorRepository {
	save(sensor: Sensor): Promise<void>;
	findAll(): Promise<Sensor[]>;
	findById(id: SensorId): Promise<Sensor | null>;
	remove(id: SensorId): Promise<void>;
}
