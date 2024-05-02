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
          suffix="m³"
          step={0.01}
          decimalScale={2}
          fixedDecimalScale
        />
        <ConfiguratorNumericInput
          _form={form}
          _key="storageTank.surfaceArea"
          label={"Surface Area"}
          suffix="m²"
          step={0.01}
          decimalScale={2}
          fixedDecimalScale
        />
      </Box>
      <Box>
        <ConfiguratorNumericInput
          _form={form}
          _key="storageTank.heatLossCoefficient"
          label={"Heat Loss Coefficient"}
          step={0.01}
          decimalScale={2}
          fixedDecimalScale
        />
        <ConfiguratorNumericInput
          _form={form}
          _key="storageTank.maxAllowedTemperature"
          label={"Max Allowed Temp"}
          suffix="°C"
        />
      </Box>
    </Stack>
  );
}
