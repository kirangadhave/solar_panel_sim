"use client";
import { SimulationConfig } from "@/lib/simulation/types";
import { Box, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import ConfiguratorNumericInput from "../ui/ConfiguratorNumericInput";

export default function SolarPanelConfigurator({
  form,
}: {
  form: UseFormReturnType<SimulationConfig>;
}) {
  return (
    <Stack pr="sm" pl="sm" gap="xl">
      <Box>
        <ConfiguratorNumericInput
          _form={form}
          _key="solarPanel.area"
          label={"Area"}
          description="Effective area of the solar panel"
          suffix="m²"
        />
        <ConfiguratorNumericInput
          _form={form}
          _key="solarPanel.efficiency"
          label={"Efficiency"}
          description="Efficiency of the solar panel"
          suffix="%"
        />
      </Box>
    </Stack>
  );
}
