"use client";
import { setArea, setEfficiency } from "@/lib/features/solar-panel";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { deepCopy } from "@/lib/utils/deepCopy";
import { superscriptNumber } from "@/lib/utils/superscript";
import { Box, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import ConfiguratorNumericInput from "../ui/ConfiguratorNumericInput";

export default function SolarPanelConfigurator() {
  const dispatch = useAppDispatch();
  const solarPanel = useAppSelector((state) => state.solarPanel);

  const form = useForm({
    initialValues: deepCopy(solarPanel),
  });

  return (
    <Box m="xs">
      <Title order={3} mb="sm">
        Solar Panel
      </Title>
      <Stack>
        <ConfiguratorNumericInput
          form={form}
          _key="eff"
          label={"Efficiency:"}
          suffix=""
          hideControls
          allowNegative={false}
          allowDecimal
          action={setEfficiency}
          clampBehaviour="strict"
          min={0}
          max={1}
        />
        <ConfiguratorNumericInput
          form={form}
          _key="area"
          label="Area:"
          suffix={`m${superscriptNumber(2)}`}
          hideControls
          allowNegative={false}
          allowDecimal
          action={setArea}
        />
      </Stack>
    </Box>
  );
}
