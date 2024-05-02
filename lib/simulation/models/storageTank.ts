import { Environment } from "./environment";
import { Fluid } from "./fluid";

export type StorageTankModel = {
  volume: number;
  heatLossCoefficient: number;
  maxAllowedTemperature: number;
  calculateHeatLoss: (
    fluidTemperature: number,
    environment: Environment,
    time: number
  ) => number;
  calculateNewTemperature: (
    initialTemp: number,
    heatAdded: number,
    time: number,
    environment: Environment,
    fluid: Fluid
  ) => number;
  calculateSafeTemperature(
    initialTemp: number,
    heatAdded: number,
    time: number,
    environment: Environment,
    fluid: Fluid,
    overrideMaxSafeTemperature?: number
  ): number;
};

export type StorageTankConfig = {
  volume: number;
  surfaceArea: number;
  heatLossCoefficient: number;
  maxAllowedTemperature: number;
};

export function createStorageTankModel({
  volume,
  surfaceArea,
  heatLossCoefficient,
  maxAllowedTemperature,
}: StorageTankConfig): StorageTankModel {
  return {
    volume,
    heatLossCoefficient,
    maxAllowedTemperature,
    calculateHeatLoss(fluidTemperature, environment, time) {
      return (
        heatLossCoefficient *
        surfaceArea *
        (fluidTemperature - environment.getAmbientTemperature(time)) *
        time
      );
    },
    calculateNewTemperature(initialTemp, heatAdded, time, environment, fluid) {
      const heatLoss = this.calculateHeatLoss(initialTemp, environment, time);
      const deltaTempAdd = fluid.calculateTemperatureChange(
        heatAdded - heatLoss,
        volume
      );
      return initialTemp + deltaTempAdd; // Final temperature after heat addition and loss
    },
    calculateSafeTemperature(
      initialTemp,
      heatAdded,
      time,
      environment,
      fluid,
      overrideMaxSafeTemperature = maxAllowedTemperature
    ) {
      const temp = this.calculateNewTemperature(
        initialTemp,
        heatAdded,
        time,
        environment,
        fluid
      );
      return Math.min(temp, overrideMaxSafeTemperature);
    },
  };
}
