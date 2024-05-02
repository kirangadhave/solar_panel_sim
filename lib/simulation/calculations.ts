import { createEnvironmentModel } from "./models/environment";
import { createFluid } from "./models/fluid";
import { createSolarPanelModel } from "./models/solarPanel";
import { createStorageTankModel } from "./models/storageTank";
import { SimulationConfig, SimulationRun } from "./types";

export function runSimulation(config: SimulationConfig, timeStep = 60) {
  const env = createEnvironmentModel(config.environment);
  const fluid = createFluid(config.fluid);
  const solarPanel = createSolarPanelModel(config.solarPanel);
  const storageTank = createStorageTankModel(config.storageTank);

  const arr: any[] = [];
  let temp = 26;
  let temp2 = 26;

  for (let i = timeStep; i <= 24 * 3600; i += timeStep) {
    const heatToAdd = solarPanel.calculateHeatEnergy(
      env.solarIrradiance,
      i - timeStep,
      timeStep
    );

    const newTemp = storageTank.calculateSafeTemperature(
      temp,
      heatToAdd,
      i,
      env,
      fluid
    );
    const unHingedNewTemp = storageTank.calculateSafeTemperature(
      temp2,
      heatToAdd,
      i,
      env,
      fluid,
      100
    );

    arr.push({
      i,
      temp,
      newTemp,
      unHingedNewTemp,
    });

    temp = newTemp;
    temp2 = unHingedNewTemp;
  }

  return arr as SimulationRun[];
}
