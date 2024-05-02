export type Fluid = {
  density: number;
  specificHeat: number;
  calculateMass: (volume: number) => number;
  calculateTemperatureChange: (heatAdded: number, volume: number) => number;
  calculateFinalTemperature: (
    initialTemp: number,
    heatAdded: number,
    volume: number
  ) => number;
};

export type FluidConfig = {
  density: number;
  specificHeat: number;
};

export function createFluid({ density, specificHeat }: FluidConfig): Fluid {
  return {
    density,
    specificHeat,
    calculateMass(volume) {
      return volume * density;
    },
    calculateTemperatureChange(heatAdded, volume) {
      return heatAdded / (this.calculateMass(volume) * specificHeat);
    },
    calculateFinalTemperature(initialTemp, heatAdded, volume) {
      return initialTemp + this.calculateTemperatureChange(heatAdded, volume);
    },
  };
}
