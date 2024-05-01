import {
  setAmbientTemperature,
  setIrradiance,
} from "@/lib/features/environment";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { deepCopy } from "@/lib/utils/deepCopy";
import { superscriptNumber } from "@/lib/utils/superscript";
import { Box, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import ConfiguratorNumericInput from "../ui/ConfiguratorNumericInput";

export default function EnvironmentConfigurator() {
  const dispatch = useAppDispatch();
  const environment = useAppSelector((state) => state.environment);

  const form = useForm({
    initialValues: deepCopy(environment),
  });

  return (
    <Box m="xs">
      <Title order={3} mb="sm">
        Environment
      </Title>
      <Stack>
        <ConfiguratorNumericInput
          form={form}
          _key="ambientTemp"
          label={"Ambient Temperature:"}
          suffix="°C"
          hideControls
          allowNegative={false}
          allowDecimal
          action={setAmbientTemperature}
        />
        <ConfiguratorNumericInput
          form={form}
          _key="irradiance"
          label="Irradiance:"
          suffix={`W/m${superscriptNumber(2)}`}
          hideControls
          allowNegative={false}
          allowDecimal
          action={setIrradiance}
        />
      </Stack>
    </Box>
  );
}
