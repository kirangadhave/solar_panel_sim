import { EnvironmentConfig } from "./models/environment";
import { FluidConfig } from "./models/fluid";
import { SolarPanelConfig } from "./models/solarPanel";
import { StorageTankConfig } from "./models/storageTank";

export type SimulationConfig = {
  timeStep: number;
  environment: EnvironmentConfig;
  fluid: FluidConfig;
  solarPanel: SolarPanelConfig;
  storageTank: StorageTankConfig;
};

export type SimulationRun = {
  time: number;
  session_id: string;
  initialTemperature: number;
  finalTemperature: number;
  heatAdded: number;
  cummulativeHeatAdded: number;
  heatLossAmbient: number;
  cummulativeHeatLossAmbient: number;
};

export type SimulationSession = {
  id: string;
  name: string;
  createdOn: string;
  config: SimulationConfig;
  runs: Array<SimulationRun>;
};
