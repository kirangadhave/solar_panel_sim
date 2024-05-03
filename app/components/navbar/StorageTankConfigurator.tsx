"use client";
import { SimulationConfig } from "@/lib/simulation/types";
import { Box, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import ConfiguratorNumericInput from "../ui/ConfiguratorNumericInput";

export default function StorageTankConfigurator({
  form,
}: {
  form: UseFormReturnType<SimulationConfig>;
}) {
  return (
    <Stack pr="sm" pl="sm" gap="xl">
      <Box>
        <ConfiguratorNumericInput
          _form={form}
          _key="storageTank.volume"
          label={"Volume"}
          description="Volume of fluid in storage tank"
          suffix="m³"
          step={0.01}
          decimalScale={2}
          fixedDecimalScale
        />
        <ConfiguratorNumericInput
          _form={form}
          _key="storageTank.initialTemperature"
          label={"Initial Temp"}
          description="Initial temperature of fluid"
          suffix="°C"
        />
      </Box>
      <Box>
        <ConfiguratorNumericInput
          _form={form}
          _key="storageTank.surfaceArea"
          description="Effective surface area for heat loss"
          label={"Surface Area"}
          suffix="m²"
          step={0.01}
          decimalScale={2}
          fixedDecimalScale
        />
        <ConfiguratorNumericInput
          _form={form}
          _key="storageTank.heatLossCoefficient"
          description="% of heat lost to environment"
          label={"Heat Loss Coefficient"}
          step={0.01}
          decimalScale={2}
          fixedDecimalScale
        />
        <ConfiguratorNumericInput
          _form={form}
          _key="storageTank.maxAllowedTemperature"
          description="Maximum safe temperature for fluid"
          label={"Max Allowed Temp"}
          suffix="°C"
        />
      </Box>
    </Stack>
  );
}
