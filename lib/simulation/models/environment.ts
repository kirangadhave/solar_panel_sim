export type SolarIrradiance = {
  sunrise: number;
  sunset: number;
  maxIrradiance: number;
  calculateIrradiance: (time: number) => number;
};

export type SolarIrradianceConfig = {
  sunrise: number;
  sunset: number;
  maxIrradiance: number;
};

export type AmbientTemperature = {
  max: {
    temperature: number;
    time: number;
  };
  min: {
    temperature: number;
    time: number;
  };
  calculateAmbientTemperature: (time: number) => number;
};

export type AmbientTemperatureConfig = {
  maxTemp: number;
  maxTempTime: number;
  minTemp: number;
  minTempTime: number;
};

export type Environment = {
  solarIrradiance: SolarIrradiance;
  ambientTemperature: AmbientTemperature;
  getAmbientTemperature: (time: number) => number;
  getSolarIrradiance: (time: number) => number;
};

export type EnvironmentConfig = {
  solarIrradianceConfig: SolarIrradianceConfig;
  ambientTemperatureConfig: AmbientTemperatureConfig;
};

export function createEnvironmentModel({
  solarIrradianceConfig,
  ambientTemperatureConfig,
}: EnvironmentConfig): Environment {
  const solarIrradiance = createIrradianceModel(solarIrradianceConfig);
  const ambientTemperature = createAmbientTemperatureModel(
    ambientTemperatureConfig
  );

  return {
    solarIrradiance,
    ambientTemperature,
    getAmbientTemperature(time) {
      return ambientTemperature.calculateAmbientTemperature(time);
    },
    getSolarIrradiance(time) {
      return solarIrradiance.calculateIrradiance(time);
    },
  };
}

export function createIrradianceModel({
  sunrise,
  sunset,
  maxIrradiance,
}: SolarIrradianceConfig): SolarIrradiance {
  sunrise = sunrise * 3600;
  sunset = sunset * 3600;
  return {
    sunrise,
    sunset,
    maxIrradiance,
    calculateIrradiance(time) {
      if (time >= sunrise && time <= sunset) {
        return (
          maxIrradiance *
          Math.sin((Math.PI * (time - sunrise)) / (sunset - sunrise))
        );
      }
      return 0;
    },
  };
}

export function createAmbientTemperatureModel({
  maxTemp,
  maxTempTime,
  minTemp,
  minTempTime,
}: AmbientTemperatureConfig): AmbientTemperature {
  // Parabolic assumption, assume minTime and minTime + 12hrs have same minTemp
  maxTempTime = maxTempTime * 3600;
  minTempTime = minTempTime * 3600;

  const a = (minTemp - maxTemp) / Math.pow(minTempTime - maxTempTime, 2);

  return {
    max: {
      temperature: maxTemp,
      time: maxTempTime,
    },
    min: {
      temperature: minTemp,
      time: minTempTime,
    },
    calculateAmbientTemperature(time) {
      return a * Math.pow(time - maxTempTime, 2) + maxTemp;
    },
  };
}
