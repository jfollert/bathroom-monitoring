import { Sensor } from "./Sensor";

export interface SensorRepository {
	save(sensor: Sensor): Promise<void>;
}
