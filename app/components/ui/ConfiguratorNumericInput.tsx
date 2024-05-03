import { NumberInput, NumberInputProps } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { LooseKeys } from "@mantine/form/lib/types";

interface Props<K> extends NumberInputProps {
  _form: UseFormReturnType<K>;
  _key: LooseKeys<K>;
}

export default function ConfiguratorNumericInput<K>({
  _form,
  _key,
  suffix,
  ...rest
}: Props<K>) {
  return (
    <NumberInput
      key={_form.key(_key)}
      {..._form.getInputProps(_key)}
      suffix={suffix ? ` ${suffix}` : undefined}
      allowNegative={false}
      rightSectionWidth="auto"
      stepHoldDelay={500}
      stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
      {...rest}
    />
  );
}
