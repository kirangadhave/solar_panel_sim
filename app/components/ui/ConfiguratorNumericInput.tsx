import { useAppDispatch } from "@/lib/hooks";
import { ActionIcon, Group, NumberInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";

type Props<K> = {
  form: UseFormReturnType<K>;
  _key: keyof K;
  label: string;
  hideControls?: boolean;
  allowNegative?: boolean;
  allowDecimal?: boolean;
  action: (payload: any) => { type: string; payload: any };
  suffix: string;
  clampBehaviour?: "strict" | "none";
  min?: number;
  max?: number;
};

export default function ConfiguratorNumericInput<K>({
  form,
  _key,
  label,
  action,
  suffix,
  clampBehaviour = "none",
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  ...rest
}: Props<K>) {
  const dispatch = useAppDispatch();

  return (
    <NumberInput
      key={form.key(_key)}
      {...form.getInputProps(_key)}
      label={label}
      {...rest}
      suffix={` ${suffix}`}
      rightSectionWidth="auto"
      clampBehavior={clampBehaviour}
      min={min}
      max={max}
      rightSection={
        <Group gap="xs" pr="xs">
          <ActionIcon
            radius="lg"
            size="xs"
            color="green"
            disabled={!form.isDirty(_key)}
            onClick={() => {
              dispatch(action(form.getValues()[_key]));
              form.resetDirty();
              form.resetTouched();
            }}
          >
            <IconCheck />
          </ActionIcon>
          <ActionIcon
            radius="lg"
            size="xs"
            color="red"
            disabled={!form.isDirty(_key)}
            onClick={() => form.reset()}
          >
            <IconX />
          </ActionIcon>
        </Group>
      }
    />
  );
}
