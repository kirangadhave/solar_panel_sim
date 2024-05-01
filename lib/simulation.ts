import { AppStore } from "./store";

export function calculateTemperature(
  { solarPanel, environment, storageTank }: ReturnType<AppStore["getState"]>,
  timeInSeconds: number
) {
  return (
    storageTank.temp +
    (solarPanel.area *
      solarPanel.eff *
      environment.irradiance *
      timeInSeconds) /
      (storageTank.volume * 1000 * 4186)
  );
}
