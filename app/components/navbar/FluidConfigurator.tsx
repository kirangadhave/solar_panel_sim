"use client";
import { SimulationConfig } from "@/lib/simulation/types";
import { Box, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import ConfiguratorNumericInput from "../ui/ConfiguratorNumericInput";

export default function FluidConfigurator({
  form,
}: {
  form: UseFormReturnType<SimulationConfig>;
}) {
  return (
    <Stack pr="sm" pl="sm" gap="xl">
      <Box>
        <ConfiguratorNumericInput
          _form={form}
          _key="fluid.density"
          description="Density of the fluid"
          label={"Density"}
          suffix="kg/m³"
        />
        <ConfiguratorNumericInput
          _form={form}
          _key="fluid.specificHeat"
          description="Specific heat of the fluid"
          label={"Specific Heat"}
          suffix="J/kg°C"
        />
      </Box>
    </Stack>
  );
}
