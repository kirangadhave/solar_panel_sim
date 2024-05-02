import { SimulationConfig } from "@/lib/simulation/types";
import { Box, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import ConfiguratorNumericInput from "../ui/ConfiguratorNumericInput";

const marks = [0, 4, 8, 12, 16, 20, 24].map((hour) => ({
  value: hour,
  label: hour.toString(),
}));

// ! Fix
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
          label={"Sunrise"}
          min={0}
          max={24}
        />
        <ConfiguratorNumericInput
          _form={form}
          _key="environment.solarIrradianceConfig.sunset"
          label={"Sunset"}
          min={0}
          max={24}
        />
        <ConfiguratorNumericInput
          _form={form}
          _key="environment.solarIrradianceConfig.maxIrradiance"
          label={"Max Irradiance:"}
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
            min={0}
            max={24}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
