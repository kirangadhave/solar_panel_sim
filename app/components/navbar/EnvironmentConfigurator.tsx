"use client";
import { SimulationConfig } from "@/lib/simulation/types";
import { Box, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import ConfiguratorNumericInput from "../ui/ConfiguratorNumericInput";

export default function EnvironmentConfigurator({
  form,
}: {
  form: UseFormReturnType<SimulationConfig>;
}) {
  return (
    <Stack pr="sm" pl="sm" gap="xl">
      <Box>
        <ConfiguratorNumericInput
          _form={form}
          _key="environment.solarIrradianceConfig.sunrise"
          description="Between 0 and 24 hours"
          label={"Sunrise"}
          min={0}
          max={24}
        />
        <ConfiguratorNumericInput
          _form={form}
          _key="environment.solarIrradianceConfig.sunset"
          label={"Sunset"}
          description="Between 0 and 24 hours"
          min={0}
          max={24}
        />
        <ConfiguratorNumericInput
          _form={form}
          _key="environment.solarIrradianceConfig.maxIrradiance"
          label={"Max Irradiance:"}
          description="Maximum solar irradiance during the day"
          suffix=" W/m²"
        />
      </Box>
      <Stack>
        <Box>
          <ConfiguratorNumericInput
            _form={form}
            _key="environment.ambientTemperatureConfig.maxTemp"
            label={"Max Ambient Temp:"}
            suffix="°C"
          />
          <ConfiguratorNumericInput
            _form={form}
            _key="environment.ambientTemperatureConfig.maxTempTime"
            label={"Max Temp Time"}
            description="Between 0 and 24 hours"
            min={0}
            max={24}
          />
        </Box>
        <Box>
          <ConfiguratorNumericInput
            _form={form}
            _key="environment.ambientTemperatureConfig.minTemp"
            label={"Min Ambient Temp:"}
            suffix="°C"
          />
          <ConfiguratorNumericInput
            _form={form}
            _key="environment.ambientTemperatureConfig.minTempTime"
            label={"Min Temp Time"}
            description="Between 0 and 24 hours"
            min={0}
            max={24}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
