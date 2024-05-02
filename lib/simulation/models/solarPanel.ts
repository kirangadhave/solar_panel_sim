import { SolarIrradiance } from "./environment";

export type SolarPanelModel = {
  area: number;
  efficiency: number;
  calculateHeatEnergy(
    irradiance: SolarIrradiance,
    startTime: number,
    interval: number
  ): number;
};

export type SolarPanelConfig = {
  area: number;
  efficiency: number;
};

export function createSolarPanelModel({
  area,
  efficiency,
}: SolarPanelConfig): SolarPanelModel {
  return {
    area,
    efficiency,
    calculateHeatEnergy(irradiance, startTime, interval) {
      const irradianceStart = irradiance.calculateIrradiance(startTime);
      const irradianceEnd = irradiance.calculateIrradiance(
        startTime + interval
      );
      const avgIrradiance = (irradianceStart + irradianceEnd) / 2;

      return avgIrradiance * area * (efficiency / 100) * interval;
    },
  };
}
