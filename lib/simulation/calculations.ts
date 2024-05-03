import { createEnvironmentModel } from "./models/environment";
import { createFluid } from "./models/fluid";
import { createSolarPanelModel } from "./models/solarPanel";
import { createStorageTankModel } from "./models/storageTank";
import { SimulationConfig, SimulationRun } from "./types";

export function runSimulation(
  session_id: string,
  config: SimulationConfig,
  timeStep = 60
) {
  const env = createEnvironmentModel(config.environment);
  const fluid = createFluid(config.fluid);
  const solarPanel = createSolarPanelModel(config.solarPanel);
  const storageTank = createStorageTankModel(config.storageTank);

  const arr: Array<SimulationRun> = [];
  let currentInitialTemp = config.storageTank.initialTemperature;

  for (let time = timeStep; time <= 24 * 3600; time += timeStep) {
    const heatToAdd = solarPanel.calculateHeatEnergy(
      env.solarIrradiance,
      time - timeStep,
      timeStep
    );

    const heatLoss = storageTank.calculateHeatLoss(
      currentInitialTemp,
      env,
      time
    );

    const finalTemperature = storageTank.calculateSafeTemperature(
      currentInitialTemp,
      heatToAdd,
      time,
      env,
      fluid
    );

    const isFirst = time === timeStep;

    arr.push({
      time,
      session_id,
      initialTemperature: currentInitialTemp,
      finalTemperature,
      heatAdded: heatToAdd,
      cummulativeHeatAdded: isFirst
        ? heatToAdd
        : arr[arr.length - 1].cummulativeHeatAdded + heatToAdd,
      heatLossAmbient: heatLoss,
      cummulativeHeatLossAmbient: isFirst
        ? heatLoss
        : arr[arr.length - 1].cummulativeHeatLossAmbient + heatLoss,
    });

    currentInitialTemp = finalTemperature;
  }

  return arr;
}
