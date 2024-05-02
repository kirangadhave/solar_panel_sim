import { EnvironmentConfig } from "./models/environment";
import { FluidConfig } from "./models/fluid";
import { SolarPanelConfig } from "./models/solarPanel";
import { StorageTankConfig } from "./models/storageTank";

export type SimulationConfig = {
  environment: EnvironmentConfig;
  fluid: FluidConfig;
  solarPanel: SolarPanelConfig;
  storageTank: StorageTankConfig;
};

export type SimulationRun = {
  time: number;
  initialTemperature: number;
  finalTemperature: number;
  heatAdded: number;
  cummulativeHeatAdded: number;
  heatLossAmbient: number;
  cummulativeHeatLossAmbient: number;
  heatLossDump: number;
  cummulativeHeatLossDump: number;
  totalHeatLoss: number;
  cummulativeTotalHeatLoss: number;
};

export type SimulationSession = {
  id: string;
  config: SimulationConfig;
  runs: Array<SimulationRun>;
};
