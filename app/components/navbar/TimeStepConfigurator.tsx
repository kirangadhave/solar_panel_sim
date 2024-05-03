import { SimulationConfig } from "@/lib/simulation/types";
import { UseFormReturnType } from "@mantine/form";
import ConfiguratorNumericInput from "../ui/ConfiguratorNumericInput";

export function TimeStepConfigurator({
  form,
}: {
  form: UseFormReturnType<SimulationConfig>;
}) {
  return (
    <ConfiguratorNumericInput
      _form={form}
      _key="timeStep"
      size="xs"
      suffix=" seconds"
      stepHoldDelay={500}
      stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
      mb="xs"
      mr="lg"
      ml="lg"
      label="Simulation step size"
      width="min-content"
      min={60}
      max={24 * 60 * 60}
    />
  );
}
