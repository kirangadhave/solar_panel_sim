"use client";
import { setTemperature, setVolume } from "@/lib/features/storage-tank";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { deepCopy } from "@/lib/utils/deepCopy";
import { superscriptNumber } from "@/lib/utils/superscript";
import { Box, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import ConfiguratorNumericInput from "../ui/ConfiguratorNumericInput";

export default function StorageTankConfigurator() {
  const dispatch = useAppDispatch();
  const storageTank = useAppSelector((state) => state.storageTank);

  const form = useForm({
    initialValues: deepCopy(storageTank),
  });

  return (
    <Box m="xs">
      <Title order={3} mb="sm">
        Storage Tank
      </Title>
      <Stack>
        <ConfiguratorNumericInput
          form={form}
          _key="temp"
          label={"Temperature:"}
          suffix="°C"
          hideControls
          allowNegative={false}
          allowDecimal
          action={setTemperature}
        />
        <ConfiguratorNumericInput
          form={form}
          _key="volume"
          label="Volume:"
          suffix={`m${superscriptNumber(3)}`}
          hideControls
          allowNegative={false}
          allowDecimal
          action={setVolume}
        />
      </Stack>
    </Box>
  );
}
